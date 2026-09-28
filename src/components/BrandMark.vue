<script setup lang="ts">
// public/favicon.svg와 같은 도형·색을 쓴다. 테마에 따라 색을 바꾸지 않는데,
// 외형이 달라져도 아이콘의 핵심 요소가 같아야 같은 아이콘으로 인식되기 때문이다.
// 채워진 글자꼴 대신 균일한 굵기의 선으로 그려 AppIcon의 아이콘들과 결을 맞췄다.
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
    <rect
      width="64"
      height="64"
      rx="16"
      fill="#158353" />
    <path
      d="M20 45 V19 H28 C36.5 19 44 24.5 44 32 C44 39.5 36.5 45 28 45 Z"
      fill="none"
      stroke="#ffffff"
      stroke-width="7"
      stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>
