<script setup lang="ts">
import { getUser } from '@/services/apis';
import Input from '@/primitives/Input.vue';
import User from '@/components/User.vue';

const users = await getUser();
</script>

<template>
<h1>We are in Users</h1>
<User v-for="(user, index) in users" :data="user" :key="index" />
</template>

<style scoped>

article:not(:last-child),
section:not(:last-child) {
  	border-bottom: 1px solid var(--border-color);
}
</style>
