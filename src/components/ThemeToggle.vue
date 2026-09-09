<script setup lang="ts">
import {onMounted, ref} from "vue"

type Theme = "light" | "dark"

const STORAGE_KEY = "theme"
const theme = ref<Theme>("light")

// index.html의 인라인 스크립트가 첫 페인트 전에 이미 적용해 둔 값을 읽어온다.
onMounted(() => {
  theme.value = document.documentElement.dataset.theme === "dark" ? "dark" : "light"
})

const apply = (next: Theme) => {
  theme.value = next
  const root = document.documentElement
  if (next === "dark") root.dataset.theme = "dark"
  else delete root.dataset.theme

  // 모바일 브라우저 주소창 색을 현재 테마에 맞춘다.
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#101310" : "#f7f8f5")

  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // 저장이 막힌 환경에서는 이번 방문에만 적용한다.
  }
}

const toggle = () => apply(theme.value === "dark" ? "light" : "dark")
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'"
    @click="toggle">
    <svg
      v-if="theme === 'dark'"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round">
      <circle
        cx="12"
        cy="12"
        r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6L17 17M7 7L5.4 5.4" />
    </svg>
    <svg
      v-else
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: 4px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--muted);
  cursor: pointer;
}
.theme-toggle:hover {
  background: var(--accent-soft);
  color: var(--ink);
}
</style>
