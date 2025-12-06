--- FILE: components/HomeSlider.vue ---
<template>
  <div class="home nav-margin">
    <div class="slider">
      <!-- Loader -->
      <div v-if="pending" class="text-center text-white loader">
        <ElementsSpinner></ElementsSpinner>
      </div>

      <!-- Slider -->
      <div v-else>
        <!-- Skeleton while images loading but data is ready -->
        <div v-if="images.length === 0" class="skeleton-wrapper">
          <div v-for="n in 3" :key="n" class="skeleton-slide"></div>
        </div>

        <swiper-container
          v-else
          style="direction: ltr"
          ref="containerRef"
          :pagination="true"
          :navigation="true"
          :autoplay="{ delay: 3000 }"
          effect="fade"
          :loop="true"
          :speed="600"
        >
          <swiper-slide
            v-for="image in images"
            :key="image.id"
          >
            <div class="main-img image-wrapper">
              <NuxtImg
                :src="`${apiBase}${image.image}`"
                class="image-rendered"
                format="webp"
                width="1920"
                height="1080"
                placeholder="blur"
              />
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>

<script setup>
// Runtime config
const {
  public: { apiBase },
} = useRuntimeConfig();

// *** Assume data composable returns something like:
// useMainSlider().value = [
//   { blockPhotos: [...] },
//   { blockPhotos: [...] }
// ]
const mainSlider = useMainSlider();

// State
const mobile = ref(false);
const images = computed(() => {
  if (!mainSlider.value) return [];
  return mobile.value
    ? mainSlider.value[1]?.blockPhotos || []
    : mainSlider.value[0]?.blockPhotos || [];
});

const pending = computed(() => !mainSlider.value);

// Window size
const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

if (process.client) {
  onBeforeMount(checkWindowSize);
  onMounted(() => window.addEventListener("resize", checkWindowSize));
  onUnmounted(() => window.removeEventListener("resize", checkWindowSize));
}

// Swiper ref (optional API usage if needed)
const containerRef = ref(null);
</script>

<style lang="scss" scoped>
.home {
  position: relative;

  /* Main Image */
  .image-wrapper {
    width: 100%;
    height: 100%;
  }
  .image-rendered {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Skeleton Loader */
  .skeleton-wrapper {
    display: flex;
    gap: 10px;
  }
  .skeleton-slide {
    width: 100%;
    height: 400px;
    background: linear-gradient(
      90deg,
      #2c2c2c 0%,
      #3d3d3d 50%,
      #2c2c2c 100%
    );
    animation: shine 1.6s infinite linear;
    border-radius: 10px;
  }
  @keyframes shine {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
}
</style>
