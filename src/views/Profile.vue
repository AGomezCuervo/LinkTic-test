<script setup lang="ts">
import { getUsers, getUserPosts } from '@/services/apis';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Posts from '@/components/Posts.vue';
import PostForm from '@/components/PostForm.vue';

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

const user = await getUsers(user_id);
const posts = await getUserPosts(user_id);
const position = ref<number>(0);

//functions
</script>
<template>
	<PostForm :color="user.color"/>
<section class="main-container">
	<div class="banner">
		<div class="avatar border-radius"></div>
	</div>
	<div class="data">
		<div class="header">
			<h2>{{user.name}}</h2>
			<div>@{{user.name}}</div>
		</div>
		
		<div class="content">
			<div>Email: {{user.email}}</div>
			<div>Website: {{user.website}}</div>
			<div>Phone: {{user.phone}}</div>
		</div>
		<div class="footer">
			<div>{{user.address.city}} - {{user.address.street}}</div>
		</div>
		
		<div class="navBar">
			<button @click="position = 0">
				<div class="option">
					<span>Publications</span>
					<div v-show="position==0" class="underline"></div>
				</div>
			</button>
			<button @click="position = 1">
				<div class="option">
					<span>Responses</span>
					<div v-show="position==1" class="underline"></div>
				</div>
			</button>
		</div>
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
	box-sizing: border-box;
	padding: 0 1px;
}

.data {
		padding: 1rem 1rem 0 1rem;
}

.banner {
		position:relative;
		background-color: var(--gray-3);
		min-height: 8rem;
		margin-bottom: 40px;
}

.avatar {
		width: 80px;
		position: absolute;
		height: 80px;
		bottom: -40px;
		left: 1rem;
		background-color: v-bind(user.color);
}

.header {
		margin-bottom: 1rem;
		& div {
			color: var(--gray-2);
		}
}

.footer {
	margin-top: 1rem;
	color: var(--gray-2);
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
