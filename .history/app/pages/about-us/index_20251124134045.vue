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

  .logo-mark {
    margin-bottom: 20px;

    .logo-img {
      filter: brightness(0) invert(1);
      opacity: 0.9;
    }
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2.5rem;
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
  padding: 80px 0;
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
  align-items: center;

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

  .image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

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

    &::before {
      content: "";
      position: absolute;
      top: -10px;
      left: -30px;
      width: 4px;
      height: 80px;
      background: linear-gradient(135deg, #d4af37, #f9d423);
      border-radius: 2px;

      @media (max-width: 991px) {
        left: -15px;
      }
    }
  }

  .content-html {
    line-height: 1.8;
    font-size: 1.1rem;

    :deep(p) {
      margin-bottom: 24px;
      color: #4a4a4a;
      text-align: start;
    }

    :deep(strong) {
      color: #d4af37;
      font-weight: 600;
    }

    :deep(a) {
      color: #d4af37;
      text-decoration: none;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        color: #f9d423;
        text-decoration: underline;
      }
    }

    :deep(ul),
    :deep(ol) {
      text-align: start;
      padding-inline-start: 24px;
      margin-bottom: 24px;
    }

    :deep(li) {
      margin-bottom: 8px;
      color: #4a4a4a;
    }

    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      color: #2d2d2d;
      margin-bottom: 16px;
      font-weight: 600;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0 40px;
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
