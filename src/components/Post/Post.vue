<script setup lang="ts">
import Avatar from '@/components/Avatar/Avatar.vue';
interface PropsData {
	name: string,
	username: string,
	title: string,
	body: string,
	color: string,
}

defineProps<{data: PropsData}>()
</script>

<template>
<article class="main-container">
	<Avatar :color="data.color" size="40px"/>
	<div class="info-container">
		<div class="user-info">
			<a>{{data.name}}</a>
			<div>
				<span>@{{data.username}}</span>
			</div>
		</div>
		<div class="data">
			<span>{{data.body}}</span>
		</div>
		<div class="actions">
		</div>
	</div>
</article>
</template>

<style scoped>
.main-container {
		padding: 1rem;
		display: flex;
		font-size: 13px;
}

.info-container {
		flex: 1;

		& .user-info {
			display:flex;

			& div {
				margin-left: 4px;
				color: var(--gray-2);

				& span:nth-child(2) {
						padding: 0 4px;
				}
			}

			& a {
					font-weight: 700;
			}
		}
}
</style>
