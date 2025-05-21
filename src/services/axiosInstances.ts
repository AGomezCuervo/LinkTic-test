import axios from 'axios';

export const mockApi = axios.create({
		baseUrl: "https://jsonplaceholder.typicode.com";
});
