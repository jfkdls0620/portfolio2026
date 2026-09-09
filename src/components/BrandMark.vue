<script setup lang="ts">
// public/favicon.svg와 같은 도형을 사용해 사이트 로고와 탭 아이콘을 맞춘다.
// 형태를 바꿀 때는 favicon.svg와 이 파일을 함께 고치고
// `node scripts/generate-icons.mjs`로 ico/png를 다시 만든다.
withDefaults(defineProps<{ size?: number }>(), { size: 40 })
</script>

<template>
  <svg
    class="brand-mark"
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="32" cy="32" r="32" fill="#111111" />
    <path
      fill="#ffffff"
      fill-rule="evenodd"
      d="M16 13 H28 C39.5 13 48.5 21 48.5 32 C48.5 43 39.5 51 28 51 H16 Z M25.5 16.5 H27.6 C35.5 16.5 41.5 23.5 41.5 32 C41.5 40.5 35.5 47.5 27.6 47.5 H25.5 Z"
    />
  </svg>
</template>
