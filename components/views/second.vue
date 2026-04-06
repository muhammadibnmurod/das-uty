<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '#imports'
import secondSvg1 from '@/assets/icons/second-1.svg'
import secondSvg2 from '@/assets/icons/second-2.svg'
import secondSvg3 from '@/assets/icons/second-3.svg'
import secondSvg4 from '@/assets/icons/second-4.svg'

const services = [
  { key: 's1', tone: 'blue',   icon: secondSvg1, stat: '200+' },
  { key: 's2', tone: 'gold',   icon: secondSvg2, stat: '50+'  },
  { key: 's3', tone: 'violet', icon: secondSvg3, stat: '99%'  },
  { key: 's4', tone: 'pink',   icon: secondSvg4, stat: '24/7' },
]

useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visibleCards = ref<boolean[]>(services.map(() => false))
const titleVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const idx = el.dataset.index
        if (idx === 'title') {
          titleVisible.value = true
        } else if (idx !== undefined) {
          setTimeout(() => {
            visibleCards.value[Number(idx)] = true
          }, Number(idx) * 120)
        }
        observer?.unobserve(el)
      })
    },
    { threshold: 0.15 },
  )

  const titleEl = sectionRef.value?.querySelector('[data-index="title"]')
  if (titleEl) observer.observe(titleEl)

  sectionRef.value?.querySelectorAll('[data-index]:not([data-index="title"])').forEach((el) => {
    observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="second-shell py-8 px-5">
    <div class="second-card max-w-[1200px] mx-auto px-8 py-9 rounded-[22px]">
      <div class="header-wrap" data-index="title" :class="{ 'title-visible': titleVisible }">
        <span class="section-tag">{{ $t('second.tag') }}</span>
        <h2>{{ $t('second.title') }}</h2>
        <p class="subtitle">{{ $t('second.sub') }}</p>
      </div>

      <div class="service-grid">
        <article
          v-for="(item, i) in services"
          :key="item.key"
          class="service-item"
          :class="[`tone-${item.tone}`, { visible: visibleCards[i] }]"
          :data-index="i"
        >
          <div class="card-top">
            <div class="service-icon" :class="`icon-${item.tone}`">
              <component :is="item.icon" :alt="$t(`second.${item.key}_title`)" class="service-icon-img" />
            </div>
            <span class="service-badge" :class="`badge-${item.tone}`">{{ $t(`second.${item.key}_badge`) }}</span>
          </div>

          <h3>{{ $t(`second.${item.key}_title`) }}</h3>
          <p>{{ $t(`second.${item.key}_body`) }}</p>

          <div class="card-footer">
            <div class="stat-block">
              <span class="stat-value" :class="`stat-${item.tone}`">{{ item.stat }}</span>
              <span class="stat-label">{{ $t(`second.${item.key}_stat_label`) }}</span>
            </div>
            <a href="#" class="service-link" :class="`link-${item.tone}`">
              {{ $t('second.discover') }}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M7 3l3 3-3 3"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>

          <div class="card-glow" :class="`glow-${item.tone}`" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Shell ───────────────────────────────────────── */
.second-shell {
  background: var(--section-bg);
}

/* ── Card wrapper ────────────────────────────────── */
.second-card {
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

/* ── Header ──────────────────────────────────────── */
.header-wrap {
  text-align: center;
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;
}
.header-wrap.title-visible {
  opacity: 1;
  transform: none;
}

.section-tag {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  background: var(--section-tag-bg);
  color: var(--section-tag-color);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.second-card h2 {
  font-size: clamp(17px, 2vw, 24px);
  font-weight: 800;
  color: var(--card-title-color);
  margin: 0 auto 8px;
  max-width: 640px;
  line-height: 1.35;
}

.subtitle {
  font-size: 13px;
  color: var(--card-subtitle-color);
  margin: 0;
}

/* ── Grid ────────────────────────────────────────── */
.service-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

/* ── Card ────────────────────────────────────────── */
.service-item {
  position: relative;
  background: var(--card-item-bg);
  border-radius: 16px;
  padding: 18px 16px 16px;
  border: 1px solid var(--card-item-border);
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}
.service-item.visible {
  opacity: 1;
  transform: none;
}
.service-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-hover-shadow);
}

/* tone border accent on hover */
.service-item.tone-blue:hover  { border-color: rgba(79, 114, 255, 0.3); }
.service-item.tone-gold:hover  { border-color: rgba(244, 183, 64, 0.35); }
.service-item.tone-violet:hover{ border-color: rgba(124, 98, 255, 0.3); }
.service-item.tone-pink:hover  { border-color: rgba(255, 111, 183, 0.3); }

/* ── Card top row ────────────────────────────────── */
.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

/* ── Icon ────────────────────────────────────────── */
.service-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}
.service-item:hover .service-icon {
  transform: scale(1.1) rotate(-4deg);
}

.icon-blue   { background: var(--icon-blue-bg);   border: 1px solid var(--icon-blue-border); }
.icon-gold   { background: var(--icon-gold-bg);   border: 1px solid var(--icon-gold-border); }
.icon-violet { background: var(--icon-violet-bg); border: 1px solid var(--icon-violet-border); }
.icon-pink   { background: var(--icon-pink-bg);   border: 1px solid var(--icon-pink-border); }

.service-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* ── Badge ───────────────────────────────────────── */
.service-badge {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 20px;
}
.badge-blue   { background: var(--badge-blue-bg);   color: var(--badge-blue-color); }
.badge-gold   { background: var(--badge-gold-bg);   color: var(--badge-gold-color); }
.badge-violet { background: var(--badge-violet-bg); color: var(--badge-violet-color); }
.badge-pink   { background: var(--badge-pink-bg);   color: var(--badge-pink-color); }

/* ── Typography ──────────────────────────────────── */
.service-item h3 {
  margin: 0 0 7px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--card-item-title-color);
  line-height: 1.4;
}
.service-item p {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--card-item-text-color);
}

/* ── Footer ──────────────────────────────────────── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--card-footer-border);
}

.stat-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.stat-value {
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
}
.stat-blue   { color: #4f72ff; }
.stat-gold   { color: #d49b10; }
.stat-violet { color: #7c62ff; }
.stat-pink   { color: #e0549a; }

.stat-label {
  font-size: 10px;
  color: var(--card-stat-label-color);
  font-weight: 500;
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
  transition:
    gap 0.2s ease,
    opacity 0.2s ease;
}
.service-link:hover { gap: 8px; opacity: 0.8; }
.link-blue   { color: #4f6cff; }
.link-gold   { color: #c9900a; }
.link-violet { color: #7c62ff; }
.link-pink   { color: #e0549a; }

/* ── Glow ────────────────────────────────────────── */
.card-glow {
  position: absolute;
  inset: -60px;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
  filter: blur(40px);
}
.service-item:hover .card-glow { opacity: 0.08; }
.glow-blue   { background: #4f72ff; }
.glow-gold   { background: #f4b740; }
.glow-violet { background: #7c62ff; }
.glow-pink   { background: #ff6fb7; }

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 1100px) {
  .service-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .second-card { padding: 22px 16px 24px; }
  .service-grid { grid-template-columns: 1fr; }
  .second-card h2 { font-size: 17px; }
}

</style>