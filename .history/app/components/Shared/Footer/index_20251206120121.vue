<template>
  <footer class="footer-wrapper">
    <div class="container">
      <div class="footer-grid">
        <div class="col-brand">
          <div class="logo">Smplics<span class="dot">.</span></div>
          <p class="description">
            We build readymade websites, mobile applications, and elaborate
            online business services.
          </p>
        </div>

        <div class="col-links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink :to="link.to">{{
                $i18n.locale === "ar" ? link.englishName : link.name
              }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-links">
          <h3>SERVICES</h3>
          <ul>
            <li v-for="service in services" :key="service.name">
              <NuxtLink :to="service.to">
                {{ $i18n.locale === "ar" ? service.englishName : service.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-socials">
          <a href="#" target="_blank" aria-label="LinkedIn" class="social-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
              />
            </svg>
            <span>Linkedin</span>
          </a>
          <a
            href="#"
            target="_blank"
            aria-label="Instagram"
            class="social-item"
          >
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>Instagram</span>
          </a>
          <a href="#" target="_blank" aria-label="TikTok" class="social-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.98 6.38-1.48 1.25-3.4 2.01-5.5 2.14-2.56.12-5.12-1.02-6.66-2.98-1.57-2.03-1.8-4.93-.45-7.1 1.35-2.19 4.08-3.37 6.64-2.87.1.01.2.02.3.03v4.11c-.56-.16-1.15-.22-1.74-.15-1.2.14-2.17.98-2.56 2.06-.48 1.26-.06 2.8 1.05 3.69 1.08.87 2.62.83 3.65-.19 1.03-1.01 1.48-2.6 1.12-4.06-.03-.21-.1-.4-.18-.6l.02-.02V.02z"
              />
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>

      <div class="separator"></div>

      <div class="footer-bottom">
        <p>© 2025- Smplics</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
// You can define links here or pass them as props for reusability
const quickLinks = [
  { name: "Home", to: "/", englishName: "الرئيسية" },
  { name: "About", to: "/about", englishName: "من نحن" },
  { name: "Services", to: "/services", englishName: "خدماتنا" },
  { name: "Contact", to: "/contact", englishName: "اتصل بنا" },
];

const services = [
  {
    name: "UI/UX Design",
    to: "/services/ui-ux",
    englishName: "تصميم واجهة المستخدم وتجربة المستخدم",
  },
  {
    name: "Branding",
    to: "/services/branding",
    englishName: "العلامة التجارية",
  },
  { name: "Illustration", to: "/services/illustration", englishName: "توضيح" },
  {
    name: "Design Concept",
    to: "/services/concept",
    englishName: "مفهوم التصميم",
  },
  { name: "App Design", to: "/services/app", englishName: "تصميم التطبيق" },
];
</script>
<style scoped>
/* Main Wrapper */
.footer-wrapper {
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 4rem 1rem 2rem 1rem;
  border-top: 1px solid var(--border-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

/* GRID LAYOUT */
.footer-grid {
  display: grid;
  gap: 2.5rem;
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
}

/* Tablet: 2x2 Layout */
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 4 Columns (Brand is wider) */
@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

/* BRAND COLUMN */
.logo {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(
    --accent-color
  ); /* Orange for main text or just dot? Image has orange text */
  margin-bottom: 1rem;
  display: inline-block;
}
/* If the image shows 'Smplics' as white/orange mixed, adjust here: */
.logo {
  color: var(--accent-color);
}
[data-theme="dark"] .logo {
  color: var(--accent-color);
}

/* Specifically match the image: "Smplics" orange, dot orange? 
   Actually, usually brand name is text color, dot is accent. 
   Let's do that for cleaner look, or full orange if preferred. */
.logo {
  color: var(--accent-color);
}
.dot {
  color: var(--accent-color);
}

.description {
  line-height: 1.6;
  font-size: 1rem;
  opacity: 0.9;
  max-width: 300px;
}

/* HEADINGS */
h3 {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

/* LINKS LISTS */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin-bottom: 1rem;
}

ul li a {
  text-decoration: none;
  color: var(--text-color);
  opacity: 0.8;
  font-weight: 500;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

ul li a:hover {
  color: var(--accent-color);
  opacity: 1;
  padding-left: 5px; /* Subtle slide effect */
}

/* SOCIAL COLUMN */
.col-socials {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.2s ease;
}

.social-item:hover {
  color: var(--accent-color);
}

.icon {
  width: 24px;
  height: 24px;
}

/* SEPARATOR & BOTTOM */
.separator {
  height: 1px;
  background-color: var(--border-color);
  margin: 3rem 0 2rem 0;
  opacity: 0.5;
}

.footer-bottom {
  text-align: center;
  font-size: 0.875rem;
  opacity: 0.7;
}
</style>
