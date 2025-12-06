<template>
  <footer class="footer-wrapper">
    <div class="container">
      <!-- Main Footer Grid -->
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="col-brand">
          <div class="logo-wrapper">
            <div class="logo">Smplics<span class="dot"> .</span></div>
            <div class="tagline">Simplify & Scale</div>
          </div>
          <p class="description">
            {{
              $i18n.locale === "ar"
                ? "نقوم ببناء مواقع ويب جاهزة، وتطبيقات جوال، وخدمات أعمال إلكترونية متقنة."
                : "We build readymade websites, mobile applications, and elaborate online business services."
            }}
          </p>
          <div class="contact-info">
            <a href="mailto:teamleader@smpllcs.com" class="contact-link">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
              teamleader@smpllcs.com
            </a>
            <a href="tel:+971585840433" class="contact-link">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                />
              </svg>
              +971 58584 0433
            </a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="col-links">
          <h3>{{ $i18n.locale === "ar" ? "روابط سريعة" : "QUICK LINKS" }}</h3>
          <ul>
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink :to="link.to" class="footer-link">
                {{ $i18n.locale === "ar" ? link.nameAr : link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services Column -->
        <div class="col-links">
          <h3>{{ $i18n.locale === "ar" ? "خدماتنا" : "SERVICES" }}</h3>
          <ul>
            <li v-for="service in services" :key="service.name">
              <NuxtLink class="footer-link">
                {{ $i18n.locale === "ar" ? service.nameAr : service.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social & Newsletter Column -->
        <div class="col-socials">
          <div class="socials-section">
            <h3>{{ $i18n.locale === "ar" ? "تابعنا" : "FOLLOW US" }}</h3>
            <div class="social-grid">
              <a
                href="#"
                target="_blank"
                aria-label="LinkedIn"
                class="social-item"
                title="LinkedIn"
              >
                <div class="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                    />
                  </svg>
                </div>
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="Instagram"
                class="social-item"
                title="Instagram"
              >
                <div class="social-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="TikTok"
                class="social-item"
                title="TikTok"
              >
                <div class="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.98 6.38-1.48 1.25-3.4 2.01-5.5 2.14-2.56.12-5.12-1.02-6.66-2.98-1.57-2.03-1.8-4.93-.45-7.1 1.35-2.19 4.08-3.37 6.64-2.87.1.01.2.02.3.03v4.11c-.56-.16-1.15-.22-1.74-.15-1.2.14-2.17.98-2.56 2.06-.48 1.26-.06 2.8 1.05 3.69 1.08.87 2.62.83 3.65-.19 1.03-1.01 1.48-2.6 1.12-4.06-.03-.21-.1-.4-.18-.6l.02-.02V.02z"
                    />
                  </svg>
                </div>
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="Twitter"
                class="social-item"
                title="Twitter"
              >
                <div class="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="newsletter">
            <h3>
              {{ $i18n.locale === "ar" ? "النشرة الإخبارية" : "NEWSLETTER" }}
            </h3>
            <p class="newsletter-text">
              {{
                $i18n.locale === "ar"
                  ? "اشترك للحصول على آخر التحديثات والعروض."
                  : "Subscribe to get latest updates and offers."
              }}
            </p>
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <div class="input-group">
                <input
                  type="email"
                  v-model="email"
                  :placeholder="
                    $i18n.locale === 'ar'
                      ? 'بريدك الإلكتروني'
                      : 'Your email address'
                  "
                  required
                  class="newsletter-input"
                />
                <button type="submit" class="subscribe-btn">
                  {{ $i18n.locale === "ar" ? "اشتراك" : "Subscribe" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Separator -->
      <div class="separator"></div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <div class="copyright">
          © 2025 Smplics.
          {{
            $i18n.locale === "ar"
              ? "جميع الحقوق محفوظة."
              : "All rights reserved."
          }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const email = ref("");

const quickLinks = [
  {
    name: "Home",
    nameAr: "الرئيسية",
    to: "#home",
  },
  {
    name: "About",
    nameAr: "من نحن",
    to: "/about",
  },
  {
    name: "Services",
    nameAr: "خدماتنا",
    to: "/services",
  },
  {
    name: "Portfolio",
    nameAr: "أعمالنا",
    to: "/portfolio",
  },
  {
    name: "Contact",
    nameAr: "اتصل بنا",
    to: "/contact",
  },
];

const services = [
  {
    name: "Web Development",
    nameAr: "تطوير الويب",
    to: "/services/web-development",
  },
  {
    name: "Mobile Apps",
    nameAr: "تطبيقات الجوال",
    to: "/services/mobile-apps",
  },
  {
    name: "UI/UX Design",
    nameAr: "تصميم واجهة المستخدم",
    to: "/services/ui-ux",
  },
  {
    name: "Branding",
    nameAr: "العلامة التجارية",
    to: "/services/branding",
  },
  {
    name: "Digital Marketing",
    nameAr: "التسويق الرقمي",
    to: "/services/marketing",
  },
  {
    name: "SEO Services",
    nameAr: "خدمات تحسين محركات البحث",
    to: "/services/seo",
  },
];

const subscribeNewsletter = () => {
  if (email.value) {
    console.log("Subscribing:", email.value);
    // Add your newsletter subscription logic here
    email.value = "";
  }
};
</script>

<style scoped lang="scss">
/* Main Wrapper */
.footer-wrapper {
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 4rem 1rem 2rem;
  border-top: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Grid Layout */
.footer-grid {
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
    gap: 4rem;
  }
}

/* Brand Column */
.col-brand {
  .logo-wrapper {
    margin-bottom: 1.5rem;
  }

  .logo {
    font-size: 2rem;
    font-weight: 800;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    display: inline-block;
    letter-spacing: -0.5px;
  }

  .dot {
    color: var(--text-color);
    font-weight: 900;
  }

  .tagline {
    font-size: 0.9rem;
    color: color-mix(in srgb, var(--text-color) 70%, transparent);
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .description {
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    color: color-mix(in srgb, var(--text-color) 80%, transparent);
    max-width: 320px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: color-mix(in srgb, var(--text-color) 70%, transparent);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:hover {
      color: var(--accent-color);
      transform: translateX(5px);
    }

    .icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
  }
}

/* Links Columns */
.col-links {
  h3 {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    position: relative;
    padding-bottom: 0.75rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.875rem;
  }
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.25rem 0;

  &:hover {
    color: var(--accent-color);
    transform: translateX(5px);
  }

  .link-icon {
    font-size: 0.8rem;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.2s ease;
  }

  &:hover .link-icon {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Social & Newsletter Column */
.col-socials {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.socials-section {
  h3 {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    position: relative;
    padding-bottom: 0.75rem;
  }
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  max-width: 200px;
}

.social-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: color-mix(in srgb, var(--text-color) 5%, transparent);
  border-radius: 10px;
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      color-mix(in srgb, var(--accent-color) 30%, transparent);
  }

  .social-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

/* Newsletter */
.newsletter {
  h3 {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1rem;
    color: var(--text-color);
    position: relative;
    padding-bottom: 0.75rem;
  }

  .newsletter-text {
    font-size: 0.9rem;
    color: color-mix(in srgb, var(--text-color) 70%, transparent);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
}

.newsletter-form {
  .input-group {
    display: flex;
    gap: 0rem;
    max-width: 320px;
    flex-wrap: nowrap;
  }

  .newsletter-input {
    flex: 1;
    padding: 0.75rem 1rem;
    background-color: color-mix(in srgb, var(--text-color) 5%, transparent);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 0.9rem;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--accent-color);
      box-shadow: 0 0 0 3px
        color-mix(in srgb, var(--accent-color) 20%, transparent);
    }

    &::placeholder {
      color: color-mix(in srgb, var(--text-color) 50%, transparent);
    }
  }

  .subscribe-btn {
    padding: 0.75rem 1.5rem;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background-color: color-mix(in srgb, var(--accent-color) 80%, white);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

/* Separator */
.separator {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--border-color) 20%,
    var(--border-color) 80%,
    transparent 100%
  );
  margin: 3rem 0 2rem;
  opacity: 0.5;
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
}

.copyright {
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  order: 2;

  @media (min-width: 768px) {
    order: 1;
  }
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  order: 1;

  @media (min-width: 768px) {
    order: 2;
  }
}

.legal-link {
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent-color);
  }
}

.divider {
  color: color-mix(in srgb, var(--text-color) 40%, transparent);
  font-size: 0.85rem;
}

/* RTL Support */
[dir="rtl"] {
  .contact-link:hover {
    transform: translateX(-5px);
  }

  .footer-link:hover {
    transform: translateX(-5px);
  }

  .footer-link:hover .link-icon {
    transform: rotate(180deg);
  }

  .newsletter-form .input-group {
    flex-direction: row-reverse;
  }
}

/* Arabic font styling */
[lang="ar"] {
  .footer-wrapper {
    .logo,
    .tagline,
    .description,
    .contact-link,
    .footer-link,
    .copyright,
    .legal-link,
    .newsletter-text,
    h3 {
      font-family: "Segoe UI", "Noto Sans Arabic", sans-serif;
    }

    .logo {
      letter-spacing: 0;
    }

    .tagline {
      letter-spacing: 0;
    }
  }
}

/* Dark/Light mode adjustments */
[data-theme="dark"] {
  .footer-wrapper {
    background-color: color-mix(in srgb, var(--card-bg) 95%, black);
  }

  .newsletter-input {
    background-color: color-mix(in srgb, var(--text-color) 8%, transparent);
  }
}

[data-theme="light"] {
  .footer-wrapper {
    background-color: color-mix(in srgb, var(--card-bg) 98%, white);
  }

  .social-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>
