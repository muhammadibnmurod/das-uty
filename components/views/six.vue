<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '#imports'
import Image1 from '@/assets/images/six/image-1.png'
import Image2 from '@/assets/images/six/image-2.png'
import Image3 from '@/assets/images/six/image-3.png'

useI18n()

const steps = [
  { key: 's1', img: Image1 },
  { key: 's2', img: Image2 },
  { key: 's3', img: Image3 },
]

const sectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const visibleCards = ref(steps.map(() => false))

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const key = (entry.target as HTMLElement).dataset.anim
        if (key === 'header') headerVisible.value = true
        else if (key?.startsWith('card-')) {
          const i = Number(key.split('-')[1])
          setTimeout(() => { visibleCards.value[i] = true }, i * 120)
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
  <section ref="sectionRef" class="six-shell">
    <div class="six-inner">

      <!-- Header -->
      <div
        class="six-header"
        :class="headerVisible ? 'anim-in' : 'anim-out'"
        data-anim="header"
      >
        <span class="section-tag">{{ $t('six.tag') }}</span>
        <h2 class="six-title">{{ $t('six.title') }}</h2>
      </div>

      <!-- Cards -->
      <div class="six-grid">
        <article
          v-for="(step, i) in steps"
          :key="step.key"
          class="six-card"
          :class="visibleCards[i] ? 'card-in' : 'card-out'"
          :data-anim="`card-${i}`"
        >
          <!-- Image -->
          <div class="six-img-wrap">
            <img
              :src="step.img"
              :alt="$t(`six.${step.key}_title`)"
              class="six-img"
            />
          </div>

          <h3 class="six-card-title">{{ $t(`six.${step.key}_title`) }}</h3>
          <p class="six-card-text">{{ $t(`six.${step.key}_body`) }}</p>
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Shell ── */
.six-shell {
  padding: 48px 20px;
  background: var(--section-bg);
}

.six-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Header ── */
.six-header {
  text-align: center;
  margin-bottom: 40px;
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
  margin-bottom: 16px;
}

.six-title {
  font-size: clamp(24px, 3.5vw, 30px);
  font-weight: 800;
  color: var(--card-title-color);
  line-height: 1.3;
  max-width: 640px;
  margin: 0 auto;
}

/* ── Grid ── */
.six-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

/* ── Card ── */
.six-card {
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px solid var(--card-item-border);
  padding: 24px;
  box-shadow: var(--six-card-shadow);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease;
}
.six-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--six-card-hover-shadow);
}

.card-in  { opacity: 1; transform: translateY(0); }
.card-out { opacity: 0; transform: translateY(32px); }

/* ── Image ── */
.six-img-wrap {
  height: 110px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.six-img {
  height: 100%;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.six-card:hover .six-img { transform: scale(1.05); }

/* ── Text ── */
.six-card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--card-item-title-color);
  margin: 0 0 8px;
  line-height: 1.4;
}

.six-card-text {
  font-size: 12.5px;
  line-height: 1.65;
  color: var(--card-item-text-color);
  margin: 0;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .six-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
}
</style>
