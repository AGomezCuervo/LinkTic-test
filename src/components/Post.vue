<script setup lang="ts">
interface PropsData {
	userName: string,
	title: string,
	body: string
}

defineProps<{data: PropsData}>()
</script>

<template>
<article class="main-container">
	<div class="avatar-container">
		<div class="border-radius"></div>
	</div>
	<div class="info-container">
		<div class="user-info">
			<a>{{data.userName}}</a>
			<div>
				<span>@sml_TJ</span>
				<span>·</span>
				<span>May 19</span>
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

.avatar-container {
		min-width: 40px;
		margin-right: 8px;
		& div {
			background-color: var(--red-1);
			width: 100%;
			height: 40px;
		}
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
