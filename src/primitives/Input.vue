<script setup lang="ts">
defineOptions({
	inheritAttrs: false
})

const model = defineModel<string>();
</script>

<template>
	<div class="container-input">
		<input v-model="model" v-bind="$attrs" class="base-input"/>
	</div>
</template>

<style scoped>

.container-input {
	max-width: 9rem;
	padding:1px;
	background-color: var(--color-surface);
	box-shadow: inset 0 0 0 1px var(--gray-1);
	background-clip: content-box;
}

.base-input {
		width: 100%;
		box-sizing: border-box;
		border: none;
		text-indent: calc(1rem/2);
		height: var(--space-1);
		color: var(--input-text-color);
}

</style>
