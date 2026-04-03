<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from '#imports'

useI18n()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const statProjects = ref(0)
const statClients = ref(0)
const statYears = ref(0)


/* ── Starfield canvas ── */
interface Star { x: number; y: number; r: number; a: number; sp: number }
let animId = 0
let stars: Star[] = []

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  let W = 0, H = 0

  const resize = () => {
    W = canvas.width = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
    stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.3,
      a: Math.random(),
      sp: Math.random() * 0.4 + 0.1,
    }))
  }

  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    stars.forEach(s => {
      s.a += s.sp * 0.01
      if (s.a > 1) s.a = 0
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(180,200,255,${s.a})`
      ctx.fill()
    })
    animId = requestAnimationFrame(draw)
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
}

/* ── Counter animation ── */
function countUp(setter: (v: number) => void, target: number, duration = 1500) {
  const steps = 60
  const step = target / steps
  let current = 0
  const iv = setInterval(() => {
    current = Math.min(current + step, target)
    setter(Math.floor(current))
    if (current >= target) clearInterval(iv)
  }, duration / steps)
}

onMounted(() => {
  initCanvas()
  setTimeout(() => {
    countUp(v => (statProjects.value = v), 120)
    countUp(v => (statClients.value = v), 85)
    countUp(v => (statYears.value = v), 7, 1200)
  }, 1200)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
})
</script>

<template>
  <!-- ░░ Google Fonts — load once at app level or in index.html ░░ -->
  <!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
  <!-- <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet"> -->

  <section class="hs">
    <!-- Ambient blobs -->
    <div class="blob b1" />
    <div class="blob b2" />
    <div class="blob b3" />

    <!-- Starfield -->
    <canvas ref="canvasRef" class="stars" />

    <!-- MAIN CONTENT -->
    <div class="hs-content">
      <!-- Left: Copy -->
      <div class="copy">
        <p class="kicker">Das Uty</p>

        <h1>
          <span class="grad">{{ $t('hero.title') }}</span>
        </h1>

        <p class="sub-text">{{ $t('hero.sub') }}</p>

        <div class="cta-row">
          <button class="services-btn">{{ $t('hero.cta') }}</button>
          <span class="orange-dot" />
        </div>

        <div class="stats">
          <div class="stat">
            <span class="stat-num">{{ statProjects }}+</span>
            <span class="stat-label">{{ $t('hero.projects') }}</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-num">{{ statClients }}+</span>
            <span class="stat-label">{{ $t('hero.clients') }}</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-num">{{ statYears }}</span>
            <span class="stat-label">{{ $t('hero.years') }}</span>
          </div>
        </div>
      </div>

      <!-- Right: Visual -->
      <div class="visual">
        <!-- Circuit SVG lines -->
        <svg class="circuit-svg" viewBox="0 0 500 520" xmlns="http://www.w3.org/2000/svg">
          <path class="cp blue" d="M60,100 L180,100 L180,200 L280,200" />
          <path class="cp cyan" d="M400,80 L300,80 L300,180 L200,180" />
          <path class="cp purple" d="M50,380 L150,380 L150,280 L250,280" />
          <path class="cp blue" d="M430,420 L340,420 L340,320 L240,320" />

          <circle class="anim-dot cyan-dot" r="4" cx="60" cy="100">
            <animateMotion dur="3s" repeatCount="indefinite"
                           path="M60,100 L180,100 L180,200 L280,200" />
          </circle>
          <circle class="anim-dot cyan-dot" r="4" cx="400" cy="80">
            <animateMotion dur="4s" repeatCount="indefinite"
                           path="M400,80 L300,80 L300,180 L200,180" />
          </circle>
          <circle class="anim-dot purple-dot" r="4" cx="50" cy="380">
            <animateMotion dur="3.5s" repeatCount="indefinite"
                           path="M50,380 L150,380 L150,280 L250,280" />
          </circle>

          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </svg>

        <!-- Pulsing rings -->
        <span class="ring r1" />
        <span class="ring r2" />

        <!-- Platform -->
        <div class="platform" />

        <!-- Bot -->
        <div class="bot-wrap">
          <div class="bot-head">
            <span class="eye eye-l" />
            <span class="eye eye-r" />
            <span class="bot-mouth" />
          </div>
          <div class="bot-collar" />
          <div class="bot-body">
            <div class="body-lines" />
            <div class="body-scan" />
            <div class="body-glow" />
          </div>
        </div>

        <!-- Floating spheres -->
        <div class="sphere sp1" />
        <div class="sphere sp2" />
        <div class="sphere sp3" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Tokens ── */
.hs {
  --bg:     #060b18;
  --ink:    #ffffff;
  --muted:  rgba(255,255,255,0.45);
  --blue:   #2b5cff;
  --cyan:   #44ebe1;
  --purple: #7b47ff;
  --orange: #ff7a00;

  font-family: 'Outfit', sans-serif;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: linear-gradient(135deg, #060b18 0%, #0a0f24 50%, #060b18 100%);
  color: var(--ink);
}

/* ── Light mode ── */
:global(.light) .hs {
  --ink:   #0d0e1c;
  --muted: rgba(13,14,28,0.55);
  background: linear-gradient(135deg, #eef1ff 0%, #f4f6ff 50%, #eef1ff 100%);
}
:global(.light) .hs .kicker { color: var(--blue); }
:global(.light) .hs .grad {
  background: linear-gradient(135deg, #0d0e1c 30%, #2b5cff 65%, #7b47ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
:global(.light) .hs .sub-text { color: var(--muted); }
:global(.light) .hs .stat-label { color: rgba(13,14,28,0.4); }
:global(.light) .hs .stat-divider { background: rgba(13,14,28,0.12); }


/* ── Ambient blobs ── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  animation: blobFloat 8s ease-in-out infinite;
}
.b1 { width:440px;height:440px;background:rgba(43,92,255,.12); top:-120px;left:-120px;animation-delay:0s }
.b2 { width:380px;height:380px;background:rgba(0,210,200,.09);  top:60px;right:-80px; animation-delay:3s }
.b3 { width:320px;height:320px;background:rgba(123,71,255,.10); bottom:-80px;left:32%;animation-delay:5s }
@keyframes blobFloat {
  0%,100%{ transform:translate(0,0) scale(1) }
  50%    { transform:translate(22px,-18px) scale(1.06) }
}

/* ── Stars ── */
.stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* ── Content grid ── */
.hs-content {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: minmax(300px, 490px) 1fr;
  align-items: center;
  gap: 24px;
  min-height: 100vh;
  padding: 80px 40px 60px;
}

/* ── Copy ── */
.copy {
  padding-left: 20px;
  animation: fadeUp .7s ease both;
}

.kicker {
  font-family: 'Syne', Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--cyan);
  text-transform: uppercase;
  opacity: 0;
  animation: fadeUp .6s .2s forwards;
}
h1 {
  font-family: 'Syne', Arial, sans-serif;
  font-size: clamp(38px, 4.2vw, 66px);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -2px;
  margin: 12px 0 0;
  opacity: 0;
  animation: fadeUp .7s .4s forwards;
}
.grad {
  background: linear-gradient(135deg, #fff 30%, var(--cyan) 65%, var(--blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.sub-text {
  max-width: 380px;
  margin: 18px 0 0;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.7;
  opacity: 0;
  animation: fadeUp .7s .6s forwards;
}
.cta-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  opacity: 0;
  animation: fadeUp .7s .8s forwards;
}
.services-btn {
  padding: 14px 32px;
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--blue), var(--purple));
  box-shadow: 0 12px 30px rgba(100,80,255,.42);
  overflow: hidden;
  position: relative;
}
.services-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
  transform: translateX(-100%);
  transition: transform .6s ease;
}
.services-btn:hover::before { transform: translateX(100%) }
.services-btn:hover { box-shadow: 0 18px 42px rgba(100,80,255,.58) }

.orange-dot {
  width: 9px; height: 9px;
  border-radius: 50%;
  background: var(--orange);
  box-shadow: 0 0 14px var(--orange);
}

/* ── Stats ── */
.stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 36px;
  opacity: 0;
  animation: fadeUp .7s 1s forwards;
}
.stat { display:flex;flex-direction:column;gap:3px }
.stat-num {
  font-family: 'Syne', Arial, sans-serif;
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-label { font-size: 11px; color: rgba(255,255,255,.3); letter-spacing: .5px }
.stat-divider { width:1px;height:36px;background:rgba(255,255,255,.08) }

@keyframes fadeUp {
  from { opacity:0; transform:translateY(22px) }
  to   { opacity:1; transform:translateY(0) }
}

/* ── Visual side ── */
.visual {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Circuit SVG */
.circuit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.cp { fill:none;stroke-width:1.5 }
.blue   { stroke:rgba(43,92,255,.45) }
.cyan   { stroke:rgba(68,235,225,.45) }
.purple { stroke:rgba(123,71,255,.4) }
.anim-dot { filter:url(#glow) }
.cyan-dot  { fill:var(--cyan) }
.purple-dot{ fill:var(--purple) }

/* Rings */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  animation: ringPulse 3s ease-in-out infinite;
  pointer-events: none;
}
.r1 { width:80px;height:80px;border-color:rgba(43,92,255,.35); top:80px;right:120px;animation-delay:0s }
.r2 { width:52px;height:52px;border-color:rgba(68,235,225,.3); bottom:185px;left:72px;animation-delay:1.1s }
@keyframes ringPulse {
  0%,100%{ transform:scale(1);opacity:.4 }
  50%    { transform:scale(1.18);opacity:1 }
}

/* Platform */
.platform {
  position: absolute;
  bottom: 88px;
  width: 310px;
  height: 120px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(43,92,255,.15), rgba(68,235,225,.08));
  border: 1px solid rgba(43,92,255,.28);
  transform: perspective(600px) rotateX(20deg);
  box-shadow: 0 30px 60px rgba(0,0,0,.45), 0 0 40px rgba(43,92,255,.1);
}
.platform::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 16px;
  background:
      repeating-linear-gradient(90deg,rgba(43,92,255,.08) 0,rgba(43,92,255,.08) 1px,transparent 1px,transparent 28px),
      repeating-linear-gradient(rgba(43,92,255,.08) 0,rgba(43,92,255,.08) 1px,transparent 1px,transparent 28px);
}

/* Bot */
.bot-wrap {
  position: absolute;
  bottom: 168px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: botFloat 4s ease-in-out infinite;
}
@keyframes botFloat {
  0%,100%{ transform:translateY(0) }
  50%    { transform:translateY(-14px) }
}

.bot-head {
  width: 124px; height: 94px;
  border-radius: 999px;
  background: radial-gradient(circle at 45% 35%, #3a4ccc, #1a2080 60%, #0d1450);
  border: 1px solid rgba(100,120,255,.28);
  box-shadow: 0 0 32px rgba(43,92,255,.4), 0 20px 42px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.1);
  position: relative;
}
.eye {
  position: absolute;
  top: 30px;
  width: 19px; height: 24px;
  border-radius: 999px;
  background: radial-gradient(circle at 40% 30%, #a0fff7, var(--cyan) 50%, #1a9090);
  box-shadow: 0 0 16px rgba(68,235,225,.85), 0 0 5px rgba(68,235,225,1);
  animation: blink 4s ease-in-out infinite;
}
.eye-l { left:23px }
.eye-r { right:23px }
@keyframes blink {
  0%,88%,100%{ transform:scaleY(1) }
  91%,96%    { transform:scaleY(0.06) }
}
.bot-mouth {
  position: absolute;
  bottom: 20px; left: 50%;
  transform: translateX(-50%);
  width: 26px; height: 5px;
  border-radius: 999px;
  background: rgba(100,255,246,.65);
  box-shadow: 0 0 10px rgba(68,235,225,.5);
}

.bot-collar {
  width: 104px; height: 18px;
  background: linear-gradient(90deg, rgba(43,92,255,.3), rgba(68,235,225,.42), rgba(43,92,255,.3));
  border-radius: 0 0 8px 8px;
  margin-top: -2px;
}

.bot-body {
  width: 104px; height: 148px;
  border-radius: 18px 18px 32px 32px;
  background: linear-gradient(180deg, rgba(68,235,225,.25) 0%, rgba(43,92,255,.5) 50%, rgba(80,160,255,.35) 100%);
  border: 1px solid rgba(68,235,225,.22);
  box-shadow: 0 0 32px rgba(43,92,255,.3), inset 0 1px 0 rgba(255,255,255,.12);
  position: relative;
  overflow: hidden;
}
.body-lines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
      rgba(68,235,225,.08) 0, rgba(68,235,225,.08) 1px,
      transparent 1px, transparent 28px
  );
}
.body-scan {
  position: absolute; left:0;right:0; height:2px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  animation: scanAnim 2.5s linear infinite;
}
@keyframes scanAnim {
  0%  { top:0;opacity:1 }
  100%{ top:100%;opacity:0 }
}
.body-glow {
  position: absolute; inset:0;
  background: radial-gradient(circle at 60% 20%, rgba(68,235,225,.18), transparent 50%);
}

/* Spheres */
.sphere {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #74fff4, #4668ff 60%, #1a1060);
  box-shadow: 0 0 22px rgba(68,235,225,.35);
}
.sp1 { width:66px;height:66px;left:78px;bottom:126px; animation:spFloat 5s ease-in-out infinite }
.sp2 { width:48px;height:48px;right:92px;bottom:148px;animation:spFloat 6s ease-in-out infinite;animation-delay:1.5s }
.sp3 { width:30px;height:30px;right:62px;top:102px;   animation:spFloat 4s ease-in-out infinite;animation-delay:.8s }
@keyframes spFloat {
  0%,100%{ transform:translateY(0) }
  50%    { transform:translateY(-12px) }
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .hs-content { grid-template-columns:1fr;padding-top:24px }
  .copy { padding-left:0;text-align:center }
  .sub-text { margin-inline:auto }
  .cta-row,.stats { justify-content:center }
  .visual { min-height:540px }
  .bot-wrap { bottom:148px }
}

@media (max-width: 820px) {
  .hs-content { padding: 80px 20px 40px }
  .visual { min-height:480px }
  .bot-head { width:100px;height:76px }
  .bot-body { width:86px;height:120px }
  .bot-collar { width:84px }
  .eye { width:15px;height:20px;top:24px }
  .platform { width:260px;height:100px }
}
</style>
