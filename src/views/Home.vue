<script setup lang="ts">
import { getUsers } from '@/services/apis';
import Users from '@/components/Users.vue';

const users = await getUsers();
</script>

<template>
<h2>Users List</h2>
<div class="users-container">
	<Users :data="users" />
</div>
</template>

<style scoped>

h2 {
	text-align: center;
}

.users-container {
	border: 1px solid var(--border-color);
	content-visibility: auto;
	max-width: 600px;	
	
	& article:not(:last-child) {
  	border-bottom: 1px solid var(--border-color);
	}
}
</style>
