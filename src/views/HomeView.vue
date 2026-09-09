<script setup lang="ts">
import {RouterLink} from "vue-router"
import careers from "../data/careers.json"
import projects from "../data/projects.json"

const pad = (count: number) => String(count).padStart(2, "0")
</script>

<template>
  <div class="home-page">
    <section
      class="home-hero"
      aria-labelledby="home-title">
      <h1 id="home-title">화면을 넘어,<br /><span class="accent">경험을</span> 만듭니다.</h1>
    </section>
    <nav
      class="home-links"
      aria-label="포트폴리오 둘러보기">
      <RouterLink
        class="home-link"
        to="/Career">
        <span class="link-name">Career</span>
        <span class="link-count">{{ pad(careers.length) }}개 회사</span>
        <span
          class="link-arrow"
          aria-hidden="true"
          >↗</span
        >
      </RouterLink>
      <RouterLink
        class="home-link"
        to="/Project">
        <span class="link-name">Projects</span>
        <span class="link-count">{{ pad(projects.length) }}개 프로젝트</span>
        <span
          class="link-arrow"
          aria-hidden="true"
          >↗</span
        >
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}
.home-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: min(44vh, 340px);
  padding: 32px 0 72px;
}
.home-hero h1 {
  margin: 0;
  font-size: clamp(40px, 6vw, 78px);
  line-height: 1.24;
  letter-spacing: -0.045em;
}
.home-links {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
}
.home-link {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 34px 4px;
  border-bottom: 1px solid var(--line);
  transition: padding-left 200ms;
}
.home-link:hover {
  padding-left: 16px;
  text-decoration: none;
}
.link-name {
  flex: 1;
  font-size: clamp(26px, 3.4vw, 38px);
  font-weight: 600;
  letter-spacing: -0.035em;
}
.home-link:hover .link-name {
  color: var(--accent);
}
.link-count {
  color: var(--muted);
  font-size: 13px;
}
.link-arrow {
  align-self: center;
  font-size: 20px;
  color: var(--muted);
}
.home-link:hover .link-arrow {
  color: var(--accent);
}
@media (max-width: 700px) {
  .home-hero {
    min-height: 0;
    padding: 12px 0 64px;
  }
  .home-link {
    padding: 26px 2px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .home-link {
    transition: none;
  }
}
</style>
