<script setup lang="ts">
import Avatar from '@/components/Avatar/Avatar.vue';

interface PropsData {
	name: string,
	data: number,
	username: string,
	website: string,
	email: string,
	phone: string
}

defineProps<{data: PropsData}>()

</script>

<template>
<article class="main-container">
	<Avatar :id="data.id" size="60px" :color="data.color"/>
	<RouterLink :to="`/users/${data.id}`" class="info-container">
		<div class="user-info">
			<span>{{data.name}}</span>
			<span>@{{data.username}}</span>
		</div>
		<div class="data">
			<div>website: {{data.website}}</div>
		</div>
		<div class="actions">
		</div>
	</RouterLink>
</article>
</template>

<style scoped>
.main-container {
		padding: 1rem;
		display: flex;
}

.info-container {
		flex: 1;

		& .user-info {
			display:flex;

			& span:nth-child(1)  {
					font-weight: 700;
			}

			& span:nth-child(2) {
				margin-left: 4px;
				color: var(--gray-2);
			}

			& a {
					font-weight: 700;
			}
		}
}
</style>
