<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from '#imports'
import ThirdImg from '@/assets/images/third.png'

useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const imgVisible = ref(false)
const contentVisible = ref(false)
const visibleItems = ref([false, false, false, false])

const features = [
  {
    tone: 'blue',
    key: 'f1',
    icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor"/>`,
  },
  {
    tone: 'violet',
    key: 'f2',
    icon: `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" fill="currentColor"/>`,
  },
  {
    tone: 'cyan',
    key: 'f3',
    icon: `<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor"/>`,
  },
  {
    tone: 'pink',
    key: 'f4',
    icon: `<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="currentColor"/>`,
  },
]

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const key = (entry.target as HTMLElement).dataset.anim
        if (key === 'img') imgVisible.value = true
        else if (key === 'content') contentVisible.value = true
        else if (key?.startsWith('item-')) {
          const i = Number(key.split('-')[1])
          setTimeout(() => { visibleItems.value[i] = true }, i * 100)
        }
        observer?.unobserve(entry.target)
      })
    },
    { threshold: 0.15 },
  )

  sectionRef.value?.querySelectorAll('[data-anim]').forEach((el) => observer!.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="third-shell">
    <div class="third-card">

      <!-- ── Left: Visual ── -->
      <div
        class="third-visual"
        data-anim="img"
        :class="{ 'anim-in-left': imgVisible }"
      >
        <!-- decorative blobs -->
        <span class="blob blob-blue" />
        <span class="blob blob-violet" />

        <!-- image frame -->
        <div class="img-frame">
          <div class="img-border" />
          <img :src="ThirdImg" alt="About us illustration" class="third-image" />

          <!-- floating badge -->
          <div class="float-badge badge-top">
            <span class="badge-dot dot-cyan" />
            <span>{{ $t('third.badge_projects') }}</span>
          </div>
          <div class="float-badge badge-bottom">
            <span class="badge-dot dot-pink" />
            <span>{{ $t('third.badge_years') }}</span>
          </div>
        </div>
      </div>

      <!-- ── Right: Content ── -->
      <div
        class="third-content"
        data-anim="content"
        :class="{ 'anim-in-right': contentVisible }"
      >
        <span class="kicker-tag">{{ $t('third.tag') }}</span>

        <h2>{{ $t('third.title') }}</h2>

        <p class="third-text">{{ $t('third.body') }}</p>

        <!-- feature list -->
        <ul class="feature-list">
          <li
            v-for="(f, i) in features"
            :key="f.key"
            class="feature-item"
            :data-anim="`item-${i}`"
            :class="[`tone-${f.tone}`, { 'item-visible': visibleItems[i] }]"
          >
            <div class="feature-icon" :class="`icon-${f.tone}`">
              <svg width="16" height="16" viewBox="0 0 24 24" v-html="f.icon" />
            </div>
            <span>{{ $t(`third.${f.key}`) }}</span>
          </li>
        </ul>

        <div class="btn-row">
          <button class="third-btn">
            {{ $t('third.btn') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="trust-row">
            <span class="trust-dot" />
            <span class="trust-dot" />
            <span class="trust-dot" />
            <span class="trust-text">{{ $t('third.trust') }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Shell ───────────────────────────────────── */
.third-shell {
  background: #fff;
  padding: 32px 20px 48px;
}

/* ── Card ────────────────────────────────────── */
.third-card {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 32px 36px;
  display: grid;
  grid-template-columns: minmax(260px, 420px) 1fr;
  align-items: center;
  gap: 40px;
  border-radius: 22px;
  background: #fff;
  box-shadow:
    0 2px 0 rgba(80, 100, 200, 0.04),
    0 24px 48px rgba(22, 30, 80, 0.06);
}

/* ── Entrance animations ─────────────────────── */
.third-visual,
.third-content {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.third-visual  { transform: translateX(-32px) }
.third-content { transform: translateX(32px) }

.anim-in-left  { opacity: 1 !important; transform: none !important }
.anim-in-right { opacity: 1 !important; transform: none !important }

/* ── Visual side ─────────────────────────────── */
.third-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(48px);
}
.blob-blue   { width: 260px; height: 260px; background: rgba(79,108,255,.1);  top: -20px; left: -20px }
.blob-violet { width: 200px; height: 200px; background: rgba(124,98,255,.09); bottom: 0; right: 10px }

.img-frame {
  position: relative;
  z-index: 1;
}

.img-border {
  position: absolute;
  inset: -6px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(79,108,255,.25), rgba(68,235,225,.15), rgba(124,98,255,.2));
  z-index: 0;
}

.third-image {
  position: relative;
  z-index: 1;
  width: min(340px, 100%);
  height: auto;
  border-radius: 16px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 20px 40px rgba(20,30,80,.12));
}

/* floating badges */
.float-badge {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(20, 30, 90, 0.13);
  font-size: 11.5px;
  font-weight: 700;
  color: #12131e;
  white-space: nowrap;
  animation: badgeFloat 4s ease-in-out infinite;
}
.badge-top    { top: 12px; right: -18px; animation-delay: 0s }
.badge-bottom { bottom: 24px; left: -18px; animation-delay: 1.5s }

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0) }
  50%       { transform: translateY(-7px) }
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-cyan { background: #44ebe1; box-shadow: 0 0 6px rgba(68,235,225,.7) }
.dot-pink { background: #ff6fb7; box-shadow: 0 0 6px rgba(255,111,183,.7) }

/* ── Content side ────────────────────────────── */
.kicker-tag {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  background: #eef0ff;
  color: #4f6cff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.third-content h2 {
  margin: 0 0 12px;
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 800;
  color: #0d0e1c;
  line-height: 1.3;
}

.third-text {
  margin: 0 0 20px;
  font-size: 13px;
  line-height: 1.7;
  color: #8890aa;
  max-width: 460px;
}

/* ── Feature list ────────────────────────────── */
.feature-list {
  list-style: none;
  margin: 0 0 24px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 16px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12.5px;
  font-weight: 600;
  color: #12131e;
  line-height: 1.45;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.feature-item.item-visible {
  opacity: 1;
  transform: none;
}

.feature-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
.feature-item:hover .feature-icon { transform: scale(1.12) }

.icon-blue   { background: #eff2ff; color: #4f72ff }
.icon-violet { background: #f1ecff; color: #7c62ff }
.icon-cyan   { background: #e6faf9; color: #1aada4 }
.icon-pink   { background: #ffe8f4; color: #e0549a }

/* ── Button row ──────────────────────────────── */
.btn-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.third-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(90deg, #3434ff, #4b67ff);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(52, 52, 255, 0.3);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
  position: relative;
  overflow: hidden;
}
.third-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.third-btn:hover::before { transform: translateX(100%) }
.third-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(52, 52, 255, 0.42);
}

/* trust row */
.trust-row {
  display: flex;
  align-items: center;
  gap: 5px;
}
.trust-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a0b4ff, #6680ff);
  border: 2px solid #fff;
  margin-left: -6px;
}
.trust-dot:first-child { margin-left: 0 }
.trust-text {
  margin-left: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: #8890aa;
}

/* ── Responsive ──────────────────────────────── */
@media (max-width: 900px) {
  .third-card {
    grid-template-columns: 1fr;
    padding: 24px 20px;
    gap: 28px;
  }
  .third-visual { transform: translateY(-20px) }
  .anim-in-left { transform: none !important }
  .third-content { transform: translateY(20px); text-align: center }
  .anim-in-right { transform: none !important }
  .third-text { margin-inline: auto }
  .feature-list { grid-template-columns: 1fr }
  .feature-item { justify-content: flex-start; text-align: left }
  .btn-row { justify-content: center }
  .badge-top    { right: 0 }
  .badge-bottom { left: 0 }
}

@media (max-width: 480px) {
  .float-badge { display: none }
}

/* ── Dark mode ───────────────────────────────── */
:global(.dark) .third-shell { background: #080b18; }
:global(.dark) .third-card {
  background: #0f1120;
  box-shadow: 0 2px 0 rgba(0,0,0,.2), 0 24px 48px rgba(0,0,0,.4);
}
:global(.dark) .kicker-tag { background: rgba(79,108,255,.15); color: #7b8fff; }
:global(.dark) .third-content h2 { color: #e8eaf0; }
:global(.dark) .third-text { color: rgba(255,255,255,.45); }
:global(.dark) .feature-item { color: rgba(255,255,255,.82); }
:global(.dark) .icon-blue   { background: rgba(79,114,255,.12);  color: #6d8dff; }
:global(.dark) .icon-violet { background: rgba(124,98,255,.12);  color: #a98eff; }
:global(.dark) .icon-cyan   { background: rgba(26,173,164,.12);  color: #2dd4bf; }
:global(.dark) .icon-pink   { background: rgba(255,111,183,.1);  color: #ff8ec8; }
:global(.dark) .float-badge {
  background: #1a1d32;
  color: rgba(255,255,255,.85);
  box-shadow: 0 8px 28px rgba(0,0,0,.4);
}
:global(.dark) .trust-text { color: rgba(255,255,255,.4); }
:global(.dark) .trust-dot  { border-color: #0f1120; }
</style>
