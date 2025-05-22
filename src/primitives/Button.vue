<script setup lang="ts">
</script>

<template>
	<button class="base-button border-radius">
		<slot />
	</button>
</template>

<style scoped>

.base-button {
	box-sizing: border-box;
	border: none;
	text-align: center;
	text-indent: calc(1rem/2);
	font-size: 1rem;
	min-height: 2rem;
	font-weight: 700;
	height: fit-content;
	padding: 0 1rem;
	text-indent: initial;
}

</style>
