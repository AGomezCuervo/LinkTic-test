import { createWebHistory, createRouter } from 'vue-router'

const routes = [
	{ path: '/', component: () => import("@/views/Home.vue") },
	{ path: '/posts', component: () => import("@/views/Home.vue") },
	{ path: '/users/:id(\\d+)', component: () => import("@/views/Profile.vue") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
