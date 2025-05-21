import { mockApi } from './axiosInstances';

async function getPost(id?: number) {
		let query = "/posts";
		if(id) query + `/${id}`

		try {
				const res = mockApi.get(query);
				return res;
		} catch (err:AxiosError) {
				console.error(err);
				throw err;
		}
}

