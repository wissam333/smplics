<template>
  <div class="web-design-portfolio nav-margin-mobile">
    <!-- Breadcrumb Navigation -->
    <elementsLinks :links="links" />

    <!-- Hero Section -->
    <ElementsHeroSection
      :title="$i18n.locale === 'ar' ? 'تطوير الويب' : 'Web Development'"
      :subtitle="
        $i18n.locale === 'ar'
          ? 'تصميم وتطوير مواقع ويب مبتكرة'
          : 'Innovative web design and development'
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
            :class="{ 'mobile-view': mobile }"
            data-aos="fade-up"
            :data-aos-delay="index * 150"
          >
            <div class="laptop-wrapper">
              <img
                class="laptop-frame"
                src="/photos/laptop.png"
                alt="Laptop frame"
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
  `${api.Blocks}?categoryId=14`
);

const { locale } = useI18n();
const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  {
    text: locale.value === "ar" ? "تطوير الويب" : "Web Development",
    to: null,
  },
]);

let mobile = ref(false);

const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 768px)").matches;
};

if (process.client) {
  onBeforeMount(() => {
    checkWindowSize();
  });
  onMounted(() => {
    window.addEventListener("resize", checkWindowSize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", checkWindowSize);
  });
}
</script>

<style lang="scss" scoped>
.web-design-portfolio {
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 60px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
}

.portfolio-item {
  position: relative;

  &.mobile-view {
    max-width: 350px;
    margin: 0 auto;
  }
}

.laptop-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 350px;
  }
}

.laptop-frame {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 2;
  pointer-events: none;
}

.website-link {
  display: block;
  position: absolute;
  top: 3.5%;
  left: 16.5%;
  width: 67%;
  height: 74%;
  overflow: hidden;
  z-index: 1;
  background: #f5f5f5;
  border-radius: 4px;

  &:hover {
    .marquee-content {
      animation-play-state: paused;
    }
    .name-overlay {
      opacity: 1;
      transform: translateY(0);
    }
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
  animation: vertical-scroll 20s linear infinite;
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
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 3;
  padding: 20px;
  box-sizing: border-box;
}

.name-content {
  text-align: center;
  color: #333;
  width: 100%;

  @media (max-width: 991px) {
    position: absolute;
    top: 30px;
  }
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.3);

  @media (max-width: 991px) {
    font-size: 16px;
  }
}

.visit-button {
  display: inline-block;
  padding: 10px 25px;
  background: transparent;
  color: #333;
  border: 2px solid $main;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 10px;

  @media (max-width: 991px) {
    font-size: 12px;
    padding: 6px 16px;
  }

  &:hover {
    background: $main;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

/* Mobile specific adjustments */
@media (max-width: 768px) {
  .portfolio-item {
    width: 100%;

    .website-marquee {
      height: calc(350px * 0.7);
    }

    .marquee-content {
      animation: vertical-scroll 15s linear infinite;
    }
  }
}
</style>
