<script setup lang="ts">
import type { ApiUser } from '@/utils/types';

import { ref, onMounted } from 'vue';
import { createPost } from '@/services/apis';

import Avatar from '@/components/Avatar.vue';
import Textarea from '@/primitives/Textarea.vue';
import Button from '@/primitives/Button.vue';

const props = defineProps<{user: ApiUser }>()

const modalRef = ref(null)
const content = ref('')
console.log(props.user.color);

// functions
function openModal() {
	modalRef.value?.showModal()
}

function closeModal() {
	modalRef.value?.close()
}

async function submit() {
	try {
		if (content.value.trim()) {
			const obj = {
				title: props.user.username,
				body: content.value,
				userId: props.user.id
			};

			const res = await createPost(obj);
			closeModal();
			content.value = '';
			window.location.href = `/users/${res.userId}`;
		} 
 } catch(err) {
			console.error(err);
	}
}

function onClose() {
  content.value = '';
}

function handleClick(e: MouseEvent) {
	if(e.target == modalRef.value) {
		closeModal()
	}
}

</script>
<template>
<div>
	<Button @click="openModal" class="floating">+</Button>
  <dialog class="modal" ref="modalRef" @click="handleClick" @close="onClose">
		<article class="main-container">
			<Avatar :color="props.user.color" size="40px"/>
			<div class="data">
				<Textarea v-model="content"/>
			</div>
		</article>
		<div class="actions">
			<Button @click="closeModal">Close</Button>
			<Button @click="submit">Post</Button>
		</div>
  </dialog>
</div>
</template>

<style scoped>
.modal {
	padding:0;
	border: none;
	width: 100vw;
	max-width: 40rem;
	border: 1px solid var(--border-color);
	margin-top: 0;
	padding-top: 1rem;
}

.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.6);
}

.main-container {
	padding: 1rem;
	display: flex;
	min-height: 10rem;
}

.avatar-container {
	min-width: 40px;
	margin-right: 8px;
	& div {
		background-color: var(--red-1);
		width: 100%;
		height: 40px;
		display: block;
	}
}

.data {
	flex: 1;
}

.actions {
	display: flex;
	justify-content: center;
	gap: 20%;
	margin-bottom: 1rem;
	
	& button:nth-child(2) {
		background-color: v-bind(props.user.color);
	}
}

.floating{
  position: fixed;
  bottom: 30px; 
  right: 10px;
	width: 56px;
	height: 56px;
	z-index: 1;
	background-color: v-bind(props.user.color);
	font-weight: 700;
	font-size: 2rem;
}
</style>
