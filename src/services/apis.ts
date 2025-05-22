import { mockApi } from './axiosInstances';
import { colorGenerator } from '@/utils';

export async function getPosts(id?: number) {
		let query = "posts";
		if(id) query += `/${id}`

		try {
				const res = await mockApi.get(query);
				return res.data;
		} catch (err:AxiosError) {
				console.error(err);
				throw err;
		}
}

export async function getUsers(id?: number) {
		let query = "users";
		if(id) query += `/${id}`

		try {
				const res = await mockApi.get(query);
				if(Array.isArray(res.data)) {
						for (const item of res.data) {
								item.color = colorGenerator(item.id);
						}
				} else {
						res.data.color = colorGenerator(res.data.id);
				}
				return res.data;
		} catch (err:AxiosError) {
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

    console.log(postsWithNames);

    return postsWithNames;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function getUserPosts(id: number) {
		try {
				const res = await mockApi.get(`posts?userId=${id}`);
				const color = colorGenerator(id);

				for (const item of res.data) {
						item.color = color;
				}
				return res.data;
		} catch (err:AxiosError) {
				console.error(err);
				throw err;
		}
}
