<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '#imports'
import Image1 from '@/assets/images/fifth/image-1.png'
import Image2 from '@/assets/images/fifth/image-2.png'
import Image3 from '@/assets/images/fifth/image-3.png'
import Image4 from '@/assets/images/fifth/image-4.png'
import Image5 from '@/assets/images/fifth/image-5.png'

useI18n()

const projects = [
  { key: 'p1', img: Image1 },
  { key: 'p2', img: Image2 },
  { key: 'p3', img: Image3 },
  { key: 'p4', img: Image4 },
  { key: 'p5', img: Image5 },
  { key: 'p6', img: Image2 },
]

const sectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const btnVisible = ref(false)
const visibleCards = ref(projects.map(() => false))

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const key = (entry.target as HTMLElement).dataset.anim
        if (key === 'header') headerVisible.value = true
        else if (key === 'btn') btnVisible.value = true
        else if (key?.startsWith('card-')) {
          const i = Number(key.split('-')[1])
          setTimeout(() => { visibleCards.value[i] = true }, i * 100)
        }
        observer?.unobserve(entry.target)
      })
    },
    { threshold: 0.12 },
  )
  sectionRef.value?.querySelectorAll('[data-anim]').forEach((el) => observer!.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="fifth-shell">
    <div class="fifth-card">

      <!-- Header -->
      <div
        class="fifth-header"
        :class="headerVisible ? 'anim-in' : 'anim-out'"
        data-anim="header"
      >
        <span class="section-tag">{{ $t('fifth.tag') }}</span>
        <p class="fifth-sub">{{ $t('fifth.sub') }}</p>
      </div>

      <!-- Grid -->
      <div class="fifth-grid">
        <article
          v-for="(project, i) in projects"
          :key="project.key"
          class="fifth-item"
          :class="visibleCards[i] ? 'card-in' : 'card-out'"
          :data-anim="`card-${i}`"
        >
          <!-- Image -->
          <div class="card-img-wrap">
            <img
              :src="project.img"
              :alt="$t(`fifth.${project.key}_title`)"
              class="card-img"
            />
          </div>

          <!-- Content -->
          <div class="card-body">
            <h3 class="card-title">{{ $t(`fifth.${project.key}_title`) }}</h3>
            <p class="card-text">{{ $t(`fifth.${project.key}_body`) }}</p>
          </div>
        </article>
      </div>

      <!-- Button -->
      <div
        class="fifth-btn-wrap"
        :class="btnVisible ? 'anim-in' : 'anim-out'"
        data-anim="btn"
      >
        <button class="fifth-btn">{{ $t('fifth.btn') }}</button>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Shell ── */
.fifth-shell {
  padding: 32px 20px;
  background: var(--section-bg);
}

/* ── Card wrapper ── */
.fifth-card {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 32px;
  background: var(--card-bg);
  border-radius: 22px;
  box-shadow: var(--card-shadow);
}

/* ── Header ── */
.fifth-header {
  text-align: center;
  margin-bottom: 32px;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.anim-in  { opacity: 1; transform: translateY(0); }
.anim-out { opacity: 0; transform: translateY(20px); }

.section-tag {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 999px;
  background: var(--section-tag-bg);
  color: var(--section-tag-color);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.fifth-sub {
  font-size: 13px;
  color: var(--card-subtitle-color);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.65;
}

/* ── Grid ── */
.fifth-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

/* ── Card ── */
.fifth-item {
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px solid var(--card-item-border);
  overflow: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease;
}
.fifth-item:hover {
  transform: translateY(-6px);
  box-shadow: var(--card-hover-shadow);
}
.card-in  { opacity: 1; transform: translateY(0); }
.card-out { opacity: 0; transform: translateY(28px); }

.card-img-wrap {
  width: 100%;
  height: 186px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.fifth-item:hover .card-img { transform: scale(1.05); }

.card-body {
  padding: 20px;
}
.card-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--card-item-title-color);
  margin: 0 0 6px;
  line-height: 1.4;
}
.card-text {
  font-size: 12px;
  color: var(--card-item-text-color);
  line-height: 1.65;
  margin: 0;
}

/* ── Button ── */
.fifth-btn-wrap {
  text-align: center;
}
.fifth-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 999px;
  background: #4f4fff;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(79, 79, 255, 0.28);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.fifth-btn:hover {
  background: #3d3de0;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(79, 79, 255, 0.38);
}

/* ── Responsive ── */
@media (max-width: 1000px) {
  .fifth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .fifth-card { padding: 22px 16px; }
  .fifth-grid { grid-template-columns: 1fr; }
}
</style>
