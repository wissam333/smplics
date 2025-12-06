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
  padding-bottom: 50px;

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;

    // Applying the gold gradient text effect
    span {
      background: -webkit-linear-gradient(right, $main, $second);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.2;
    }
  }

  .sub-caption {
    font-size: 1rem;
    color: #777;
    letter-spacing: 2px;
  }

  .cont {
    padding: 0 15px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-wrapper {
    margin-bottom: 100px; // Increased space between sections for visual break
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .section-container {
    display: flex;
    align-items: center;
    gap: 60px; // Generous gap instead of overlapping margins

    @media (max-width: 1200px) {
      gap: 30px;
    }

    @media (max-width: 991px) {
      flex-direction: column !important;
      gap: 40px;
    }

    .reversed & {
      flex-direction: row-reverse;

      @media (max-width: 991px) {
        flex-direction: column !important; // Stacking order remains the same on mobile
      }
    }
  }

  .image-container {
    flex: 1;
    min-width: 45%; // Giving the image a clear dominance
    position: relative;
    z-index: 1;

    @media (max-width: 991px) {
      width: 100%;
      min-width: auto;
    }
  }

  .gold-frame {
    border: 1px solid rgba($main, 0.4);
    padding: 5px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .section-image {
    width: 100%;
    height: auto;
    min-height: 350px; // Increased min-height for professionalism
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.02);
    }

    @media (max-width: 991px) {
      min-height: 250px;
    }
  }

  .text-container {
    flex: 1;
    min-width: 45%;
    position: relative;
    z-index: 2;
    @media (max-width: 991px) {
      width: 100%;
      min-width: auto;
    }
  }

  .gold-card {
    background: #f8f8f8; // Light grey background lift
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); // Subtle shadow
    position: relative;
    min-height: 350px; // To balance with the image
    border-radius: 4px;

    @media (max-width: 991px) {
      min-height: auto;
      padding: 20px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px; // Thicker line
      background: linear-gradient(90deg, $main, $second);
      border-radius: 4px 4px 0 0;
    }

    :deep(p) {
      color: #444; // Slightly lighter text for readability
      line-height: 1.8;
      margin-bottom: 15px;
      font-size: 1rem;
      text-align: start;
    }

    :deep(p:last-child) {
      margin-bottom: 0;
    }

    :deep(strong) {
      color: $main;
      font-weight: 700;
    }
  }
}

.back {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
