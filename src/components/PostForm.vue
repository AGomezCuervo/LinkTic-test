<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Textarea from '@/primitives/Textarea.vue'
import Button from '@/primitives/Button.vue'

const modalRef = ref(null)
const content = ref('')

function openModal() {
  modalRef.value?.showModal()
}

function closeModal() {
  modalRef.value?.close()
}

function submit() {
  if (content.value.trim()) {
    console.log('Publicando:', content.value)
    closeModal()
    content.value = ''
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
			<div class="avatar-container">
				<div class="border-radius"></div>
			</div>
			<div class="data">
				<Textarea/>
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
	max-width: 100vw;
	margin: 0;
	border-bottom: 1px solid var(--border-color);
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

		& button:nth-child(1) {
		}
		
		& button:nth-child(2) {
				background-color: var(--red-1);
		}
}

.floating{
  position: fixed;
  bottom: 30px; 
  right: 10px;
	width: 56px;
	height: 56px;
	z-index: 1;
	background-color: var(--red-1);
	font-weight: 700;
	font-size: 2rem;
}
</style>
