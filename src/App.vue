<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue"
import {RouterLink, RouterView} from "vue-router"
import AppIcon from "./components/AppIcon.vue"
import ThemeToggle from "./components/ThemeToggle.vue"

const year = new Date().getFullYear()

// 조금이라도 스크롤되면 헤더가 본문 위에 걸친 상태로 본다.
const isStuck = ref(false)
const updateStuck = () => (isStuck.value = window.scrollY > 0)

onMounted(() => {
  updateStuck()
  window.addEventListener("scroll", updateStuck, {passive: true})
})

onBeforeUnmount(() => window.removeEventListener("scroll", updateStuck))
const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  })
</script>

<template>
  <div class="shell">
    <a
      class="skip-link"
      href="#main">
      본문으로 바로가기
    </a>
    <header
      class="header"
      :class="{'is-stuck': isStuck}">
      <div class="header-inner">
        <RouterLink
          class="wordmark"
          to="/"
          aria-label="김동현 포트폴리오 홈">
          <span class="brand-name">김동현<small>Frontend Developer</small></span>
        </RouterLink>
        <nav
          class="navigation"
          aria-label="주 메뉴">
          <RouterLink
            class="nav-link"
            to="/Career">
            Career
          </RouterLink>
          <RouterLink
            class="nav-link"
            to="/Project">
            Projects
          </RouterLink>
          <a
            class="nav-link github-link"
            href="https://github.com/jfkdls0620"
            target="_blank"
            rel="noopener noreferrer">
            GitHub <AppIcon name="arrow-up-right" /><span class="sr-only"> (새 탭)</span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>

    <div class="page">
      <main
        id="main"
        tabindex="-1">
        <RouterView />
      </main>

      <footer class="site-footer">
        <div class="footer-top">
          <RouterLink
            to="/"
            class="footer-name"
            >김동현<span>사용자의 경험을 생각하며 만듭니다.</span></RouterLink
          ><a
            class="footer-github"
            href="https://github.com/jfkdls0620"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub <AppIcon name="arrow-up-right" /><span class="sr-only"> (새 탭)</span></a
          >
        </div>
        <div class="footer-bottom">
          <span>© {{ year }} Kim Donghyeon</span
          ><button
            type="button"
            @click="scrollToTop">
            맨 위로 <AppIcon name="arrow-up" />
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
