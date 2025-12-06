<template>
  <div class="about-page nav-margin-mobile" v-if="!pending && About">
    <!-- Breadcrumb Navigation -->
    <elementsLinks :links="links" />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <NuxtImg
              width="100"
              height="50"
              format="webp"
              preload
              src="/logo/logo2.png"
              alt="Nerva Logo"
              class="logo-img"
            />
            {{ $i18n.locale === "ar" ? About.name : About.englishName }}
          </h1>
          <p class="hero-subtitle">
            {{
              $i18n.locale === "ar" ? About.captionArabic : About.captionEnglish
            }}
          </p>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="content-sections">
      <!-- Section 1 -->
      <section class="content-section" v-if="About.description1">
        <div class="container">
          <div class="section-grid" :class="{ reversed: false }">
            <div class="image-column" v-if="About.image1 && About.image2">
              <div class="image-wrapper">
                <div class="gold-decoration"></div>
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder
                  :src="
                    apiBase +
                    ($i18n.locale === 'ar' ? About.image1 : About.image2)
                  "
                  alt="About Nerva"
                  class="section-image"
                />
              </div>
            </div>
            <div class="text-column">
              <div class="text-content">
                <div
                  class="content-html"
                  v-html="
                    $i18n.locale === 'ar'
                      ? About.description1
                      : About.englishDescription1
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2 -->
      <section class="content-section section-alt" v-if="About.description2">
        <div class="container">
          <div class="section-grid" :class="{ reversed: true }">
            <div class="image-column" v-if="About.image3 && About.image4">
              <div class="image-wrapper">
                <div class="gold-decoration"></div>
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder
                  :src="
                    apiBase +
                    ($i18n.locale === 'ar' ? About.image3 : About.image4)
                  "
                  alt="About Nerva"
                  class="section-image"
                />
              </div>
            </div>
            <div class="text-column">
              <div class="text-content">
                <div
                  class="content-html"
                  v-html="
                    $i18n.locale === 'ar'
                      ? About.description2
                      : About.englishDescription2
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3 -->
      <section class="content-section" v-if="About.description3">
        <div class="container">
          <div class="section-grid" :class="{ reversed: false }">
            <div class="image-column" v-if="About.image5 && About.image6">
              <div class="image-wrapper">
                <div class="gold-decoration"></div>
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder
                  :src="
                    apiBase +
                    ($i18n.locale === 'ar' ? About.image5 : About.image6)
                  "
                  alt="About Nerva"
                  class="section-image"
                />
              </div>
            </div>
            <div class="text-column">
              <div class="text-content">
                <div
                  class="content-html"
                  v-html="
                    $i18n.locale === 'ar'
                      ? About.description3
                      : About.englishDescription3
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();

const { data: About, pending } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/1`
);

const { locale } = useI18n();
const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  {
    text: locale.value === "ar" ? About.value.name : About.value.englishName,
    to: null,
  },
]);
</script>

<style lang="scss" scoped>
.about-page {
  background: #fff;
  color: #2d2d2d;
}

// Hero Section
.hero-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 160px 0 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .hero-content {
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .hero-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2.5rem;
      flex-direction: column;
      gap: 10px;
    }
  }

  .hero-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }
}

// Content Sections
.content-sections {
  padding: 20px 0;
}

.content-section {
  padding: 60px 0;

  &.section-alt {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start; // Changed from center to start to fix alignment

  &.reversed {
    direction: rtl;

    :deep(*) {
      direction: ltr;
    }
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;

    &.reversed {
      direction: ltr;
    }
  }
}

.image-column {
  position: relative;
  display: flex;
  align-items: center; // This ensures image stays centered vertically
  min-height: 400px; // Fixed height to prevent gaps

  .image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        rgba(212, 175, 55, 0.1),
        rgba(249, 212, 35, 0.1)
      );
      z-index: 1;
    }
  }

  .gold-decoration {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid transparent;
    border-image: linear-gradient(45deg, #d4af37, #f9d423);
    border-image-slice: 1;
    border-radius: 25px;
    z-index: 2;
    opacity: 0.5;
  }

  .section-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.8s ease;

    &:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      height: 300px;
    }
  }
}

.text-column {
  .text-content {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center; // This ensures text content stays centered

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -30px;
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #d4af37, #f9d423);
      border-radius: 2px;

      @media (max-width: 991px) {
        left: -15px;
        height: calc(100% - 40px);
        top: 20px;
      }
    }
  }

  .content-html {
    line-height: 1.8;
    font-size: 1.1rem;
    width: 100%;

    // Enhanced HTML content styling
    :deep(p) {
      margin-bottom: 24px;
      color: #4a4a4a;
      text-align: start;
      line-height: 1.7;
    }

    // Bold text styling
    :deep(b),
    :deep(strong) {
      color: #d4af37;
      font-weight: 700;
    }

    // Italic text
    :deep(i),
    :deep(em) {
      font-style: italic;
      color: #666;
    }

    // Links
    :deep(a) {
      color: #d4af37;
      text-decoration: none;
      transition: all 0.3s ease;
      font-weight: 600;
      border-bottom: 1px solid transparent;

      &:hover {
        color: #f9d423;
        border-bottom-color: #f9d423;
      }
    }

    // Lists
    :deep(ul),
    :deep(ol) {
      text-align: start;
      padding-inline-start: 24px;
      margin-bottom: 24px;
    }

    :deep(li) {
      margin-bottom: 12px;
      color: #4a4a4a;
      line-height: 1.6;
    }

    // List item bullets/numbers with gold color
    :deep(ul li) {
      position: relative;

      &::marker {
        color: #d4af37;
      }
    }

    :deep(ol li) {
      &::marker {
        color: #d4af37;
        font-weight: 600;
      }
    }

    // Headings
    :deep(h1) {
      color: #2d2d2d;
      margin-bottom: 24px;
      font-weight: 700;
      font-size: 2.5rem;
      line-height: 1.2;
    }

    :deep(h2) {
      color: #2d2d2d;
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 2rem;
      line-height: 1.3;
    }

    :deep(h3) {
      color: #2d2d2d;
      margin-bottom: 18px;
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 1.4;
    }

    :deep(h4) {
      color: #2d2d2d;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 1.25rem;
    }

    :deep(h5) {
      color: #2d2d2d;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 1.1rem;
    }

    :deep(h6) {
      color: #2d2d2d;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 1rem;
    }

    // Blockquotes
    :deep(blockquote) {
      border-inline-start: 4px solid #d4af37;
      padding-inline-start: 20px;
      margin: 24px 0;
      font-style: italic;
      color: #666;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      padding: 20px;
      border-radius: 8px;
    }

    // Tables
    :deep(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    :deep(th) {
      background: linear-gradient(135deg, #d4af37, #f9d423);
      color: white;
      padding: 12px;
      text-align: start;
      font-weight: 600;
    }

    :deep(td) {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
      color: #4a4a4a;
    }

    :deep(tr:nth-child(even)) {
      background-color: #f8f9fa;
    }

    // Code and pre
    :deep(code) {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 4px;
      color: #d4af37;
      font-family: "Courier New", monospace;
    }

    :deep(pre) {
      background: #2d2d2d;
      color: #fff;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 24px 0;
    }

    // Horizontal rule
    :deep(hr) {
      border: none;
      height: 2px;
      background: linear-gradient(90deg, transparent, #d4af37, transparent);
      margin: 32px 0;
    }

    // Images inside content
    :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 16px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    // Superscript and subscript
    :deep(sup) {
      color: #d4af37;
      font-size: 0.8em;
    }

    :deep(sub) {
      color: #666;
      font-size: 0.8em;
    }

    // Mark/highlight
    :deep(mark) {
      background: linear-gradient(135deg, #d4af37, #f9d423);
      color: white;
      padding: 2px 4px;
      border-radius: 2px;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .hero-section {
    padding: 120px 0 40px;
  }

  .content-sections {
    padding: 40px 0;
  }

  .content-section {
    padding: 40px 0;
  }

  .section-grid {
    gap: 30px;
  }

  .image-column {
    min-height: 300px;

    .section-image {
      height: 300px;
    }
  }

  .text-column .content-html {
    :deep(h1) {
      font-size: 2rem;
    }

    :deep(h2) {
      font-size: 1.75rem;
    }

    :deep(h3) {
      font-size: 1.5rem;
    }
  }
}

// Animation Classes
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-right {
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
