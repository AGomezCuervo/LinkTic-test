<script setup lang="ts">
import Post from '@/components/Post.vue';

interface PropsData {
	userName: string,
	title: string,
	body: string,
	color: string,
}

defineProps<{data: PropsData[]}>()
</script>

<template>
<div class="posts-container">
	<Post v-for="(user, index) in data" :data="user" :key="index" />
</div>
</template>

<style scoped>
.posts-container {
		border: 1px solid var(--border-color);
		content-visibility: auto;
		max-width: 600px;	

		& article:not(:last-child) {
  		border-bottom: 1px solid var(--border-color);
		}
	}
</style>
