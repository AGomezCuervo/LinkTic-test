<script setup lang="ts">
import { useRoute } from 'vue-router';

defineProps<{id?: number, size: string, color: string}>();
const route = useRoute();
</script>

<template>
<div class="avatar-container">
	<RouterLink :to="id ? `/users/${id}` : $route.path" class="border-radius">
		<img src="/user.svg" alt="Logo" />
	</RouterLink>
</div>
</template>

<style scoped>

.avatar-container {
		min-width: v-bind(size);
		max-width: v-bind(size);
		margin-right: 16px;
		& a {
			background-color: v-bind(color);
			width: 100%;
			height: v-bind(size);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		& img {
				display: block;
				width: 50%;
				height: 50%;
		}
}
</style>
