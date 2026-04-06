<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from '#imports'
import icon1 from '@/assets/icons/fourth/fourth-1.svg'
import icon2 from '@/assets/icons/fourth/fourth-2.svg'
import icon3 from '@/assets/icons/fourth/fourth-3.svg'
import icon4 from '@/assets/icons/fourth/fourth-4.svg'
import icon5 from '@/assets/icons/fourth/fourth-5.svg'
import icon6 from '@/assets/icons/fourth/fourth-6.svg'

const items = [
  { key: 'i1', icon: icon1, tone: 'blue',   num: '01' },
  { key: 'i2', icon: icon2, tone: 'violet', num: '02' },
  { key: 'i3', icon: icon3, tone: 'cyan',   num: '03' },
  { key: 'i4', icon: icon4, tone: 'gold',   num: '04' },
  { key: 'i5', icon: icon5, tone: 'pink',   num: '05' },
  { key: 'i6', icon: icon6, tone: 'green',  num: '06' },
]

const sectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const visibleCards = ref(items.map(() => false))

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const key = (entry.target as HTMLElement).dataset.anim
        if (key === 'header') {
          headerVisible.value = true
        } else if (key?.startsWith('card-')) {
          const i = Number(key.split('-')[1])
          setTimeout(() => { visibleCards.value[i] = true }, i * 90)
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
  <section ref="sectionRef" class="fourth-shell py-8 px-5">
    <div class="fourth-card rounded-[22px]">

      <!-- ── Header ── -->
      <div
        class="fourth-header"
        data-anim="header"
        :class="{ 'header-visible': headerVisible }"
      >
        <span class="section-tag">{{ $t('fourth.tag') }}</span>
        <h2>{{ $t('fourth.title') }}</h2>
        <p class="fourth-sub">{{ $t('fourth.sub') }}</p>
      </div>

      <!-- ── Grid ── -->
      <div class="fourth-grid">
        <article
          v-for="(item, i) in items"
          :key="item.key"
          class="fourth-item"
          :class="[`item-${item.tone}`, { 'card-visible': visibleCards[i] }]"
          :data-anim="`card-${i}`"
        >
          <!-- top row: icon + number -->
          <div class="item-top">
            <div class="item-icon-wrap" :class="`icon-bg-${item.tone}`">
              <component :is="item.icon" class="item-icon-img" />
            </div>
            <span class="item-num" :class="`num-${item.tone}`">{{ item.num }}</span>
          </div>

          <h3>{{ $t(`fourth.${item.key}_title`) }}</h3>
          <p>{{ $t(`fourth.${item.key}_body`) }}</p>

          <!-- footer link -->
          <a href="#" class="item-link" :class="`link-${item.tone}`">
            {{ $t('fourth.discover') }}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <!-- hover accent line -->
          <span class="item-accent" :class="`accent-${item.tone}`" />
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Shell ───────────────────────────────── */
.fourth-shell {
  background: var(--section-bg-white);
}

/* ── Wrapper ─────────────────────────────── */
.fourth-card {
  background: var(--card-bg);
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 32px 36px;
  box-shadow: var(--card-shadow);
}

/* ── Header ──────────────────────────────── */
.fourth-header {
  text-align: center;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.fourth-header.header-visible {
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

.fourth-card h2 {
  margin: 0 auto 10px;
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 800;
  color: var(--card-title-color);
  line-height: 1.3;
}

.fourth-sub {
  margin: 0 auto;
  max-width: 500px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--card-subtitle-color);
}

/* ── Grid ────────────────────────────────── */
.fourth-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* ── Card ────────────────────────────────── */
.fourth-item {
  position: relative;
  background: var(--card-item-bg);
  border-radius: 16px;
  padding: 20px 18px 18px;
  border: 1px solid var(--card-item-border);
  overflow: hidden;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}
.fourth-item.card-visible {
  opacity: 1;
  transform: none;
}
.fourth-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-hover-shadow);
}

/* tone border on hover */
.fourth-item.item-blue:hover   { border-color: rgba(79,114,255,.3) }
.fourth-item.item-violet:hover { border-color: rgba(124,98,255,.3) }
.fourth-item.item-cyan:hover   { border-color: rgba(26,173,164,.3) }
.fourth-item.item-gold:hover   { border-color: rgba(244,183,64,.3) }
.fourth-item.item-pink:hover   { border-color: rgba(255,111,183,.3) }
.fourth-item.item-green:hover  { border-color: rgba(34,197,94,.3) }

/* ── Top row ─────────────────────────────── */
.item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

/* ── Icon ────────────────────────────────── */
.item-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  transition: transform 0.25s ease;
}
.fourth-item:hover .item-icon-wrap {
  transform: scale(1.1) rotate(-4deg);
}

.item-icon-img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.icon-bg-blue   { background: var(--icon-blue-bg);   border: 1px solid var(--icon-blue-border) }
.icon-bg-violet { background: var(--icon-violet-bg); border: 1px solid var(--icon-violet-border) }
.icon-bg-cyan   { background: var(--icon-cyan-bg);   border: 1px solid var(--icon-cyan-border) }
.icon-bg-gold   { background: var(--icon-gold-bg);   border: 1px solid var(--icon-gold-border) }
.icon-bg-pink   { background: var(--icon-pink-bg);   border: 1px solid var(--icon-pink-border) }
.icon-bg-green  { background: var(--icon-green-bg);  border: 1px solid var(--icon-green-border) }

/* ── Number badge ────────────────────────── */
.item-num {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  opacity: 0.45;
}
.num-blue   { color: #4f72ff }
.num-violet { color: #7c62ff }
.num-cyan   { color: #1aada4 }
.num-gold   { color: #c9900a }
.num-pink   { color: #e0549a }
.num-green  { color: #16a34a }

/* ── Typography ──────────────────────────── */
.fourth-item h3 {
  margin: 0 0 8px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--card-item-title-color);
  line-height: 1.4;
}
.fourth-item p {
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--card-item-text-color);
}

/* ── Link ────────────────────────────────── */
.item-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 700;
  text-decoration: none;
  transition: gap 0.2s ease, opacity 0.2s ease;
}
.item-link:hover { gap: 9px; opacity: 0.75 }

.link-blue   { color: #4f72ff }
.link-violet { color: #7c62ff }
.link-cyan   { color: #1aada4 }
.link-gold   { color: #c9900a }
.link-pink   { color: #e0549a }
.link-green  { color: #16a34a }

/* ── Bottom accent line ──────────────────── */
.item-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 0 0 16px 16px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.fourth-item:hover .item-accent { transform: scaleX(1) }

.accent-blue   { background: linear-gradient(90deg, #4f72ff, #a5b4fc) }
.accent-violet { background: linear-gradient(90deg, #7c62ff, #c4b5fd) }
.accent-cyan   { background: linear-gradient(90deg, #1aada4, #67e8f9) }
.accent-gold   { background: linear-gradient(90deg, #d49b10, #fcd34d) }
.accent-pink   { background: linear-gradient(90deg, #e0549a, #f9a8d4) }
.accent-green  { background: linear-gradient(90deg, #16a34a, #86efac) }

/* ── Responsive ──────────────────────────── */
@media (max-width: 1000px) {
  .fourth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) }
}

@media (max-width: 640px) {
  .fourth-card { padding: 22px 16px 24px }
  .fourth-grid { grid-template-columns: 1fr }
}

</style>
