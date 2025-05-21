<script setup lang="ts">
import { getPostsWithUserNames } from '@/services/apis';
import Input from '@/primitives/Input.vue';
import Post from '@/components/Post.vue';

const users = await getPostsWithUserNames();
</script>

<template>
<h1>We Aren in Users</h1>
<div class="post-container">
	<Post v-for="(user, index) in users" :data="user" :key="index" />
</div>
</template>

<style scoped>
	.post-container {
		border: 1px solid var(--border-color);
		content-visibility: auto;
		max-width: 600px;	

		& article:not(:last-child) {
  		border-bottom: 1px solid var(--border-color);
		}
	}
</style>
