<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "#imports";
import MuhammadsodiqImg from "@/assets/images/worers/muhammadsodiq.jpg";
import UlugbekImg from "@/assets/images/worers/ulugbek.jpg";
import SherzodImg from "@/assets/images/worers/sherzod.jpg";
import SunnatImg from "@/assets/images/worers/sunnat.jpg";
import BahromImg from "@/assets/images/worers/bahrom.jpg";
import BahtiyorImg from "@/assets/images/worers/bahtiyor.jpg";
import BehzodImg from "@/assets/images/worers/Behzod.jpg";
import BoburImg from "@/assets/images/worers/bobur.jpg";
import EldorImg from "@/assets/images/worers/eldor.jpg";
import IsmoilImg from "@/assets/images/worers/ismoil.jpg";
import JamshidImg from "@/assets/images/worers/jamshid.jpg";
import JavohirImg from "@/assets/images/worers/Javohir.jpg";
import JobirImg from "@/assets/images/worers/jobir.jpg";
import NurbekImg from "@/assets/images/worers/nurbek.jpg";
import SarvarImg from "@/assets/images/worers/sarvar.jpg";
import ShaxrilloImg from "@/assets/images/worers/shaxrillo.jpg";
import ShohruhImg from "@/assets/images/worers/shohruh.jpg";

useI18n();

interface Worker {
  key: string;
  name: string;
  image: string;
  skills: string[];
}

const workers: Worker[] = [
  {
    key: "muhammadsodiq",
    name: "Muhammadsodiq Tohirov",
    image: MuhammadsodiqImg,
    skills: ["Vue.js", "Nuxt", "TypeScript", "Node.js", "Docker"],
  },
  {
    key: "ulugbek",
    name: "Ulugbek",
    image: UlugbekImg,
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Redis"],
  },
  {
    key: "sherzod",
    name: "Sherzod",
    image: SherzodImg,
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "CSS"],
  },
  {
    key: "sunnat",
    name: "Sunnat",
    image: SunnatImg,
    skills: ["Flutter", "Dart", "Firebase", "iOS", "Android"],
  },
  {
    key: "bahrom",
    name: "Bahrom",
    image: BahromImg,
    skills: ["Docker", "Kubernetes", "Linux", "CI/CD", "AWS"],
  },
  {
    key: "bahtiyor",
    name: "Bahtiyor",
    image: BahtiyorImg,
    skills: ["Figma", "Adobe XD", "Illustrator", "Prototyping", "UX"],
  },
  {
    key: "behzod",
    name: "Behzod",
    image: BehzodImg,
    skills: ["Vue.js", "Node.js", "MongoDB", "Express", "TypeScript"],
  },
  {
    key: "bobur",
    name: "Bobur",
    image: BoburImg,
    skills: ["Java", "Spring Boot", "MySQL", "REST API", "Git"],
  },
  {
    key: "eldor",
    name: "Eldor",
    image: EldorImg,
    skills: ["Python", "SQL", "Pandas", "Power BI", "TensorFlow"],
  },
  {
    key: "ismoil",
    name: "Ismoil",
    image: IsmoilImg,
    skills: ["React", "Redux", "JavaScript", "HTML", "CSS"],
  },
  {
    key: "jamshid",
    name: "Jamshid",
    image: JamshidImg,
    skills: ["React Native", "JavaScript", "Firebase", "Redux", "Node.js"],
  },
  {
    key: "javohir",
    name: "Javohir",
    image: JavohirImg,
    skills: ["UML", "BPMN", "SQL", "Jira", "Confluence"],
  },
  {
    key: "jobir",
    name: "Jobir",
    image: JobirImg,
    skills: ["Selenium", "Postman", "Jest", "Cypress", "Jira"],
  },
  {
    key: "nurbek",
    name: "Nurbek",
    image: NurbekImg,
    skills: ["Nginx", "Docker", "Git", "Linux", "CI/CD"],
  },
  {
    key: "sarvar",
    name: "Sarvar",
    image: SarvarImg,
    skills: ["Node.js", "Express", "MongoDB", "Redis", "TypeScript"],
  },
  {
    key: "shaxrillo",
    name: "Shaxrillo",
    image: ShaxrilloImg,
    skills: ["Vue.js", "Nuxt", "TypeScript", "Tailwind", "Pinia"],
  },
  {
    key: "shohruh",
    name: "Shohruh",
    image: ShohruhImg,
    skills: ["Figma", "Prototyping", "CSS", "Illustrator", "UX Research"],
  },
];

/* ── skill color map ── */
const skillColors: Record<string, string> = {
  "Vue.js": "#42b883",
  Nuxt: "#00dc82",
  React: "#61dafb",
  "Next.js": "#000000",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  "Node.js": "#339933",
  Express: "#000000",
  Python: "#3776ab",
  Django: "#092e20",
  Java: "#007396",
  "Spring Boot": "#6db33f",
  Flutter: "#02569b",
  Dart: "#0175c2",
  Docker: "#2496ed",
  Kubernetes: "#326ce5",
  AWS: "#ff9900",
  Linux: "#fcc624",
  "CI/CD": "#fc6d26",
  Nginx: "#009639",
  MongoDB: "#47a248",
  PostgreSQL: "#4169e1",
  MySQL: "#4479a1",
  Redis: "#dc382d",
  Firebase: "#ffca28",
  Git: "#f05032",
  Figma: "#f24e1e",
  "Adobe XD": "#ff61f6",
  Illustrator: "#ff9a00",
  Tailwind: "#38bdf8",
  CSS: "#264de4",
  HTML: "#e34f26",
  Redux: "#764abc",
  Pinia: "#ffd859",
  Pandas: "#150458",
  TensorFlow: "#ff6f00",
  SQL: "#336791",
  "Power BI": "#f2c811",
  UML: "#4f72ff",
  BPMN: "#7c62ff",
  Jira: "#0052cc",
  Confluence: "#172b4d",
  Selenium: "#43b02a",
  Postman: "#ff6c37",
  Jest: "#c21325",
  Cypress: "#17202c",
  Prototyping: "#e0549a",
  UX: "#7c3aed",
  "UX Research": "#7c3aed",
  iOS: "#555555",
  Android: "#3ddc84",
  "React Native": "#61dafb",
};

function skillColor(skill: string): string {
  return skillColors[skill] ?? "#8890aa";
}

/* ── state ── */
const sectionRef = ref<HTMLElement | null>(null);
const titleVisible = ref(false);
const activeIndex = ref(0);
const isTransitioning = ref(false);

const current = computed(() => workers[activeIndex.value]);

/* ── fan cards ── */
const FAN_COUNT = 7;

function fanCardStyle(fi: number) {
  const spread = fi - Math.floor(FAN_COUNT / 2);
  const angle = spread * 5.5;
  const tx = spread * 12;
  const ty = Math.abs(spread) * 4;
  const scale = 1 - Math.abs(spread) * 0.025;
  const z = FAN_COUNT - Math.abs(spread);
  return {
    transform: `translateX(${tx}px) translateY(${ty}px) rotate(${angle}deg) scale(${scale})`,
    zIndex: z,
    opacity: 1 - Math.abs(spread) * 0.07,
  };
}

/* ── navigation ── */
let autoTimer: ReturnType<typeof setInterval> | null = null;

function transition(fn: () => void) {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  fn();
  setTimeout(() => {
    isTransitioning.value = false;
  }, 420);
}

function next() {
  transition(() => {
    activeIndex.value = (activeIndex.value + 1) % workers.length;
  });
}

function prev() {
  transition(() => {
    activeIndex.value =
      (activeIndex.value - 1 + workers.length) % workers.length;
  });
}

function goTo(i: number) {
  if (i === activeIndex.value) return;
  transition(() => {
    activeIndex.value = i;
  });
}

function startAuto() {
  autoTimer = setInterval(next, 5000);
}
function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

/* ── intersection observer ── */
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          titleVisible.value = true;
          observer?.unobserve(e.target);
          startAuto();
        }
      });
    },
    { threshold: 0.2 },
  );
  const titleEl = sectionRef.value?.querySelector('[data-index="title"]');
  if (titleEl) observer.observe(titleEl);
});

onUnmounted(() => {
  observer?.disconnect();
  stopAuto();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="workers-shell py-14 px-5"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
  >
    <div class="workers-card max-w-[1200px] mx-auto px-8 py-10 rounded-[22px]">
      <!-- Header -->
      <div
        class="w-header"
        data-index="title"
        :class="{ 'w-header--vis': titleVisible }"
      >
        <span class="section-tag">{{ $t("workers.tag") }}</span>
        <h2>{{ $t("workers.title") }}</h2>
      </div>

      <!-- Body -->
      <div class="team-layout">
        <!-- ── Left: card fan ── -->
        <div class="fan-side">
          <!-- fan background cards -->
          <div class="fan-stage">
            <div
              v-for="fi in FAN_COUNT"
              :key="fi"
              class="fan-bg-card"
              :style="fanCardStyle(fi - 1)"
            >
              <div class="fan-bg-card__logo">
                <img src="@/assets/images/logotypeblue.svg" alt="DAS UTY" />
              </div>
            </div>

            <!-- photo card (top) -->
            <div
              class="photo-card"
              :class="{ 'photo-card--flip': isTransitioning }"
            >
              <img
                :src="current.image"
                :alt="current.name"
                class="photo-card__img"
              />
              <div class="photo-card__shine" />
              <div class="photo-card__footer">
                <img
                  src="@/assets/images/logotypeblue.svg"
                  alt="DAS UTY"
                  class="photo-card__brand"
                />
              </div>
            </div>
          </div>

          <!-- nav arrows -->
          <button
            class="nav-btn nav-btn--prev"
            :disabled="isTransitioning"
            @click="prev"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 14L6 9l5-5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="nav-btn nav-btn--next"
            :disabled="isTransitioning"
            @click="next"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M7 4l5 5-5 5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <!-- dot pagination -->
          <div class="dots-row">
            <button
              v-for="(_, di) in workers"
              :key="di"
              class="dot"
              :class="{ 'dot--active': di === activeIndex }"
              @click="goTo(di)"
              :aria-label="`Go to member ${di + 1}`"
            />
          </div>
        </div>

        <!-- ── Right: info panel ── -->
        <div class="info-side" :class="{ 'info-side--fade': isTransitioning }">
          <div class="member-counter">
            {{ String(activeIndex + 1).padStart(2, "0") }}
            <span>/</span>
            {{ String(workers.length).padStart(2, "0") }}
          </div>

          <h3 class="member-name">{{ current.name }}</h3>

          <span class="role-pill">{{ $t(`workers.${current.key}_role`) }}</span>

          <blockquote class="member-quote">
            {{ $t(`workers.${current.key}_quote`) }}
          </blockquote>

          <p class="member-bio">{{ $t(`workers.${current.key}_bio`) }}</p>

          <div class="skills-wrap">
            <span
              v-for="skill in current.skills"
              :key="skill"
              class="skill-chip"
            >
              <span
                class="skill-chip__dot"
                :style="{ background: skillColor(skill) }"
              />
              {{ skill }}
            </span>
          </div>

          <!-- progress bar -->
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{
                width: `${((activeIndex + 1) / workers.length) * 100}%`,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Shell ── */
.workers-shell {
  background: var(--section-bg);
}
.workers-card {
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

/* ── Header ── */
.w-header {
  text-align: center;
  margin-bottom: 36px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;
}
.w-header--vis {
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
.workers-card h2 {
  font-size: clamp(18px, 2.2vw, 26px);
  font-weight: 800;
  color: var(--card-title-color);
  margin: 0;
  line-height: 1.3;
}

/* ── Layout ── */
.team-layout {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 56px;
  align-items: center;
}

/* ═══════════════════════════════════════
   FAN SIDE
═══════════════════════════════════════ */
.fan-side {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.fan-stage {
  position: relative;
  width: 300px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Background fan cards */
.fan-bg-card {
  position: absolute;
  width: 240px;
  height: 330px;
  border-radius: 18px;
  background: linear-gradient(145deg, #1a2570 0%, #0d1450 40%, #0a0f40 100%);
  border: 1px solid rgba(79, 114, 255, 0.25);
  box-shadow: 0 8px 32px rgba(10, 20, 80, 0.35);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
  transform-origin: bottom center;
  will-change: transform;
  transition: transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1);
  overflow: hidden;
}
.fan-bg-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(79, 114, 255, 0.04) 0,
      rgba(79, 114, 255, 0.04) 1px,
      transparent 1px,
      transparent 32px
    ),
    repeating-linear-gradient(
      rgba(79, 114, 255, 0.04) 0,
      rgba(79, 114, 255, 0.04) 1px,
      transparent 1px,
      transparent 32px
    );
  border-radius: 18px;
}
.fan-bg-card__logo {
  position: relative;
  z-index: 1;
}
.fan-bg-card__logo img {
  width: 80px;
  opacity: 0.45;
  filter: brightness(0) invert(1);
}

/* Photo card (top card) */
.photo-card {
  position: absolute;
  width: 248px;
  height: 338px;
  border-radius: 20px;
  overflow: hidden;
  z-index: 20;
  box-shadow:
    0 24px 64px rgba(10, 20, 80, 0.45),
    0 0 0 1px rgba(79, 114, 255, 0.2);
  transition:
    transform 0.38s cubic-bezier(0.34, 1.2, 0.64, 1),
    opacity 0.25s ease;
  transform-origin: bottom center;
}
.photo-card--flip {
  transform: scale(0.94) translateY(6px);
  opacity: 0.75;
}
.photo-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.photo-card__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    transparent 50%,
    rgba(79, 114, 255, 0.04) 100%
  );
  pointer-events: none;
}
.photo-card__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px 16px;
  background: linear-gradient(
    to top,
    rgba(10, 15, 60, 0.85) 0%,
    transparent 100%
  );
  display: flex;
  justify-content: flex-end;
}
.photo-card__brand {
  width: 72px;
  filter: brightness(0) invert(1);
  opacity: 0.8;
}

/* Nav buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--card-item-bg);
  border: 1px solid var(--card-item-border);
  color: var(--card-item-title-color);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
  z-index: 30;
}
.nav-btn:hover:not(:disabled) {
  background: var(--section-tag-bg);
  color: var(--section-tag-color);
  box-shadow: 0 4px 16px rgba(79, 114, 255, 0.18);
  transform: translateY(-50%) scale(1.08);
}
.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.nav-btn--prev {
  left: -4px;
}
.nav-btn--next {
  right: -4px;
}

/* Dots */
.dots-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 320px;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--card-item-border);
  border: none;
  cursor: pointer;
  padding: 0;
  transition:
    width 0.25s ease,
    background 0.25s ease,
    border-radius 0.25s ease;
}
.dot--active {
  width: 22px;
  border-radius: 4px;
  background: var(--section-tag-color);
}

/* ═══════════════════════════════════════
   INFO SIDE
═══════════════════════════════════════ */
.info-side {
  padding: 8px 0;
  transition:
    opacity 0.25s ease,
    transform 0.3s ease;
}
.info-side--fade {
  opacity: 0;
  transform: translateX(10px);
}

.member-counter {
  font-size: 12px;
  font-weight: 700;
  color: var(--section-tag-color);
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}
.member-counter span {
  color: var(--card-stat-label-color);
  margin: 0 3px;
}

.member-name {
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 800;
  color: var(--card-title-color);
  margin: 0 0 12px;
  line-height: 1.25;
}

.role-pill {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 20px;
  background: var(--section-tag-bg);
  color: var(--section-tag-color);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 18px;
}

.member-quote {
  margin: 0 0 16px;
  padding-left: 14px;
  border-left: 3px solid var(--section-tag-color);
  font-size: 13px;
  font-style: italic;
  color: var(--card-item-text-color);
  line-height: 1.65;
}

.member-bio {
  font-size: 13px;
  line-height: 1.75;
  color: var(--card-item-text-color);
  margin: 0 0 22px;
  max-width: 440px;
}

/* Skills */
.skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  background: var(--card-item-bg);
  border: 1px solid var(--card-item-border);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--card-item-title-color);
  transition:
    border-color 0.2s,
    transform 0.2s;
  cursor: default;
}
.skill-chip:hover {
  transform: translateY(-2px);
  border-color: rgba(79, 114, 255, 0.3);
}
.skill-chip__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Progress bar */
.progress-track {
  height: 3px;
  border-radius: 2px;
  background: var(--card-item-border);
  overflow: hidden;
  max-width: 200px;
}
.progress-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, #4f72ff, #7c62ff);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .team-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .fan-side {
    order: 1;
  }
  .info-side {
    order: 2;
    text-align: center;
  }
  .member-quote {
    border-left: none;
    border-top: 3px solid var(--section-tag-color);
    padding-left: 0;
    padding-top: 12px;
  }
  .skills-wrap {
    justify-content: center;
  }
  .progress-track {
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .workers-card {
    padding: 24px 16px;
  }
  .fan-stage {
    width: 260px;
    height: 330px;
  }
  .photo-card {
    width: 214px;
    height: 292px;
  }
  .fan-bg-card {
    width: 200px;
    height: 276px;
  }
}
</style>
