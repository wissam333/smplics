<template>
  <div class="mobile-design-portfolio nav-margin-mobile" v-if="!pending">
    <!-- Breadcrumb Navigation -->
    <elementsLinks :links="links" />

    <!-- Hero Section -->
    <ElementsHeroSection
      :title="
        $i18n.locale === 'ar' ? 'تطبيقات الهاتف المحمول' : 'Mobile Applications'
      "
      :subtitle="
        $i18n.locale === 'ar'
          ? 'تصميم وتطوير تطبيقات الجوال المبتكرة'
          : 'Innovative mobile app design and development'
      "
    />

    <!-- Portfolio Content -->
    <div class="portfolio-content">
      <div class="container">
        <div v-if="pending">
          <ElementsSpinner></ElementsSpinner>
        </div>

        <div v-else class="portfolio-items">
          <div
            v-for="(item, index) in data?.items"
            :key="item.id"
            class="portfolio-item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="mobile-wrapper">
              <img
                class="mobile-frame"
                src="/photos/mobile.png"
                alt="Mobile frame"
              />
              <a :href="item.urlField" target="_blank" class="website-link">
                <div class="website-marquee">
                  <div class="name-overlay">
                    <div class="name-content">
                      <div class="title">
                        {{
                          $i18n.locale === "ar" ? item.name : item.englishName
                        }}
                      </div>
                      <div class="visit-button">
                        {{
                          $i18n.locale === "ar" ? "زيارة الموقع" : "Visit Site"
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="marquee-content">
                    <img
                      :src="apiBase + item.image1"
                      alt="Website preview"
                      class="website-screenshot"
                    />
                    <img
                      :src="apiBase + item.image1"
                      alt="Website preview"
                      class="website-screenshot"
                    />
                  </div>
                </div>
              </a>
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

const { data, pending } = await useGetSiteApi().GetAll(
  `${api.Blocks}?categoryId=15`
);

const { locale } = useI18n();
const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  {
    text:
      locale.value === "ar" ? "تطبيقات الهاتف المحمول" : "Mobile Applications",
    to: null,
  },
]);
</script>

<style lang="scss" scoped>
.mobile-design-portfolio {
  background: #fff;
  color: #2d2d2d;
}

.portfolio-content {
  padding: 60px 0;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
}

.portfolio-items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
}

.portfolio-item {
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.mobile-wrapper {
  position: relative;
  width: 100%;
  max-width: 220px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 180px;
  }

  @media (max-width: 480px) {
    max-width: 140px;
  }
}

.mobile-frame {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 2;
  pointer-events: none;
}

.website-link {
  display: block;
  position: absolute;
  top: 1.5%;
  left: 6.5%;
  width: 87%;
  height: 96%;
  overflow: hidden;
  border-radius: 12px;
  z-index: 1;
  background: #f5f5f5;
  transition: all 0.3s ease;

  &:hover {
    .marquee-content {
      animation-play-state: paused;
    }
    .name-overlay {
      opacity: 1;
      transform: translateY(0);
    }
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

.website-marquee {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: vertical-scroll 15s linear infinite;
}

.website-screenshot {
  width: 100%;
  height: auto;
  display: block;
}

.name-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 3;
  padding: 15px;
  box-sizing: border-box;
  backdrop-filter: blur(2px);
}

.name-content {
  text-align: center;
  color: #333;
  width: 100%;
}

.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.3;
  color: #2d2d2d;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

.visit-button {
  display: inline-block;
  padding: 8px 15px;
  background: transparent;
  color: #333;
  border: 2px solid $main;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background: $main;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 10px;
  }
}

@keyframes vertical-scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

/* Enhanced hover effects for better user experience */
.portfolio-item:hover {
  .mobile-frame {
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
  }
}

/* Loading state enhancement */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

/* Empty state styling */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  .empty-text {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .empty-subtext {
    font-size: 14px;
    color: #888;
  }
}
</style>
