<template>
  <div class="partners-page nav-margin-mobile">
    <elementsLinks :links="links" />

    <!-- Hero Section -->
    <ElementsHeroSection
      :title="$t('Our Clients')"
      :subtitle="
        $i18n.locale === 'ar'
          ? 'نفخر بشراكاتنا الاستراتيجية التي تساهم في نجاحنا'
          : 'We take pride in our strategic partnerships that contribute to our success'
      "
    />

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
