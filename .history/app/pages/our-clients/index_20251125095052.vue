<template>
  <div class="clients-section py-5 bg-light">
    <div class="container">
      <div class="row align-items-center">
        <!-- Title Column (col-lg-3) -->
        <div
          class="col-lg-3 mb-4 mb-lg-0"
          :data-aos="$i18n.locale === 'ar' ? 'fade-left' : 'fade-right'"
        >
          <h2 class="clients-title mb-0">
            <div :data-aos="$i18n.locale === 'ar' ? 'fade-left' : 'fade-right'">
              {{ $i18n.locale === "en" ? "Our" : "عملائنا" }}
              <span class="text-main">
                {{ $i18n.locale === "en" ? "Clients" : "" }}</span
              >
            </div>
          </h2>
        </div>

        <!-- Swiper Column -->
        <div
          class="col-lg-9"
          :data-aos="$i18n.locale === 'ar' ? 'fade-right' : 'fade-left'"
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
            :delay="0"
            :speed="7000"
            :free-mode="{
              enabled: true,
              momentum: false,
            }"
            :breakpoints="{
              320: {
                spaceBetween: 15,
              },
              576: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 25,
              },
              992: {
                spaceBetween: 30,
              },
            }"
            class="clients-swiper"
          >
            <SwiperSlide v-for="(item, index) in items" :key="index">
              <a
                v-if="item.isActive"
                :href="item.urlField"
                target="_blank"
                rel="noopener noreferrer"
                class="client-item d-block"
              >
                <img
                  :src="apiBase + item.image1"
                  :alt="'Client ' + item.id"
                  class="client-logo img-fluid"
                />
              </a>
            </SwiperSlide>
          </Swiper>
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
  `${api.Blocks}?categoryId=12`
);

const { locale } = useI18n();

const swiperKey = ref(0); // Key to force Swiper re-render
// Watch for locale changes
watch(locale, () => {
  swiperKey.value++; // Increment key to force Swiper to reinitialize
});

const items = computed(() => data.value?.items || []);
</script>

<style lang="scss" scoped>
.clients-section {
  background-color: #cecece;
  .clients-title {
    font-weight: 700;
    color: #333;
    position: relative;
    padding-inline-start: 1rem;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      inset-inline-start: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: $main;
    }
  }

  .clients-swiper {
    padding: 10px 0;

    .swiper-slide {
      width: 150px;
 
    }
  }

  .client-item {
    padding: 0 10px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .client-logo {
    height: 150px;
    width: 150px;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      filter: grayscale(0);
      opacity: 1;
    }
  }
}

@media (max-width: 992px) {
  .clients-section {
    .clients-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      padding-left: 0.75rem;
    }
  }
}

@media (max-width: 576px) {
  .clients-section {
    .client-logo {
      height: 100px;
    }
  }
}
</style>
