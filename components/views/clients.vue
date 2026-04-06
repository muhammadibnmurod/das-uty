<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '#imports'
import Image1 from '@/assets/images/clients/image-1.png'
import Image2 from '@/assets/images/clients/image-2.png'
import Image3 from '@/assets/images/clients/image-3.png'
import Image4 from '@/assets/images/clients/image-4.png'
import Image5 from '@/assets/images/clients/image-5.png'

useI18n()

const clients = [
  { key: 'c1', img: Image1 },
  { key: 'c2', img: Image2 },
  { key: 'c3', img: Image3 },
  { key: 'c4', img: Image4 },
  { key: 'c5', img: Image5 },
]

const current = ref(0)
const sectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const bodyVisible = ref(false)

const prev = () => {
  current.value = (current.value - 1 + clients.length) % clients.length
}
const next = () => {
  current.value = (current.value + 1) % clients.length
}

let autoInterval: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null

onMounted(() => {
  autoInterval = setInterval(next, 5000)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const key = (entry.target as HTMLElement).dataset.anim
        if (key === 'header') headerVisible.value = true
        else if (key === 'body') bodyVisible.value = true
        observer?.unobserve(entry.target)
      })
    },
    { threshold: 0.12 },
  )
  sectionRef.value?.querySelectorAll('[data-anim]').forEach((el) => observer!.observe(el))
})

onUnmounted(() => {
  if (autoInterval) clearInterval(autoInterval)
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="clients-shell">
    <div class="clients-inner">

      <!-- Header -->
      <div
        class="clients-header"
        :class="headerVisible ? 'anim-in' : 'anim-out'"
        data-anim="header"
      >
        <span class="section-tag">{{ $t('clients.tag') }}</span>
        <h2 class="clients-title">{{ $t('clients.title') }}</h2>
      </div>

      <!-- Body -->
      <div
        class="clients-body"
        :class="bodyVisible ? 'anim-in' : 'anim-out'"
        data-anim="body"
      >
        <!-- Photo Stack -->
        <div class="photo-stack">
          <div class="photo-back" />
          <Transition name="photo-fade" mode="out-in">
            <div :key="current" class="photo-main">
              <img
                :src="clients[current].img"
                :alt="$t(`clients.${clients[current].key}_name`)"
              />
            </div>
          </Transition>
        </div>

        <!-- Client Info -->
        <div class="client-content">
          <Transition name="content-fade" mode="out-in">
            <div :key="current" class="client-info">
              <h3 class="client-name">{{ $t(`clients.${clients[current].key}_name`) }}</h3>
              <p class="client-role">{{ $t(`clients.${clients[current].key}_role`) }}</p>
              <p class="client-quote">{{ $t(`clients.${clients[current].key}_quote`) }}</p>
            </div>
          </Transition>

          <!-- Navigation arrows -->
          <div class="nav-arrows">
            <button class="arrow-btn" @click="prev" :aria-label="$t('clients.prev')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button class="arrow-btn" @click="next" :aria-label="$t('clients.next')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Shell ── */
.clients-shell {
  padding: 64px 20px;
  background: var(--section-bg-white);
}

.clients-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Header ── */
.clients-header {
  text-align: center;
  margin-bottom: 56px;
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
  margin-bottom: 14px;
}

.clients-title {
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 800;
  color: var(--card-title-color);
  line-height: 1.3;
  max-width: 580px;
  margin: 0 auto;
}

/* ── Body ── */
.clients-body {
  display: flex;
  align-items: center;
  gap: 72px;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* ── Photo Stack ── */
.photo-stack {
  position: relative;
  flex-shrink: 0;
  width: 280px;
  height: 320px;
}

.photo-back {
  position: absolute;
  inset: 0;
  border-radius: 26px;
  background: var(--testimonial-back-card);
  transform: rotate(-5deg) translate(-10px, 8px);
}

.photo-main {
  position: absolute;
  inset: 0;
  border-radius: 26px;
  overflow: hidden;
  box-shadow: var(--testimonial-photo-shadow);
}

.photo-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Client Info ── */
.client-content {
  flex: 1;
}

.client-info {
  margin-bottom: 28px;
}

.client-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--card-item-title-color);
  margin: 0 0 6px;
  line-height: 1.3;
}

.client-role {
  font-size: 12px;
  color: var(--card-subtitle-color);
  font-weight: 500;
  margin: 0 0 18px;
}

.client-quote {
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--card-item-text-color);
  margin: 0;
  max-width: 420px;
}

/* ── Navigation ── */
.nav-arrows {
  display: flex;
  gap: 10px;
}

.arrow-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--card-item-border);
  background: transparent;
  color: var(--card-item-title-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.arrow-btn:hover {
  background: var(--section-tag-bg);
  border-color: var(--section-tag-color);
  color: var(--section-tag-color);
}

/* ── Slide transitions ── */
.photo-fade-enter-active,
.photo-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.photo-fade-enter-from { opacity: 0; transform: scale(0.95); }
.photo-fade-leave-to   { opacity: 0; transform: scale(1.04); }

.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.content-fade-enter-from { opacity: 0; transform: translateX(14px); }
.content-fade-leave-to   { opacity: 0; transform: translateX(-14px); }

/* ── Responsive ── */
@media (max-width: 820px) {
  .clients-body {
    flex-direction: column;
    gap: 40px;
    align-items: flex-start;
  }
  .photo-stack {
    width: 240px;
    height: 280px;
    margin: 0 auto;
  }
  .client-content { width: 100%; }
  .client-quote { max-width: 100%; }
}
</style>
