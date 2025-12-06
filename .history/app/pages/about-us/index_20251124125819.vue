<template>
  <div class="about-page nav-margin-mobile" v-if="!pending && pageData">
    <div class="container">
      <div class="back" v-if="BG?.isActive">
        <ElementsBackHeadr
          :src="apiBase + BG?.blockPhotos[0]?.image"
          alt="background image"
        />
      </div>

      <elementsLinks :links="links" />

      <div class="title-container mt-5 mb-5 text-center">
        <h1 class="page-title">
          <NuxtImg
            width="40"
            format="webp"
            preload
            src="/logo/webLogo.png"
            :alt="locale === 'ar' ? 'شعار' : 'Logo'"
            class="me-2"
          />
          <span class="d-inline-block">
            {{ locale === "ar" ? pageData.name : pageData.englishName }}
          </span>
        </h1>
        <h2 class="sub-caption mt-2 text-uppercase">
          {{
            locale === "ar" ? pageData.captionArabic : pageData.captionEnglish
          }}
        </h2>
      </div>

      <div class="cont">
        <div
          v-for="(section, index) in contentSections"
          :key="index"
          :class="['section-wrapper', { reversed: section.reversed }]"
        >
          <div class="section-container">
            <div class="image-container" v-if="section.imagePath">
              <div class="gold-frame">
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder
                  :src="apiBase + section.imagePath"
                  :alt="`About section image ${index + 1}`"
                  class="section-image"
                />
              </div>
            </div>

            <div class="text-container">
              <div class="gold-card" v-html="section.description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
const { locale } = useI18n();

// Fetching page data and background
const { data: pageData, pending } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/1`
);

const { data: BG } = await useGetSiteApi().GetAll(`${api.Blocks}/9`); // Background block

// 1. Generate Content Sections Array
const contentSections = computed(() => {
  if (!pageData.value) return [];

  const data = pageData.value;
  const isArabic = locale.value === "ar";

  // Array of possible sections structure
  const sections = [
    {
      description: isArabic ? data.description1 : data.englishDescription1,
      imageAr: data.image1,
      imageEn: data.image2,
      reversed: true, // Image on one side, Text on the other
    },
    {
      description: isArabic ? data.description2 : data.englishDescription2,
      imageAr: data.image3,
      imageEn: data.image4,
      reversed: false, // Image on the opposite side, Text on the first side
    },
    {
      description: isArabic ? data.description3 : data.englishDescription3,
      imageAr: data.image5,
      imageEn: data.image6,
      reversed: true,
    },
    {
      description: isArabic ? data.description4 : data.englishDescription4,
      imageAr: data.image7,
      imageEn: data.image8,
      reversed: false,
    },
  ];

  // Filter out sections where there is no description content
  return sections
    .filter((s) => s.description && s.description.trim().length > 10) // Basic check for content
    .map((s) => ({
      ...s,
      // Determine the correct image path based on locale
      imagePath: isArabic ? s.imageAr : s.imageEn,
    }));
});

// 2. Generate Breadcrumb Links
const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  {
    text:
      locale.value === "ar" ? pageData.value.name : pageData.value.englishName,
    to: null,
  },
]);
</script>

<style lang="scss" scoped>
.about-page {
  background-color: #fff;
  color: #333;
  padding-bottom: 30px;

  .section-wrapper {
    margin-bottom: 80px;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    &.reversed {
      .section-container {
        flex-direction: row-reverse;
      }

      .text-container {
        margin-inline-start: 0;
        margin-inline-end: -50px;

        @media (max-width: 991px) {
          margin-inline-end: 0;
        }
      }

      .gold-card {
        // border-inline-start: none;
        // border-inline-end: 1px solid $main;
      }
    }
  }

  .section-container {
    display: flex;
    align-items: center;
    gap: 30px;

    @media (max-width: 991px) {
      flex-direction: column !important;
      gap: 20px;
    }
  }

  .image-container {
    flex: 1;
    position: relative;
    z-index: 1;

    @media (max-width: 991px) {
      width: 100%;
    }
  }

  .gold-frame {
    // border: 1px solid transparent;
    // border-image: linear-gradient(45deg, #e2bf806e, #7d5f3170);
    // border-image-slice: 1;
    padding: 5px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &::before {
      content: "";
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: linear-gradient(
        45deg,
        transparent,
        transparent,
        rgba(212, 175, 55, 0.1),
        transparent,
        transparent
      );
      z-index: -1;
      animation: shine 8s infinite;
    }
  }

  .section-image {
    width: 100%;
    height: auto;
    min-height: 300px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.03);
    }

    @media (max-width: 991px) {
      min-height: 200px;
    }
  }

  .text-container {
    flex: 1;
    position: relative;
    margin-inline-start: -50px;
    z-index: 2;

    &::before {
      content: "";
      position: absolute;
      inset-inline-start: 13px;
      top: 70px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(to right, $main, $second);
      outline: 2px solid $main;
      outline-offset: 2px;
      z-index: 2;
    }

    &::after {
      content: "";
      position: absolute;
      inset-inline-start: 15.5px;
      top: 105px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: linear-gradient(to right, $main, $second);
      outline: 2px solid $main;
      outline-offset: 2px;
      z-index: 2;
    }

    .black-linear {
      position: absolute;
      inset-inline-start: 0px;
      bottom: 0;
      width: 30px;
      height: 100%;
      background: linear-gradient(0deg, #ffffff, transparent);
      z-index: 3;
    }

    @media (max-width: 991px) {
      margin-inline-start: 0;
      margin-top: -20px;
    }
  }

  .gold-card {
    background: rgba(255, 255, 255, 0.8);
    padding-inline-start: 40px;
    padding-inline-end: 20px;
    padding-top: 30px;
    padding-bottom: 20px;
    // border-inline-start: 1px solid $main;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    position: relative;
    backdrop-filter: blur(5px);
    min-height: 300px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, $main, $second);
    }

    &::after {
      content: "";
      position: absolute;
      inset-inline-start: 19px;
      top: 53px;
      height: calc(100% - 53px);
      width: 1px;
      background-color: $main;
    }

    &::before {
      content: "";
      position: absolute;
      inset-inline-start: 11px;
      top: 33px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: linear-gradient(to right, $main, $second);
      outline: 2px solid $main;
      outline-offset: 2px;
      z-index: 2;
    }

    @media (max-width: 991px) {
      padding-inline-start: 40px;
      padding-inline-end: 5px;
      min-height: auto;
    }

    :deep(p) {
      color: #333;
      line-height: 1.8;
      margin-bottom: 20px;
      font-size: 1rem;
      text-align: start;
    }

    :deep(strong) {
      color: $main;
      font-weight: 600;
    }

    :deep(a) {
      color: $main;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: #f9d423;
        text-decoration: underline;
      }
    }

    :deep(ul),
    :deep(ol) {
      text-align: start;
      padding-inline-start: 20px;
    }

    :deep(li) {
      margin-bottom: 10px;
    }
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    20% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }
}

.back {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
