<script setup lang="ts">
// public/favicon.svg와 같은 도형을 사용해 사이트 로고와 탭 아이콘을 맞춘다.
// 형태를 바꿀 때는 favicon.svg와 이 파일을 함께 고치고
// `node scripts/generate-icons.mjs`로 ico/png를 다시 만든다.
withDefaults(defineProps<{size?: number}>(), {size: 40})
</script>

<template>
  <svg
    class="brand-mark"
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    aria-hidden="true"
    focusable="false">
    <circle
      cx="32"
      cy="32"
      r="32"
      fill="var(--mark-face)" />
    <path
      fill="var(--mark-letter)"
      fill-rule="evenodd"
      d="M18.1 14.9 H28.9 C39.25 14.9 47.35 22.1 47.35 32 C47.35 41.9 39.25 49.1 28.9 49.1 H18.1 Z M26.65 18.05 H28.54 C35.65 18.05 41.05 24.35 41.05 32 C41.05 39.65 35.65 45.95 28.54 45.95 H26.65 Z" />
  </svg>
</template>
