<template>
  <div class="home nav-margin">
    <div class="slider">
      <div v-if="pending" class="text-center text-white loader">
        <ElementsSpinner></ElementsSpinner>
      </div>
      <div v-else-if="!pending">
        <SwiperContainer
          v-if="useMainSlider().value"
          style="direction: ltr"
          :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
          :slides-per-view="1"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }"
          :lazy="true"
          :preloadImages="false"
          :updateOnImagesReady="true"
          :effect="'fade'"
          :speed="1000"
          :pagination="{
            clickable: true,
          }"
        >
          <SwiperSlide
            v-if="!mobile"
            v-for="image in useMainSlider().value[0]?.blockPhotos"
            :key="image.id"
          >
            <div class="main-img">
              <img classes="image-rendered" :src="`${apiBase}${image.image}`" />
            </div>
          </SwiperSlide>

          <SwiperSlide
            v-if="mobile"
            v-for="image in useMainSlider().value[1]?.blockPhotos"
            :key="image.id"
          >
            <div class="main-img">
              <img classes="image-rendered" :src="`${apiBase}${image.image}`" />
            </div>
          </SwiperSlide>
        </SwiperContainer>
        
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();

let mobile = ref(false);

const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
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
.home {
  position: relative;
  .main-img {
    width: 100%;
    .main {
      width: 100%;
      height: 100%;
      object-fit: cover;
      @media (max-width: 768px) {
        object-fit: cover;
      }
    }
  }
}
</style>
