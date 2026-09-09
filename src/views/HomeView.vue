<script setup lang="ts">
import { RouterLink } from 'vue-router'
import careers from '../data/careers.json'
import projects from '../data/projects.json'
</script>

<template>
  <div class="home-page">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-copy">
        <p class="eyebrow">KIM DONGHYUN / PORTFOLIO</p>
        <h1 id="home-title">
          화면을 넘어,<br /><span class="accent">경험을</span> 만듭니다.
        </h1>
        <p class="home-lead">
          안녕하세요.<br />프론트엔드 개발자 <strong>김동현</strong>입니다.
        </p>
        <p class="description">
          웹디자인과 퍼블리싱에서 시작해,<br />사용자 서비스와 운영 도구의
          프론트엔드를 개발합니다.
        </p>
        <RouterLink class="primary-link" to="/Project"
          >프로젝트 살펴보기 <span aria-hidden="true">↗</span></RouterLink
        >
      </div>
      <aside class="profile-note" aria-label="개발 경험">
        <span class="note-label">MY APPROACH</span>
        <p class="note-title">사용자의 시선으로,<br />더 나은 화면을.</p>
        <p class="note-description">
          디자인을 이해하고, 화면을 구현하고,<br />서비스가 동작하는 과정을
          연결합니다.
        </p>
        <ul>
          <li><span>01</span> 웹디자인</li>
          <li><span>02</span> 웹·앱 퍼블리싱</li>
          <li><span>03</span> 프론트엔드 개발</li>
        </ul>
        <span class="note-signature"
          >김동현 <span aria-hidden="true">↗</span></span
        >
      </aside>
    </section>
    <section class="home-navigation" aria-label="포트폴리오 둘러보기">
      <RouterLink class="home-card" to="/Career"
        ><div class="card-top">
          <span>01 / CAREER</span><span aria-hidden="true">↗</span>
        </div>
        <h2>쌓아온 경험</h2>
        <p>함께한 회사와 그 안에서 맡아온 일들.</p>
        <span class="card-count"
          >{{ String(careers.length).padStart(2, '0') }}개 회사</span
        ></RouterLink
      >
      <RouterLink class="home-card" to="/Project"
        ><div class="card-top">
          <span>02 / PROJECTS</span><span aria-hidden="true">↗</span>
        </div>
        <h2>만들어온 결과</h2>
        <p>직접 구현하고 개선해 온 서비스들.</p>
        <span class="card-count"
          >{{ String(projects.length).padStart(2, '0') }}개 프로젝트</span
        ></RouterLink
      >
    </section>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}
.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  align-items: center;
  gap: 64px;
  padding: 20px 0 84px;
}
.home-copy h1 {
  font-size: clamp(38px, 4.8vw, 62px);
}
.home-lead {
  margin: 30px 0 12px;
  font-size: 20px;
  line-height: 1.7;
  letter-spacing: -0.03em;
}
.home-copy .description {
  font-size: 14px;
}
.primary-link {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: 26px;
  padding: 16px 22px;
  border-radius: 8px;
  color: #fff;
  background: var(--accent);
  font-size: 14px;
  font-weight: 600;
}
.primary-link:hover {
  background: var(--ink);
  text-decoration: none;
}
.profile-note {
  padding: 32px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 12px 40px #263c2c06;
}
.note-label {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.15em;
}
.note-title {
  margin: 32px 0 16px;
  font-size: 27px;
  line-height: 1.45;
  letter-spacing: -0.04em;
  font-weight: 600;
}
.note-description {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.9;
  word-break: keep-all;
}
.profile-note ul {
  list-style: none;
  margin: 28px 0;
  padding: 0;
}
.profile-note li {
  padding: 13px 0;
  border-top: 1px solid var(--line);
  font-size: 13px;
}
.profile-note li span {
  margin-right: 16px;
  color: var(--accent);
  font-size: 10px;
}
.note-signature {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
}
.note-signature > span {
  color: var(--accent);
}
.home-navigation {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.home-card {
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  transition:
    border-color 160ms,
    background 160ms;
}
.home-card:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  text-decoration: none;
}
.card-top {
  display: flex;
  justify-content: space-between;
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.08em;
}
.card-top > span:last-child {
  font-size: 20px;
}
.home-card h2 {
  margin: 28px 0 12px;
  font-size: 25px;
  letter-spacing: -0.04em;
}
.home-card p {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
  word-break: keep-all;
}
.card-count {
  display: block;
  margin-top: 26px;
  font-size: 12px;
  color: var(--muted);
}
@media (max-width: 800px) {
  .home-hero {
    gap: 28px;
  }
  .profile-note {
    padding: 24px;
  }
}
@media (max-width: 700px) {
  .home-hero {
    grid-template-columns: 1fr;
    padding: 0 0 40px;
    gap: 40px;
  }
  .home-navigation {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .home-card {
    padding: 24px;
  }
}
</style>
