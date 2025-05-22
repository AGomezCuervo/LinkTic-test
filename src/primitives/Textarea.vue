<script setup lang="ts">
		import { ref, watch } from 'vue';

defineOptions({
	inheritAttrs: false
})

const model = defineModel<string>();
const textareaRef = ref(null);

watch(model, () => {
  adjustHeight()
})

function adjustHeight() {
		const el = textareaRef.value;
		if (el) {
			el.style.height = 'auto'
			el.style.height = `${Math.min(el.scrollHeight, 264)}px`
  }
}

</script>

<template>
	<textarea
		placeholder="What’s happening?"
		v-model="model"
		v-bind="$attrs"
		ref="textareaRef"
		class="base-textarea"
		autocapitalize="sentences"
		autocomplete="on"
		autocorrect="on"
		spellcheck="true"
		rows="1"
		dir="auto"
	/>
</template>

<style scoped>
.base-textarea {
		width: 100%;
		box-sizing: border-box;
		border: none;
		resize: none;
		text-indent: calc(1rem/2);
		height: 120px;
		color: var(--input-text-color);
		outline: none;
		font-family: inherit;
		font-size: 1rem;
		line-height: 24px;
		min-height: 120px;
		max-height: 264px;
		text-wrap: auto;
}
</style>
