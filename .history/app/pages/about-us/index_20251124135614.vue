<template>
  <div class="about-page nav-margin-mobile" v-if="!pending && About">
    <!-- Breadcrumb Navigation -->
    <elementsLinks :links="links" />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-logo">
            <NuxtImg
              width="100"
              height="50"
              format="webp"
              preload
              src="/logo/logo2.png"
              alt="Nerva Logo"
              class="logo-img"
            />
          </div>
          <h1 class="hero-title">
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
              <div class="about-image-stack">
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder
                  :src="
                    apiBase +
                    ($i18n.locale === 'ar' ? About.image1 : About.image2)
                  "
                  alt="About Nerva"
                  class="main-image"
                />
              </div>
            </div>
            <div class="text-column">
              <div class="about-content">
                <div class="content-header">
                  <h4 class="subheading">
                    {{
                      $i18n.locale === "ar" ? "تعرف علينا" : "Get To Know Us"
                    }}
                  </h4>
                  <h2 class="title">
                    <span class="text-secondary-bg">
                      {{ $i18n.locale === "en" ? "About" : "من" }}
                    </span>
                    <span class="text-main">
                      {{ $i18n.locale === "en" ? " Us" : " نحن " }}
                    </span>
                  </h2>
                </div>
                <div
                  class="content-html desc"
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
              <div class="about-image-stack">
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder
                  :src="
                    apiBase +
                    ($i18n.locale === 'ar' ? About.image3 : About.image4)
                  "
                  alt="About Nerva"
                  class="main-image"
                />
              </div>
            </div>
            <div class="text-column">
              <div class="about-content">
                <div class="content-header">
                  <h4 class="subheading">
                    {{ $i18n.locale === "ar" ? "رؤيتنا" : "Our Vision" }}
                  </h4>
                  <h2 class="title">
                    <span class="text-secondary-bg">
                      {{ $i18n.locale === "en" ? "Why" : "لماذا" }}
                    </span>
                    <span class="text-main">
                      {{ $i18n.locale === "en" ? " Choose Us" : " نيرفا" }}
                    </span>
                  </h2>
                </div>
                <div
                  class="content-html desc"
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
              <div class="about-image-stack">
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder
                  :src="
                    apiBase +
                    ($i18n.locale === 'ar' ? About.image5 : About.image6)
                  "
                  alt="About Nerva"
                  class="main-image"
                />
              </div>
            </div>
            <div class="text-column">
              <div class="about-content">
                <div class="content-header">
                  <h4 class="subheading">
                    {{ $i18n.locale === "ar" ? "خبرتنا" : "Our Expertise" }}
                  </h4>
                  <h2 class="title">
                    <span class="text-secondary-bg">
                      {{ $i18n.locale === "en" ? "Our" : "خبرات" }}
                    </span>
                    <span class="text-main">
                      {{ $i18n.locale === "en" ? " Services" : " نا" }}
                    </span>
                  </h2>
                </div>
                <div
                  class="content-html desc"
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

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="values-header">
          <h2 class="values-title">
            {{ $i18n.locale === "ar" ? "قيمنا" : "Our Values" }}
          </h2>
          <p class="values-subtitle">
            {{
              $i18n.locale === "ar" ? "ما يميزنا" : "What Makes Us Different"
            }}
          </p>
        </div>
        <div class="values-grid">
          <div class="value-item" v-for="value in values" :key="value.id">
            <div class="value-icon-wrapper">
              <Icon :name="value.icon" class="value-icon" />
            </div>
            <h3 class="value-title">
              {{ $i18n.locale === "ar" ? value.titleAr : value.titleEn }}
            </h3>
            <p class="value-desc">
              {{ $i18n.locale === "ar" ? value.descAr : value.descEn }}
            </p>
          </div>
        </div>
      </div>
    </section>
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

// Values data
const values = [
  {
    id: 1,
    icon: "material-symbols:rocket-launch",
    titleEn: "Innovation",
    titleAr: "الابتكار",
    descEn: "Creative solutions that push boundaries",
    descAr: "حلول إبدائية تتخطى الحدود",
  },
  {
    id: 2,
    icon: "material-symbols:star",
    titleEn: "Excellence",
    titleAr: "التميز",
    descEn: "Uncompromising quality in every project",
    descAr: "جودة لا تُساوم في كل مشروع",
  },
  {
    id: 3,
    icon: "material-symbols:group",
    titleEn: "Partnership",
    titleAr: "الشراكة",
    descEn: "Building lasting relationships with clients",
    descAr: "بناء علاقات دائمة مع العملاء",
  },
  {
    id: 4,
    icon: "material-symbols:auto-awesome",
    titleEn: "Creativity",
    titleAr: "الإبداع",
    descEn: "Unique ideas that make brands stand out",
    descAr: "أفكار فريدة تجعل العلامات التجارية متميزة",
  },
];
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
  padding: 160px 0 80px;
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

  .hero-logo {
    margin-bottom: 30px;

    .logo-img {
      filter: brightness(0) invert(1);
      opacity: 0.9;
    }
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .hero-subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
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
    gap: 50px;

    &.reversed {
      direction: ltr;
    }
  }
}

// Enhanced Image Stack from reference
.image-column {
  .about-image-stack {
    position: relative;
    padding: 0 30px;

    .main-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      position: relative;
      z-index: 2;
      transition: transform 0.3s ease;
    }

    // Background layer
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      border-radius: 8px;
      z-index: 1;
      transform: translate(20px, 20px);
    }

    // Accent square
    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      right: -10px;
      width: 50px;
      height: 50px;
      background-color: $second;
      opacity: 0.8;
      border-radius: 4px;
      z-index: 3;
    }

    @media (max-width: 991px) {
      padding: 15px;

      &::before {
        transform: translate(10px, 10px);
      }

      &::after {
        width: 30px;
        height: 30px;
      }
    }
  }
}

// Enhanced Text Content from reference
.text-column {
  .about-content {
    color: #333;

    .content-header {
      margin-bottom: 30px;
    }

    .subheading {
      font-size: 16px;
      font-weight: 600;
      color: $main;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 10px;
      position: relative;
      padding-inline-start: 15px;

      &::before {
        content: "";
        position: absolute;
        inset-inline-start: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: $second;
        border-radius: 2px;
      }
    }

    .title {
      font-size: 2.5rem;
      margin-top: 12px;

      .text-secondary-bg {
        padding: 5px 10px;
        background-color: rgba($main, 0.1);
        border-radius: 4px;
        color: #2d2d2d;
      }

      .text-main {
        color: $main;
      }

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .desc {
      font-size: 16px;
      line-height: 1.8;
      color: #666;
    }
  }

  .content-html {
    line-height: 1.8;
    font-size: 1.1rem;

    :deep(p) {
      margin-bottom: 20px;
      color: #4a4a4a;
      text-align: start;
      line-height: 1.7;
    }

    :deep(b),
    :deep(strong) {
      color: #d4af37;
      font-weight: 700;
    }

    :deep(i),
    :deep(em) {
      font-style: italic;
      color: #666;
    }

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

    :deep(ul),
    :deep(ol) {
      text-align: start;
      padding-inline-start: 24px;
      margin-bottom: 20px;
    }

    :deep(li) {
      margin-bottom: 8px;
      color: #4a4a4a;
      line-height: 1.6;
    }

    :deep(h1) {
      color: #2d2d2d;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 2.2rem;
    }

    :deep(h2) {
      color: #2d2d2d;
      margin-bottom: 18px;
      font-weight: 600;
      font-size: 1.8rem;
    }

    :deep(h3) {
      color: #2d2d2d;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 1.4rem;
    }
  }
}

// Values Section
.values-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 80px 0;

  .values-header {
    text-align: center;
    margin-bottom: 60px;

    .values-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .values-subtitle {
      font-size: 1.2rem;
      opacity: 0.8;
    }
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
  }

  .value-item {
    text-align: center;
    padding: 40px 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      transform: translateY(-10px);
      background: rgba(255, 255, 255, 0.1);
    }

    .value-icon-wrapper {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #d4af37, #f9d423);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .value-icon {
      font-size: 2rem;
      color: white;
    }

    .value-title {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 15px;
      color: #d4af37;
    }

    .value-desc {
      opacity: 0.8;
      line-height: 1.6;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .hero-section {
    padding: 120px 0 60px;
  }

  .content-sections {
    padding: 40px 0;
  }

  .content-section {
    padding: 40px 0;
  }

  .section-grid {
    gap: 40px;
  }

  .values-section {
    padding: 60px 0;

    .values-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
}
</style>
