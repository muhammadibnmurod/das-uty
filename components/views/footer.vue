<script setup lang="ts">
import { useI18n } from '#imports'
import Logo from '@/assets/images/logotypeblue.svg'
import FacebookIcon from '@/assets/icons/facebook.svg'
import InstagramIcon from '@/assets/icons/instagram.svg'
import TelegramIcon from '@/assets/icons/telegram.svg'

useI18n()

const currentYear = new Date().getFullYear()

const navLinks = [
  { key: 'about',    href: '#' },
  { key: 'services', href: '#' },
  { key: 'contact',  href: '#' },
]

const serviceKeys = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6']

const socials = [
  { icon: FacebookIcon,  href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: TelegramIcon,  href: '#', label: 'Telegram' },
]
</script>

<template>
  <footer class="ft-shell">

    <!-- Top grid -->
    <div class="ft-inner">

      <!-- Col 1: Brand -->
      <div class="ft-brand">
        <div class="ft-blob" />
        <component :is="Logo" class="ft-logo" />
        <p class="ft-desc">{{ $t('footer.desc') }}</p>
        <div class="ft-socials">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            :aria-label="s.label"
            class="ft-social-btn"
          >
            <component :is="s.icon" class="ft-social-icon" />
          </a>
        </div>
      </div>

      <!-- Col 2: Useful Links -->
      <div class="ft-col">
        <h4 class="ft-col-title">{{ $t('footer.links_title') }}</h4>
        <ul class="ft-list">
          <li v-for="link in navLinks" :key="link.key">
            <a :href="link.href" class="ft-link">
              <span class="ft-bullet" />
              {{ $t(`footer.${link.key}_link`) }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Col 3: Services -->
      <div class="ft-col">
        <h4 class="ft-col-title">{{ $t('footer.services_title') }}</h4>
        <ul class="ft-list">
          <li v-for="key in serviceKeys" :key="key">
            <span class="ft-link">
              <span class="ft-bullet" />
              {{ $t(`fourth.${key}_title`) }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Col 4: Contact -->
      <div class="ft-col">
        <h4 class="ft-col-title">{{ $t('footer.contact_title') }}</h4>
        <div class="ft-contact">
          <p class="ft-contact-label">{{ $t('footer.phone_label') }}</p>
          <p class="ft-contact-value">{{ $t('footer.phone') }}</p>

          <p class="ft-contact-label">{{ $t('footer.email_label') }}</p>
          <p class="ft-contact-value">{{ $t('footer.email') }}</p>

          <p class="ft-contact-label">{{ $t('footer.address_label') }}</p>
          <p class="ft-contact-value">{{ $t('footer.address') }}</p>
        </div>
      </div>

    </div>

    <!-- Divider + copyright -->
    <div class="ft-bottom">
      <span class="ft-copyright">© {{ currentYear }} {{ $t('footer.brand') }}</span>
    </div>

  </footer>
</template>

<style scoped>
/* ── Shell ── */
.ft-shell {
  background: var(--footer-bg);
  padding: 56px 40px 0;
}

.ft-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.4fr 1.2fr;
  gap: 40px;
  padding-bottom: 48px;
}

/* ── Col 1: Brand ── */
.ft-brand {
  position: relative;
}

.ft-blob {
  position: absolute;
  width: 320px;
  height: 280px;
  border-radius: 50% 60% 55% 45% / 55% 50% 60% 50%;
  background: var(--footer-blob);
  top: -30px;
  left: -60px;
  z-index: 0;
  pointer-events: none;
}

.ft-logo {
  position: relative;
  z-index: 1;
  width: 90px;
  height: auto;
  margin-bottom: 14px;
  display: block;
}

.ft-desc {
  position: relative;
  z-index: 1;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--footer-desc-color);
  max-width: 260px;
  margin: 0 0 20px;
}

.ft-socials {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 10px;
}

.ft-social-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--footer-social-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--footer-social-color);
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.ft-social-btn:hover {
  background: var(--section-tag-bg);
  border-color: var(--footer-link-hover);
  transform: translateY(-2px);
}

.ft-social-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* ── Columns ── */
.ft-col {
  padding-top: 4px;
}

.ft-col-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--card-title-color);
  margin: 0 0 18px;
}

/* ── List ── */
.ft-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ft-link {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: var(--footer-link-color);
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.2s ease;
}

a.ft-link:hover {
  color: var(--footer-link-hover);
}

.ft-bullet {
  flex-shrink: 0;
  margin-top: 5px;
  width: 6px;
  height: 6px;
  background: var(--section-tag-color);
  border-radius: 1px;
  transform: rotate(45deg);
}

/* ── Contact ── */
.ft-contact {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ft-contact-label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--footer-label-color);
  margin: 8px 0 0;
}

.ft-contact-label:first-child {
  margin-top: 0;
}

.ft-contact-value {
  font-size: 12.5px;
  color: var(--footer-value-color);
  margin: 0;
  line-height: 1.5;
}

/* ── Bottom bar ── */
.ft-bottom {
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid var(--footer-divider);
  padding: 18px 0;
  text-align: center;
}

.ft-copyright {
  font-size: 12px;
  color: var(--footer-copyright);
}

/* ── Responsive ── */
@media (max-width: 960px) {
  .ft-inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 560px) {
  .ft-shell { padding: 40px 20px 0; }
  .ft-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .ft-blob { width: 200px; height: 180px; }
}
</style>
