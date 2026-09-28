<script setup lang="ts">
// public/favicon.svg와 같은 도형·색을 쓴다. 테마에 따라 색을 바꾸지 않는데,
// 외형이 달라져도 아이콘의 핵심 요소가 같아야 같은 아이콘으로 인식되기 때문이다.
// 형태나 색을 바꿀 때는 favicon.svg와 이 파일을 함께 고치고
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
      fill="#158353" />
    <path
      fill="#ffffff"
      fill-rule="evenodd"
      d="M18.1 14.9 H28.9 C39.25 14.9 47.35 22.1 47.35 32 C47.35 41.9 39.25 49.1 28.9 49.1 H18.1 Z M26.1 19.9 H28.6 C35.2 19.9 40.85 25.3 40.85 32 C40.85 38.7 35.2 44.1 28.6 44.1 H26.1 Z" />
  </svg>
</template>
