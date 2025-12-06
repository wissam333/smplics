<template>
  <div class="clients-page nav-margin-mobile">
    <elementsLinks :links="links" />

    <section class="hero-section">
      <div class="cont">
        <div class="hero-content">
          <h1 class="hero-title">
            {{ $i18n.locale === "en" ? "Our Clients" : "عملائنا" }}
          </h1>
          <p class="hero-subtitle">
            {{
              $i18n.locale === "en"
                ? "Partners in success who trust our vision"
                : "شركاء النجاح الذين وثقوا برؤيتنا"
            }}
          </p>
        </div>
      </div>
    </section>

    <section class="content-section section-alt">
      <div class="container">
        <div
          class="clients-wrapper"
          :data-aos="$i18n.locale === 'ar' ? 'fade-up' : 'fade-up'"
        >
          <Swiper
            :key="swiperKey"
            :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
            v-if="items.length > 0"
            :modules="[SwiperAutoplay, SwiperFreeMode]"
            :slides-per-view="'auto'"
            :space-between="30"
            :loop="true"
            :autoplay="{
              delay: 0,
              disableOnInteraction: false,
              waitForTransition: false,
            }"
            :speed="5000"
            :free-mode="{
              enabled: true,
              momentum: false,
            }"
            :breakpoints="{
              320: { spaceBetween: 15 },
              576: { spaceBetween: 20 },
              768: { spaceBetween: 25 },
              992: { spaceBetween: 30 },
            }"
            class="clients-swiper"
          >
            <SwiperSlide v-for="(item, index) in items" :key="index">
              <a
                v-if="item.isActive"
                :href="item.urlField"
                target="_blank"
                rel="noopener noreferrer"
                class="client-card"
              >
                <div class="logo-wrapper">
                  <img
                    :src="apiBase + item.image1"
                    :alt="'Client ' + item.id"
                    class="client-logo img-fluid"
                  />
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();

// Fetch Data
const { data, pending } = await useGetSiteApi().GetAll(
  `${api.Blocks}?categoryId=8`
);

const { locale } = useI18n();

// Breadcrumbs Logic
const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  {
    text: locale.value === "ar" ? "عملائنا" : "Our Clients",
    to: null,
  },
]);

// Swiper Logic
const swiperKey = ref(0);
watch(locale, () => {
  swiperKey.value++;
});

const items = computed(() => data.value?.items || []);
</script>

<style lang="scss" scoped>
// 1. Structure Variables & Base
.clients-page {
  background: #fff;
  color: #2d2d2d;
  min-height: 100vh;
}

// 2. Hero Section (Exact copy of reference style)
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
    // Pattern Overlay
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .hero-content {
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    color: #e0e0e0;
  }
}

// 3. Content Section (Background Styling)
.content-section {
  padding: 80px 0;

  &.section-alt {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }
}

// 4. Swiper & Cards Styling
.clients-swiper {
  padding: 20px 0 40px;

  .swiper-slide {
    width: 200px; // Fixed width for cards
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 5. Responsive Design
@media (max-width: 992px) {
  .hero-section {
    padding: 120px 0 60px;

    .hero-title {
      font-size: 2.5rem;
    }
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 100px 0 50px;
    .hero-title {
      font-size: 2rem;
    }
    .hero-subtitle {
      font-size: 1rem;
      padding: 0 15px;
    }
  }

  .clients-swiper {
    .swiper-slide {
      width: 160px;
    }
  }
}
</style>
