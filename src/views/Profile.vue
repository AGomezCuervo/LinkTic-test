<script setup lang="ts">
import { getUser, getUserPosts } from '@/services/apis';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Posts from '@/components/Posts.vue';

interface PropsData {
	name: string,
	username: string,
	website: string
	email: string
	phone: string
}
defineProps<{data: PropsData}>();

const route = useRoute();
const user_id = parseInt(route.params.id);

const user = await getUser(user_id);
const posts = await getUserPosts(user_id);
const position = ref<number>(1);

</script>
<template>
<section class="main-container">
	<div class="header">
		<h2>{{user.name}}</h2>
		<span>@{{user.name}}</span>
	</div>
	
	<div class="navBar">
		<button>
			<div class="option">
				<span>Publications</span>
				<div v-show="position==1" class="underline"></div>
			</div>
		</button>
		<button>
			<div class="option">
				<span>Responses</span>
				<div v-show="position==2" class="underline"></div>
			</div>
		</button>
	</div>
</section>

<section>
	<Posts :data="posts"/>
</section>
</template>

<style scoped>
h2 {
		margin: 0;
}

.main-container {
	width: 100%;
	padding: 1rem 1rem 0 1rem;
	box-sizing: border-box;
}

.navBar {
	display: flex;
	justify-content:space-around;

	& > button {
		flex: 1;
	}

	& span{
		font-weight:bold
	}
}

.option {
		position:relative;
		width: fit-content;
		margin: 0 auto;
}

.header {
		display: flex;

		& span {
			color: var(--gray-2);
		}
}

.underline {
	position: absolute;
	background-color: var(--red-1);
	height: 3px;
	width: 100%;
	margin: 0 auto;
	border-radius:
}
	
section:not(:last-child) {
 	border-bottom: 1px solid var(--border-color);
}
</style>
