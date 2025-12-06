<template>
  <div class="home nav-margin">
    <div class="slider">
      <div v-if="pending" class="text-center text-white loader">
        <ElementsSpinner></ElementsSpinner>
      </div>
      <div v-else-if="!pending">
        <swiper-container
          v-if="useMainSlider().value"
          style="direction: ltr"
          ref="containerRef"
        >
          <swiper-slide
            v-if="!mobile"
            v-for="image in useMainSlider().value[0]?.blockPhotos"
            :key="image.id"
          >
            <div class="main-img">
              <img classes="image-rendered" :src="`${apiBase}${image.image}`" />
            </div>
          </swiper-slide>

          <swiper-slide
            v-if="mobile"
            v-for="image in useMainSlider().value[1]?.blockPhotos"
            :key="image.id"
          >
            <div class="main-img">
              <img classes="image-rendered" :src="`${apiBase}${image.image}`" />
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();

const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 5000,
  },
});

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
