<script setup lang="ts">
import type { ApiPost } from '@/utils/types';
import User from '@/components/User/User.vue';

const props = defineProps<{data: ApiUser[]}>()
</script>

<template>
<div class="users-container">
	<User v-for="(user, index) in props.data" :data="user" :key="index" />
</div>
</template>

<style scoped>
.users-container {
	border: 1px solid var(--border-color);
	content-visibility: auto;
	max-width: 600px;	
	
	& article:not(:last-child) {
  	border-bottom: 1px solid var(--border-color);
	}
}
</style>
