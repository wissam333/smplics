<template>
  <div class="partners-page nav-margin-mobile">
    <elementsLinks :links="links" />

    <section class="hero-section">
      <div class="cont">
        <div class="hero-content">
          <h1 class="hero-title">
            <NuxtImg
              width="60"
              height="30"
              format="webp"
              preload
              src="/logo/logo2.png"
              alt="Nerva Logo"
              class="logo-img"
            />
            <span>{{ $t("Our Clients") }}</span>
          </h1>
          <p class="hero-subtitle">
            {{
              $i18n.locale === "ar"
                ? "نفخر بشراكاتنا الاستراتيجية التي تساهم في نجاحنا"
                : "We take pride in our strategic partnerships that contribute to our success"
            }}
          </p>
        </div>
      </div>
    </section>

    <section class="partners-section">
      <div class="cont">
        <div v-if="loadingPartiners" class="text-center py-5">
          <ElementsSpinner></ElementsSpinner>
        </div>

        <div
          v-else
          class="partners-grid"
          :class="locale === 'ar' ? 'ar' : ''"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <a
            v-for="partner in Partiners?.items"
            :key="partner.id"
            class="partner-card"
            :href="partner.url1"
            target="_blank"
            :title="locale === 'ar' ? partner?.name : partner?.englishName"
          >
            <div class="card-inner">
              <div class="logo-wrapper">
                <NuxtImg
                  v-if="partner.image1"
                  :alt="partner?.englishName"
                  :src="`${apiBase}${partner.image1}`"
                  loading="lazy"
                  fit="contain"
                  class="partner-logo"
                />
                <font-awesome
                  v-else
                  :icon="['fas', 'handshake']"
                  class="placeholder-icon"
                />
              </div>
              <div class="partner-info">
                <span class="view-link">
                  {{
                    $i18n.locale === "ar" ? partner?.name : partner?.englishName
                  }}
                  <font-awesome
                    :icon="
                      locale === 'ar'
                        ? ['fas', 'arrow-left']
                        : ['fas', 'arrow-right']
                    "
                    class="mx-1"
                  />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <ElementsSeoMeta
      :title="`${
        $i18n.locale === 'ar'
          ? `${$t('TITLE')} - شركاؤنا`
          : `${$t('TITLE')} - Our Partners`
      }`"
      :description="`${
        $i18n.locale === 'ar'
          ? `${$t('TITLE')} - شركاؤنا`
          : `${$t('TITLE')} - Our Partners`
      }`"
      :keywords="`${
        $i18n.locale === 'ar'
          ? `${$t('TITLE')} , شركاؤنا`
          : `${$t('TITLE')} , Our Partners`
      }`"
    />
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
const { locale } = useI18n();
const { t } = useI18n();

// Breadcrumbs
const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  {
    text: t("OurPartners"),
    to: null,
  },
]);

// Get Partners Data
const { data: Partiners, pending: loadingPartiners } =
  await useGetSiteApi().GetAll(`${api.Blocks}?categoryId=8&pageSize=10000`);
</script>

<style lang="scss" scoped>
// Variable Definitions (Ensuring match with Reference)
$dark-bg: #2d2d2d;
$light-gray: #f8f9fa;

.partners-page {
  background: #fff;
  min-height: 100vh;
}

/* =========================================
   1. HERO SECTION (Direct Copy from Reference)
   ========================================= */
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
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .hero-content {
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .hero-title {
    font-weight: 700;
    font-size: 2.5rem;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      filter: brightness(0) invert(1);
      opacity: 0.9;
      margin-inline-end: 15px;
    }
  }

  .hero-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    color: #e0e0e0;
  }
}

/* =========================================
   2. PARTNERS GRID
   ========================================= */
.partners-section {
  padding: 80px 0;
  background-color: #fcfcfc;

  .partners-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    &.ar {
      direction: rtl;
    }

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }
}

/* =========================================
   3. PARTNER CARD UI
   ========================================= */
.partner-card {
  text-decoration: none;
  display: block;
  perspective: 1000px; // For 3D feel

  .card-inner {
    background: #fff;
    border-radius: 12px;
    padding: 30px;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    overflow: hidden;

    // Golden accent line at bottom
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #d4af37, #f9d423);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.4s ease;
    }
  }

  .logo-wrapper {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    .partner-logo {
      max-width: 80%;
      max-height: 100%;
      object-fit: contain;
      filter: grayscale(100%); // Start Black and white
      opacity: 0.7;
      transition: all 0.4s ease;
    }

    .placeholder-icon {
      font-size: 3rem;
      color: #ddd;
    }
  }

  .partner-info {
    margin-top: 15px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;

    .view-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: $main;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  // Hover Effects
  &:hover {
    .card-inner {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);

      &::after {
        transform: scaleX(1);
      }
    }

    .partner-logo {
      filter: grayscale(0%); // Color on hover
      opacity: 1;
      transform: scale(1.05);
    }

    .partner-info {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

// Mobile Responsive Tweaks
@media (max-width: 768px) {
  .hero-section {
    padding: 120px 0 60px;
    .hero-title {
      font-size: 2rem;
    }
  }
  .partner-card .card-inner {
    height: 180px;
    padding: 20px;
  }
}
</style>
