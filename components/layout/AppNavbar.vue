<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useI18n } from "#imports";
import { useColorMode } from "#imports";
import logo from "@/assets/images/Logo.png";

const isShrunk = ref(false);
const rootRef = ref<HTMLElement | null>(null);

const handleScroll = () => {
  isShrunk.value = window.scrollY > 24;
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleDocClick);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleDocClick);
});

// Dropdown control
const openDropdown = ref<string | null>(null);

const toggleDropdown = (name: string) => {
  openDropdown.value = openDropdown.value === name ? null : name;
};

const closeDropdowns = () => {
  openDropdown.value = null;
};

const handleDocClick = (e: MouseEvent) => {
  if (!rootRef.value) return;
  if (!rootRef.value.contains(e.target as Node)) {
    closeDropdowns();
  }
};

// Theme
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const themeLabel = computed(() => {
  if (colorMode.preference === "system") return "System";
  return isDark.value ? "Dark" : "Light";
});

const setTheme = (key: string) => {
  colorMode.preference = key;
};

const themes = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

// i18n
const { locale, locales, setLocale } = useI18n();
const localeOptions = computed(() =>
  locales.value.map((l: any) => ({
    code: l.code,
    label: l.language || l.code,
  })),
);

// nav
const navItems = [
  { labelKey: "nav.home", href: "#" },
  { labelKey: "nav.about", href: "#" },
  {
    labelKey: "nav.service",
    children: [
      { labelKey: "nav.service_automation", href: "#" },
      { labelKey: "nav.service_analytics", href: "#" },
      { labelKey: "nav.service_mobile_web", href: "#" },
    ],
  },
];
</script>

<template>
  <header class="nav" :class="{ shrink: isShrunk }" ref="rootRef">
    <div class="nav-inner">
      <div class="brand">
        <img :src="logo" alt="logo" class="brand-logo" />
      </div>

      <nav class="nav-links">
        <template v-for="item in navItems" :key="item.labelKey">
          <a v-if="!item.children" :href="item.href" class="nav-link">
            {{ $t(item.labelKey) }}
          </a>

          <div v-else class="nav-dropdown">
            <button class="nav-link" @click="toggleDropdown(item.labelKey)">
              {{ $t(item.labelKey) }} <span class="caret">▾</span>
            </button>

            <div v-if="openDropdown === item.labelKey" class="dropdown-menu">
              <a
                v-for="child in item.children"
                :key="child.labelKey"
                :href="child.href"
                class="dropdown-item"
                @click="closeDropdowns"
              >
                {{ $t(child.labelKey) }}
              </a>
            </div>
          </div>
        </template>
      </nav>

      <div class="nav-right">
        <!-- Locale -->
        <div class="nav-dropdown">
          <button
            class="icon-btn"
            :class="{ active: openDropdown === 'locale' }"
            @click="toggleDropdown('locale')"
            :aria-label="`Language: ${locale}`"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span class="btn-label">{{ locale.toUpperCase() }}</span>
            <svg class="caret-icon" :class="{ rotated: openDropdown === 'locale' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          <Transition name="dropdown">
            <div v-if="openDropdown === 'locale'" class="dropdown-menu">
              <div class="dropdown-header">Language</div>
              <button
                v-for="opt in localeOptions"
                :key="opt.code"
                class="dropdown-item"
                :class="{ 'is-active': locale === opt.code }"
                @click="setLocale(opt.code); closeDropdowns();"
              >
                <span class="item-label">{{ opt.label }}</span>
                <svg v-if="locale === opt.code" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Theme -->
        <div class="nav-dropdown">
          <button
            class="icon-btn"
            :class="{ active: openDropdown === 'theme' }"
            @click="toggleDropdown('theme')"
            :aria-label="`Theme: ${themeLabel}`"
          >
            <!-- Sun icon (light) -->
            <svg v-if="!isDark" class="btn-icon theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <!-- Moon icon (dark) -->
            <svg v-else class="btn-icon theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg class="caret-icon" :class="{ rotated: openDropdown === 'theme' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          <Transition name="dropdown">
            <div v-if="openDropdown === 'theme'" class="dropdown-menu">
              <div class="dropdown-header">Appearance</div>
              <button
                v-for="t in themes"
                :key="t.key"
                class="dropdown-item"
                :class="{ 'is-active': colorMode.preference === t.key }"
                @click="setTheme(t.key); closeDropdowns();"
              >
                <!-- Per-option icons -->
                <svg v-if="t.key === 'light'" class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                <svg v-else-if="t.key === 'dark'" class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                <svg v-else class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
                <span class="item-label">{{ t.label }}</span>
                <svg v-if="colorMode.preference === t.key" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </button>
            </div>
          </Transition>
        </div>

        <button class="contact-btn">{{ $t('nav.contact') }}</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: 0.4s;
}

.nav.shrink {
  padding: 10px 24px;
}

.nav-inner {
  max-width: 1280px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  transition: 0.4s;
}

.nav.shrink .nav-inner {
  max-width: 900px;
  padding: 12px 24px;
  border-radius: 999px;
  background: rgba(6, 11, 24, 0.85);
  backdrop-filter: blur(20px);
}

.brand-logo {
  width: 70px;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-link:hover {
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Icon button (language & theme triggers) */
.icon-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  white-space: nowrap;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.icon-btn.active {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.28);
  color: #fff;
}

.btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.btn-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.caret-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  opacity: 0.6;
  transition: transform 0.25s ease;
}

.caret-icon.rotated {
  transform: rotate(180deg);
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 168px;
  background: rgba(14, 16, 28, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 6px;
  border-radius: 14px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0,0,0,0.3);
  z-index: 200;
}

.dropdown-header {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  padding: 4px 10px 6px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.65);
  padding: 8px 10px;
  border-radius: 8px;
  text-align: left;
  font-size: 13.5px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.dropdown-item.is-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.item-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  opacity: 0.75;
}

.item-label {
  flex: 1;
}

.check-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: #60a5fa;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

.contact-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}

.contact-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}
</style>
