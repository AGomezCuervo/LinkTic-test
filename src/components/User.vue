<script setup lang="ts">
interface PropsData {
	name: string,
	username: string,
	website: string
	email: string
	phone: string
}

defineProps<{data: PropsData}>()
</script>

<template>
<article class="main-container">
	<div class="avatar-container">
		<RouterLink :to="`/users/${data.id}`" class="border-radius"></RouterLink>
	</div>
	<RouterLink :to="`/users/${data.id}`" class="info-container">
		<div class="user-info">
			<span>{{data.name}}</span>
			<span>@{{data.username}}</span>
		</div>
		<div class="data">
			<div>website: {{data.website}}</div>
			<div>email: {{data.email}}</div>
			<div>phone: {{data.phone}}</div>
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

.avatar-container {
		min-width: 80px;
		margin-right: 16px;
		& a {
			background-color: v-bind(data.color);
			width: 100%;
			height: 80px;
			display: block;
		}
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
