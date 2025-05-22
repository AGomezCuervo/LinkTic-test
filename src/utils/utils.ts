import type { ApiUser } from "./types"

export function colorGenerator(id: number): string {
  const hue = (id * 137.508) % 360;
  const saturation = 70;
  const lightness = 50;
  return `hsl(${hue.toFixed(0)}, ${saturation}%, ${lightness}%)`;
}

export function setCurrentUser() {
		let user: ApiUser = {
				id: 999,
				name: "Usuario Prueba",
				username: "Prueba",
				email: "prueba@test.com",
				phone: "3000234931232",
				website: "prueba.com",
				color: "#e5484d",
				address: {
						city: "Bogota",
						street: "170"
				}
		};

		if(!localStorage.getItem("user")) {
			localStorage.setItem("user", JSON.stringify(user));
		}

		if(!localStorage.getItem("posts")) {
				localStorage.setItem("posts", JSON.stringify([]));
		}

		return user;
}
