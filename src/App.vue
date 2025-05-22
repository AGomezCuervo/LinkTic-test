<script setup lang="ts">
import { RouterView } from 'vue-router';
import { setCurrentUser } from '@/utils/utils';
import PostForm from '@/components/PostForm/PostForm.vue';
const user = setCurrentUser();
</script>

<template>
<div class="main-layout">
	<RouterView v-slot="{ Component }">
		<Suspense timeout="0">
			<template #default>
				<div>
					<component :is="Component" :key="$route.path" />
				</div>
			</template>
			<template #fallback>
				<div>Loading...</div>
			</template>
		</Suspense>
	</RouterView>
</div>

<PostForm :user="user"/>
</template>

<style scoped>
.main-layout {
		border: 1px solid var(--border-color);
		margin: 0 auto;
		max-width: 600px;
}
</style>
