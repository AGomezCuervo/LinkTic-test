export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
	color?: string;
	address: {
			city: string,
			street: string,
	};
}

export interface ApiPost {
		title: string,
		body: string,
		userId: number,
		id: number
}
