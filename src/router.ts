import { createWebHistory, createRouter } from 'vue-router'

const routes = [
	{ path: '/',								redirect: "/users" },
	{ path: '/users',						component: () => import("@/views/Home.vue") },
	{ path: '/users/:id(\\d+)', component: () => import("@/views/Profile.vue") },
	{ path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue')}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router;
