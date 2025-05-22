<script setup lang="ts">
import { getUsers, getUserPosts } from '@/services/apis';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import Posts from '@/components/Posts.vue';

const route = useRoute();
const router = useRouter();
const user_id = parseInt(route.params.id);

const user = await getUser(user_id);
const posts = await getPosts(user_id);
const position = ref<number>(0);

//functions
async function getUser(user_id: number) {
	try {
		const user = await getUsers(user_id);
		if (!user) {
			router.push("/NotFound");
		}
		return user;
	} catch (err) {
		console.error(err);
		router.push("/NotFound");
		throw err;
	}
}

async function getPosts(user_id: number) {
  try {
    const posts = await getUserPosts(user_id);
    if (user) {
      for (const item of posts) {
        item.name = user.name;
        item.username = user.username;
      }
    }
    return posts;
  } catch(err) {
    console.error(err);
  }
}


function goBack() {
	router.back();
}

</script>

<template>
	<div>
		<div class="back">
			<button @click="goBack" class="arrow">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff">
					<g>
						<path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
					</g>
				</svg>
			</button>
			<div>
				<h3>{{user.name}}</h3>
				<span>{{posts.length}} Publications</span>
			</div>
		</div>

		<section class="main-container">
			<div class="banner">
				<div class="avatar border-radius">
					<img src="/user.svg" alt="Logo" />
				</div>
			</div>
			<div class="data">
				<div class="header">
					<h2>{{user.name}}</h2>
					<div>@{{user.username}}</div>
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
							<div v-show="position == 0" class="underline"></div>
						</div>
					</button>
					<button @click="position = 1">
						<div class="option">
							<span>Responses</span>
							<div v-show="position == 1" class="underline"></div>
						</div>
					</button>
		</div>
	</div>
</section>

<section>
	<Posts :data="posts"/>
</section>
</div>
</template>

<style scoped>
h2 {
	margin: 0;
}

h3 {
	margin: 0;
	font-size: 1rem;
}

.main-container {
	width: 100%;
	box-sizing: border-box;
	padding: 0 1px;
}

.back {
	position: sticky;
	display: flex;
	align-items: center;
	top: 0;
	gap: 2rem;
	z-index: 999;
	background-color: #242424;
	
	& span {
		color: var(--gray-2);
		font-size: .8rem;
	}
	
	& .button {
		height: fit-content;
		width: fit-content;
	}
	
	& svg {
		width: 1.5rem;
		height: 1.5rem;
	}
	
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
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: -40px;
	left: 1rem;
	background-color: v-bind(user.color);
	
	& img {
		display: block;
		width: 50%;
		height: 50%;
	}
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
