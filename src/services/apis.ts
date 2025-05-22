import type { ApiPost, ApiUser } from '@/utils/types';
import { mockApi } from './axiosInstances';
import { colorGenerator, setCurrentUser } from '@/utils/utils';

export async function getPosts(id?: number) {
	let query = "posts";
	if(id) query += `/${id}`;

	try {
		const res: ApiPost[] | ApiPost = (await mockApi.get(query))?.data;
		return res;

	} catch (err: AxiosError) {
		console.error(err);
		throw err;
	}
}

export async function createPost(post:ApiPost) {
	try {
		const res: ApiPost = (await mockApi.post("posts", post))?.data;

		const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
		savedPosts.unshift(res);
		localStorage.setItem("posts", JSON.stringify(savedPosts));

		return res;

	} catch(err: AxiosError) {
		console.err(err);
		throw err;
	}
}

export async function getUsers(id?: number) {
	let query = "users";
	const user = setCurrentUser();

	if (id) {
		if (id === user.id) {
			return user;
		}

		query += `/${id}`;
	}

	try {
		const res: ApiUser[] | ApiUser = (await mockApi.get(query))?.data;

		if(Array.isArray(res)) {
			res.unshift(user);
			for (const item of res) item.color = colorGenerator(item.id);
		} else {
			res.color = colorGenerator(res.id);
		}

		return res;

	} catch (err: AxiosError) {
		console.error(err);
		throw err;
	}
}

export async function getPostsWithUserNames() {
  try {
    const [postsRes, usersRes] = await Promise.all([
      mockApi.get('posts'),
      mockApi.get('users')
    ]);

    const posts = postsRes.data;
    const users = usersRes.data;

    const userMap = new Map(users.map(user => [user.id, user.name]));

    const postsWithNames = posts.map(post => ({
      ...post,
      userName: userMap.get(post.userId)
    }));

    return postsWithNames;

  } catch (err: AxiosError) {
    console.err('Error fetching data:', err);
		throw error
  }
}

export async function getUserPosts(id: number) {
	try {
		const user = setCurrentUser();
		const color = colorGenerator(id);

		if (id === user.id) {
			const posts = JSON.parse(localStorage.getItem("posts"));
			for (const item of posts) item.color = user.color;
			return posts
		}

		const res = await mockApi.get(`posts?userId=${id}`);

		for (const item of res.data) item.color = color;

		return res.data;

	} catch (err: AxiosError) {
		console.error(err);
		throw err;
	}
}
