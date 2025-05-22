import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as apiModule from './apis';
import type { ApiPost, ApiUser } from '@/utils/types';

vi.mock('@/utils/utils', () => ({
  setCurrentUser: vi.fn(),
  colorGenerator: vi.fn(),
}));

vi.mock('./axiosInstances', () => ({
  mockApi: {
    get: vi.fn(),
    post: vi.fn(),
  }
}));

describe('API functions', async () => {
  const { mockApi } = await import('./axiosInstances');
  const { setCurrentUser, colorGenerator } = await import('@/utils/utils');

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('getPosts', () => {
    it('debería llamar a mockApi.get con "posts" si no hay id', async () => {
      (mockApi.get as any).mockResolvedValue({ data: [{ id: 1 }] });

      const res = await apiModule.getPosts();
      expect(mockApi.get).toHaveBeenCalledWith('posts');
      expect(res).toEqual([{ id: 1 }]);
    });

    it('debería llamar a mockApi.get con "posts/id" si hay id', async () => {
      (mockApi.get as any).mockResolvedValue({ data: { id: 2 } });

      const res = await apiModule.getPosts(2);
      expect(mockApi.get).toHaveBeenCalledWith('posts/2');
      expect(res).toEqual({ id: 2 });
    });

    it('debería lanzar error si mockApi.get falla', async () => {
      const error = new Error('fail');
      (mockApi.get as any).mockRejectedValue(error);

      await expect(apiModule.getPosts()).rejects.toThrow(error);
    });
  });

  describe('createPost', () => {
    it('debería guardar post y actualizar localStorage', async () => {
      const newPost: ApiPost = { id: 1, title: 'test' } as any;
      (mockApi.post as any).mockResolvedValue({ data: newPost });

      localStorage.setItem('posts', JSON.stringify([{ id: 0 }]));

      const res = await apiModule.createPost(newPost);

      expect(mockApi.post).toHaveBeenCalledWith('posts', newPost);
      expect(res).toEqual(newPost);

      const saved = JSON.parse(localStorage.getItem('posts')!);
      expect(saved[0]).toEqual(newPost);
      expect(saved.length).toBe(2);
    });

    it('debería crear localStorage vacío si no existía', async () => {
      const newPost: ApiPost = { id: 1 } as any;
      (mockApi.post as any).mockResolvedValue({ data: newPost });

      const res = await apiModule.createPost(newPost);

      expect(res).toEqual(newPost);
      const saved = JSON.parse(localStorage.getItem('posts')!);
      expect(saved[0]).toEqual(newPost);
    });

    it('debería lanzar error si mockApi.post falla', async () => {
      const error = new Error('fail');
      (mockApi.post as any).mockRejectedValue(error);

      await expect(apiModule.createPost({} as any)).rejects.toThrow(error);
    });
  });

  describe('getUsers', () => {
    const userMock: ApiUser = { id: 10, name: 'currentUser', color: "red" } as any;

    beforeEach(() => {
      (setCurrentUser as vi.Mock).mockReturnValue(userMock);
      (colorGenerator as vi.Mock).mockImplementation(id => `color-${id}`);
    });

    it('debería devolver el user actual si id coincide', async () => {
      const res = await apiModule.getUsers(userMock.id);
      expect(res).toEqual(userMock);
      expect(setCurrentUser).toHaveBeenCalled();
    });

    it('debería obtener array de usuarios y agregar user actual con color', async () => {
      const apiUsers = [{ id: 1 }, { id: 2 }] as ApiUser[];
      (mockApi.get as any).mockResolvedValue({ data: apiUsers });

      const res = await apiModule.getUsers(5);

      expect(mockApi.get).toHaveBeenCalledWith('users/5');
      expect(Array.isArray(res)).toBe(true);
      expect(res[0]).toEqual(userMock);
			console.log("lolis", res);
      for (const user of res) {
        expect(user.color).toBeDefined();
      }
    });

    it('debería obtener un usuario y asignar color', async () => {
      const singleUser = { id: 7 } as ApiUser;
      (mockApi.get as any).mockResolvedValue({ data: singleUser });

      const res = await apiModule.getUsers(7);
      expect(res.color).toBe(`color-${singleUser.id}`);
    });

    it('debería lanzar error si mockApi.get falla', async () => {
      const error = new Error('fail');
      (mockApi.get as any).mockRejectedValue(error);

      await expect(apiModule.getUsers()).rejects.toThrow(error);
    });
  });

  describe('getUserPosts', () => {
    const userMock: ApiUser = { id: 10, color: 'user-color' } as any;

    beforeEach(() => {
      (setCurrentUser as vi.Mock).mockReturnValue(userMock);
      (colorGenerator as vi.Mock).mockImplementation(id => `color-${id}`);
      localStorage.clear();
    });

    it('debería devolver posts del localStorage con color del user si id coincide', async () => {
      const posts = [{ id: 1 }, { id: 2 }] as ApiPost[];
      localStorage.setItem('posts', JSON.stringify(posts));

      const res = await apiModule.getUserPosts(userMock.id);

      expect(res.length).toBe(2);
      for (const post of res) {
        expect(post.color).toBe(userMock.color);
      }
    });

    it('debería obtener posts de mockApi y asignar color si id no coincide', async () => {
      const apiPosts = [{ id: 3 }, { id: 4 }];
      (mockApi.get as any).mockResolvedValue({ data: apiPosts });

      const res = await apiModule.getUserPosts(5);

      expect(mockApi.get).toHaveBeenCalledWith('posts?userId=5');
      for (const post of res) {
        expect(post.color).toBe('color-5');
      }
    });

    it('debería lanzar error si mockApi.get falla', async () => {
      const error = new Error('fail');
      (mockApi.get as any).mockRejectedValue(error);

      await expect(apiModule.getUserPosts(1)).rejects.toThrow(error);
    });
  });
});
