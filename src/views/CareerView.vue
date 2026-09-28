<script setup lang="ts">
import careers from "../data/careers.json"

const formatDate = (value: string) => value.replace("-", ".")

const toMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number)
  return year * 12 + (month - 1)
}

// 시작 월과 종료 월을 모두 포함해 세고, 회사 간 겹치는 달은 한 번만 센다.
const totalMonths = (() => {
  const now = new Date()
  const thisMonth = now.getFullYear() * 12 + now.getMonth()
  const ranges = careers
    .map((career) => ({
      from: toMonth(career.period.start),
      to: career.period.end ? toMonth(career.period.end) : thisMonth,
    }))
    .sort((a, b) => a.from - b.from)

  let months = 0
  let counted = -Infinity
  for (const range of ranges) {
    const from = Math.max(range.from, counted + 1)
    if (range.to >= from) months += range.to - from + 1
    counted = Math.max(counted, range.to)
  }
  return months
})()

const totalPeriod = (() => {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (!years) return `${months}개월`
  return months ? `${years}년 ${months}개월` : `${years}년`
})()
</script>

<template>
  <div class="career-page">
    <header class="career-intro">
      <h1>경험을 쌓고,<br />영역을 넓히며<span class="accent">.</span></h1>
      <p class="description">
        웹디자인과 퍼블리싱에서 프론트엔드 개발까지.<br />
        함께한 회사와 그 안에서 맡아온 일을 소개합니다.
      </p>
    </header>

    <div class="timeline-heading">
      <h2>
        함께한 곳들 <span>{{ String(careers.length).padStart(2, "0") }}</span>
      </h2>
      <span class="timeline-total"
        >총 <strong>{{ totalPeriod }}</strong> · 최근 경력순</span
      >
    </div>

    <ol class="career-timeline">
      <li
        v-for="career in careers"
        :key="career.id"
        class="career-entry"
        :class="{current: career.isCurrent}">
        <div class="career-period">
          <span
            v-if="career.isCurrent"
            class="current-badge"
            ><span aria-hidden="true"></span>재직 중</span
          >
          <p>
            <time :datetime="career.period.start">{{ formatDate(career.period.start) }}</time>
            <span> — </span>
            <span v-if="career.isCurrent">현재</span>
            <time
              v-else-if="career.period.end"
              :datetime="career.period.end"
              >{{ formatDate(career.period.end) }}</time
            >
          </p>
          <span class="employment-type">{{ career.employmentType }}</span>
        </div>
        <article
          class="career-content"
          :aria-labelledby="`${career.id}-heading`">
          <p class="career-role">{{ career.role }}</p>
          <h3 :id="`${career.id}-heading`">{{ career.company }}</h3>
          <p class="career-summary">{{ career.summary }}</p>
          <ul
            v-if="career.responsibilities.length"
            class="responsibilities"
            aria-label="주요 담당 업무">
            <li
              v-for="responsibility in career.responsibilities"
              :key="responsibility">
              {{ responsibility }}
            </li>
          </ul>
          <ul
            v-if="career.techStack.length"
            class="tech-stack"
            aria-label="사용 기술">
            <li
              v-for="tech in career.techStack"
              :key="tech">
              {{ tech }}
            </li>
          </ul>
        </article>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.career-page {
  width: 100%;
}
.career-intro {
  padding-bottom: 44px;
}
.career-intro h1 {
  font-size: clamp(36px, 4.8vw, 56px);
  line-height: 1.2;
}
.accent {
  color: var(--muted);
}
.career-intro .description {
  margin-bottom: 0;
}
.timeline-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 22px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.timeline-heading h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
.timeline-heading h2 span {
  margin-left: 8px;
  color: var(--muted);
  font-size: 0.8125rem;
}
.timeline-heading > span {
  font-size: 0.8125rem;
  color: var(--muted);
}
.timeline-total strong {
  color: var(--ink);
  font-weight: 600;
}
.career-timeline {
  margin: 20px 0 0;
  padding: 0 28px;
  list-style: none;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}
.career-entry {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 32px;
}
.career-period {
  padding: 40px 0;
  font-size: 0.8125rem;
}
.career-period p {
  margin: 0 0 10px;
  font-variant-numeric: tabular-nums;
  line-height: 1.8;
}
.employment-type {
  color: var(--muted);
}
.current-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 10px;
  margin-bottom: 16px;
  background: var(--fill);
  border-radius: 20px;
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 600;
}
.current-badge span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ink);
}
.career-content {
  position: relative;
  padding: 40px 0 40px 32px;
  border-left: 1px solid var(--line);
}
.career-content::before {
  content: "";
  position: absolute;
  top: 44px;
  left: -5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--dot);
  outline: 6px solid var(--surface);
}
.current .career-content::before {
  background: var(--ink);
}
.career-entry + .career-entry .career-content {
  border-top: 1px solid var(--line);
}
.career-role {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 0.8125rem;
}
h3 {
  margin: 0;
  font-size: clamp(21px, 2.3vw, 26px);
  line-height: 1.4;
  letter-spacing: -0.04em;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.career-summary {
  margin: 16px 0 20px;
  color: var(--muted);
  line-height: 1.85;
  font-size: 1rem;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.responsibilities {
  margin: 0 0 24px;
  max-width: var(--measure);
  padding-left: 18px;
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.85;
  overflow-wrap: anywhere;
}
.responsibilities li + li {
  margin-top: 8px;
}
.responsibilities li::marker {
  color: var(--muted);
}
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tech-stack li {
  padding: 6px 10px;
  border-radius: 5px;
  background: var(--fill);
  color: var(--ink);
  font-size: 0.8125rem;
  line-height: 1.4;
}
@media (max-width: 700px) {
  .career-timeline {
    padding: 0 20px;
  }
  .career-intro {
    padding-bottom: 36px;
  }
  .career-entry {
    grid-template-columns: 1fr;
    gap: 0;
    position: relative;
    padding: 28px 0 28px 24px;
    border-left: 1px solid var(--line);
  }
  .career-entry + .career-entry {
    border-top: 1px solid var(--line);
  }
  .career-period {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 12px;
    padding: 0 0 20px;
  }
  .career-period p,
  .current-badge {
    margin: 0;
  }
  .career-content {
    position: static;
    padding: 0;
    border: 0;
  }
  .career-entry + .career-entry .career-content {
    border-top: 0;
  }
  .career-content::before {
    top: 36px;
  }
}
</style>
