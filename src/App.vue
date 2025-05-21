<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
<RouterView v-slot="{ Component }">
  <Suspense timeout="0">
    <template #default>
      <div>
        <component :is="Component" :key="$route.path" />
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</RouterView>
</template>

<style scoped>
.main-layout {
	border: 1px solid var(--border-color);
	margin: 0 auto;
	max-width: 600px;
}
</style>
