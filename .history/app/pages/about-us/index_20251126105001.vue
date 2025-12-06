<template>
  <div class="about-page nav-margin-mobile" v-if="!pending && About">
    <!-- Breadcrumb Navigation -->
    <elementsLinks :links="links" />

    <!-- Hero Section -->
    <ElementsHeroSection
      :title="$i18n.locale === 'ar' ? About.name : About.englishName"
      :subtitle="
        $i18n.locale === 'ar' ? About.captionArabic : About.captionEnglish
      "
    />

    <!-- Content Sections -->
    <div class="content-sections">
      <!-- Section 1 -->
      <section class="content-section" v-if="About.description1">
        <div class="cont">
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



// Content Sections
.content-sections {
  padding: 20px 0;
}

.content-section {
  padding: 20px 0;

  &.section-alt {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 10px;

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
      top: 20px;
      inset-inline-end: 20px;
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      border-radius: 8px;
      z-index: 1;
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
  }

  .content-html {
    line-height: 1.8;
    font-size: 15px;

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
