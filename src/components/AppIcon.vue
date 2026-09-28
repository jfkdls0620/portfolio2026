<script setup lang="ts">
// 화살표를 유니코드 글리프 대신 그려서 굵기와 크기를 본문과 맞춘다.
withDefaults(defineProps<{name: "arrow-up-right" | "arrow-up"; size?: number}>(), {size: 16})
</script>

<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round">
    <template v-if="name === 'arrow-up-right'">
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </template>
    <template v-else>
      <path d="M12 19V5" />
      <path d="M5.5 11.5 12 5l6.5 6.5" />
    </template>
  </svg>
</template>

<style scoped>
.app-icon {
  display: inline-block;
  flex: none;
  vertical-align: -0.12em;
}
</style>
