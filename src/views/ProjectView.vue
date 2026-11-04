<script setup lang="ts">
import {computed, ref} from "vue"
import AppIcon from "../components/AppIcon.vue"
import projectData from "../data/projects.json"

type Project = Omit<(typeof projectData)[number], "images" | "links"> & {
  images: {src: string; alt: string; caption?: string}[]
  links: {label: string; url: string}[]
}

const projects: Project[] = projectData
const selectedCompany = ref("전체")
const companies = ["전체", ...new Set(projects.map((project) => project.company))]
const visibleProjects = computed(() =>
  projects.filter((project) => selectedCompany.value === "전체" || project.company === selectedCompany.value)
)
const number = (value: number) => String(value).padStart(2, "0")
const formatDate = (value: string) => value.replace("-", ".")
const hasDetails = (project: Project) => project.contributions.length > 0 || project.outcomes.length > 0 || project.images.length > 0
</script>

<template>
  <div class="projects-page">
    <header class="projects-intro">
      <div class="intro-heading">
        <h1>만들고,<br />개선한 것들<span class="accent">.</span></h1>
      </div>
      <p class="description">서비스의 첫 화면부터 운영을 위한 도구까지.<br />직접 만들고 개선해 온 프로젝트를 소개합니다.</p>
    </header>

    <div class="project-toolbar">
      <div
        class="company-filters"
        role="group"
        aria-label="소속 회사별 프로젝트 필터">
        <button
          v-for="company in companies"
          :key="company"
          type="button"
          :aria-pressed="selectedCompany === company"
          @click="selectedCompany = company">
          {{ company }}
        </button>
      </div>
      <p
        class="result-count"
        aria-live="polite">
        {{ number(visibleProjects.length) }}개 프로젝트
      </p>
    </div>

    <div class="project-list">
      <article
        v-for="project in visibleProjects"
        :key="project.id"
        class="project"
        :aria-labelledby="`${project.id}-title`">
        <div class="project-meta">
          <p class="company">{{ project.company }}</p>
          <p
            v-if="project.period.start || project.period.end"
            class="period">
            <time
              v-if="project.period.start"
              :datetime="project.period.start"
              >{{ formatDate(project.period.start) }}</time
            >
            <span v-if="project.period.start && project.period.end"> — </span>
            <time
              v-if="project.period.end"
              :datetime="project.period.end"
              >{{ formatDate(project.period.end) }}</time
            >
          </p>
          <p class="role">{{ project.role }}</p>
        </div>

        <div class="project-content">
          <h2 :id="`${project.id}-title`">{{ project.title }}</h2>
          <p class="project-summary">{{ project.summary }}</p>
          <ul
            v-if="project.techStack.length"
            class="tech-stack"
            aria-label="기술 스택">
            <li
              v-for="tech in project.techStack"
              :key="tech">
              {{ tech }}
            </li>
          </ul>
          <details
            v-if="hasDetails(project)"
            class="project-details">
            <summary>
              <span class="label-closed">담당 기능과 자세한 내용</span><span class="label-open">상세 내용 접기</span
              ><span
                class="toggle-icon"
                aria-hidden="true"
                >+</span
              >
            </summary>
            <div class="detail-content">
              <div
                v-if="project.images.length"
                class="project-gallery">
                <figure
                  v-for="image in project.images"
                  :key="image.src">
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    loading="lazy"
                    decoding="async" />
                  <figcaption v-if="image.caption">
                    {{ image.caption }}
                  </figcaption>
                </figure>
              </div>
              <section
                v-for="contribution in project.contributions"
                :key="contribution.title"
                class="contribution">
                <h3>{{ contribution.title }}</h3>
                <ul>
                  <li
                    v-for="item in contribution.items"
                    :key="item">
                    {{ item }}
                  </li>
                </ul>
              </section>
              <section
                v-if="project.outcomes.length"
                class="outcomes">
                <h3>성과와 개선</h3>
                <ul>
                  <li
                    v-for="outcome in project.outcomes"
                    :key="outcome">
                    {{ outcome }}
                  </li>
                </ul>
              </section>
            </div>
          </details>
          <div
            v-if="project.links.length"
            class="project-links">
            <a
              v-for="link in project.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ link.label }} <AppIcon name="arrow-up-right" /><span class="sr-only"> (새 탭)</span></a
            >
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  width: 100%;
}
.projects-intro {
  padding-bottom: 44px;
}
.intro-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}
.intro-heading h1 {
  margin: 16px 0 24px;
  font-size: var(--text-display);
  line-height: 1.18;
}
.accent {
  color: var(--point);
}
.projects-intro .description {
  margin: 0;
}
.project-toolbar {
  border-top: 1px solid var(--line);
  padding: 20px 0;
}
.company-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.company-filters button {
  border: 1px solid var(--line);
  border-radius: 24px;
  background: transparent;
  color: var(--muted);
  padding: 12px 16px;
  min-height: 44px;
  font: inherit;
  font-size: var(--text-label);
  cursor: pointer;
}
.company-filters button:hover {
  background: var(--fill);
}
.company-filters button[aria-pressed="true"] {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--on-ink);
}
.company-filters button:focus-visible,
summary:focus-visible {
  outline: 2px solid var(--point);
  outline-offset: 4px;
}
.result-count {
  margin: 20px 0 0;
  font-size: var(--text-label);
  color: var(--muted);
}
.project {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 32px;
  padding: 32px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}
.project-list {
  display: grid;
  gap: 16px;
}
.project-meta {
  font-size: var(--text-label);
}
.company {
  margin: 0 0 12px;
  font-weight: 600;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.period {
  margin: 0 0 12px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.role {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}
h2 {
  margin: 0;
  font-size: var(--text-title);
  letter-spacing: -0.04em;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.project-summary {
  margin: 16px 0 20px;
  font-size: var(--text-body);
  color: var(--muted);
  line-height: var(--leading-prose);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tech-stack li {
  padding: 8px 12px;
  border-radius: 5px;
  background: var(--fill);
  color: var(--ink);
  font-size: var(--text-label);
  line-height: 1.4;
}
.project-details {
  margin-top: 24px;
}
summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 44px;
  padding: 12px 0;
  border-top: 1px solid var(--line);
  cursor: pointer;
  font-size: var(--text-label);
  font-weight: 600;
  list-style: none;
}
summary::-webkit-details-marker {
  display: none;
}
summary:hover {
  color: var(--ink);
}
.toggle-icon {
  font-size: var(--text-title);
  font-weight: 400;
}
.label-open {
  display: none;
}
details[open] .label-open {
  display: inline;
}
details[open] .label-closed {
  display: none;
}
details[open] .toggle-icon {
  transform: rotate(45deg);
}
.detail-content {
  padding-top: 24px;
  border-top: 1px solid var(--line);
  padding-bottom: 8px;
}
.contribution + .contribution {
  margin-top: 28px;
}
h3 {
  margin: 0 0 12px;
  font-size: var(--text-section);
  line-height: 1.5;
}
.detail-content ul {
  margin: 0;
  padding-left: 16px;
  max-width: var(--measure);
  color: var(--muted);
  font-size: var(--text-body);
  line-height: var(--leading-prose);
  overflow-wrap: anywhere;
}
.detail-content li + li {
  margin-top: 8px;
}
.detail-content li::marker {
  color: var(--muted);
}
.outcomes {
  margin-top: 28px;
  padding: 24px;
  border-radius: 8px;
  background: var(--fill);
}
.project-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 240px));
  gap: 20px;
  margin-bottom: 28px;
}
figure {
  margin: 0;
}
figure img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}
figcaption {
  margin-top: 8px;
  color: var(--muted);
  font-size: var(--text-label);
}
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  font-size: var(--text-label);
}
.project-links a {
  padding: 12px 0;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (max-width: 700px) {
  .project {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 24px;
  }
  .project-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px 12px;
  }
  .company,
  .period,
  .role {
    margin: 0;
  }
  .role {
    width: 100%;
  }
  .projects-intro {
    padding-bottom: 36px;
  }
  .outcomes {
    padding: 20px;
  }
  .project-gallery {
    display: flex;
    gap: 12px;
    margin-inline: -24px;
    padding-inline: 24px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 24px;
    scrollbar-width: none;
  }
  .project-gallery::-webkit-scrollbar {
    display: none;
  }
  .project-gallery figure {
    flex: 0 0 64%;
    scroll-snap-align: start;
  }
}
@media (max-width: 380px) {
  .intro-heading {
    gap: 8px;
  }
  .company-filters button {
    padding: 12px 12px;
  }
}
</style>
