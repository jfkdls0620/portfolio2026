<script setup lang="ts">
import {RouterLink, RouterView} from "vue-router"
import BrandMark from "./components/BrandMark.vue"
import ThemeToggle from "./components/ThemeToggle.vue"

const year = new Date().getFullYear()
const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  })
</script>

<template>
  <div class="page">
    <a
      class="skip-link"
      href="#main">
      본문으로 바로가기
    </a>
    <header class="header">
      <RouterLink
        class="wordmark"
        to="/"
        aria-label="김동현 포트폴리오 홈">
        <BrandMark :size="40" />
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
          href="https://github.com/jfkdls0620">
          GitHub ↗
        </a>
        <ThemeToggle />
      </nav>
    </header>

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
          >GitHub <span aria-hidden="true">↗</span></a
        >
      </div>
      <div class="footer-bottom">
        <span>© {{ year }} Kim Donghyun</span
        ><button
          type="button"
          @click="scrollToTop">
          맨 위로 <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  </div>
</template>
