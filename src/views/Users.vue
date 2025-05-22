<script setup lang="ts">
import { getUsers } from '@/services/apis';
import Input from '@/primitives/Input.vue';
import User from '@/components/User.vue';

const users = await getUsers();
</script>

<template>
<h1>We Are in Users</h1>
<div class="users-container">
	<User v-for="(user, index) in users" :data="user" :key="index" />
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
