<script setup lang="ts">
import Post from '@/components/Post.vue';

interface PropsData {
	userName: string,
	title: string,
	body: string
}

defineProps<{data: PropsData[]}>()
</script>

<template>
<Post class="card" v-for="(user, index) in data" :data="user" :key="index" />
</template>

<style scoped>
.card {
		article:not(:last-child),
		section:not(:last-child) {
 			border-bottom: 1px solid var(--border-color);
		}
}
</style>
