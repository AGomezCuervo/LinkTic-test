<script setup lang="ts">
import type { ApiPost } from '@/utils/types';
import Post from '@/components/Post.vue';

const props = defineProps<{data: ApiPost[]}>()
</script>

<template>
<div class="posts-container">
	<Post v-for="(user, index) in props.data" :data="user" :key="index" />
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
