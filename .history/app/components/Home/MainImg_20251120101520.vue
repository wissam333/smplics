<template>
  <div class="home nav-margin">
    <div class="slider">
      <div v-if="pending" class="text-center text-white loader">
        <ElementsSpinner></ElementsSpinner>
      </div>

      <div v-else>
        <swiper-container
          v-if="images.length"
          style="direction: ltr"
          ref="containerRef"
          :pagination="{
            clickable: true,
          }"
          :autoplay="{ delay: 3000 }"
          effect="fade"
          :loop="true"
          :speed="600"
          class="custom-swiper"
        >
          <swiper-slide v-for="(image, idx) in images" :key="image.id">
            <div class="image-wrapper">
              <div class="skeleton-item" v-show="!loaded[idx]"></div>

              <NuxtImg
                :src="`${apiBase}${image.image}`"
                class="image-rendered"
                format="webp"
                width="1920"
                height="1080"
                placeholder="blur"
                @load="markLoaded(idx)"
                :class="{ 'fade-in': loaded[idx] }"
              />
            </div>
          </swiper-slide>
        </swiper-container>

        <div v-else class="image-wrapper">
          <div class="skeleton-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase },
} = useRuntimeConfig();

const mainSlider = useMainSlider();

const mobile = ref(false);

const images = computed(() => {
  if (!mainSlider.value) return [];
  return mobile.value
    ? mainSlider.value[0]?.blockPhotos || []
    : mainSlider.value[0]?.blockPhotos || [];
});

const pending = computed(() => !mainSlider.value);

// track which image indexes have loaded
const loaded = ref([]);

// FIX: Use watch to re-initialize the loaded array whenever images changes.
watch(
  images,
  (newImages) => {
    // Initialize loaded array with 'false' for every image
    loaded.value = new Array(newImages.length).fill(false);
  },
  { immediate: true }
);

// mark index loaded
const markLoaded = (idx) => {
  if (idx >= 0 && idx < loaded.value.length) {
    loaded.value[idx] = true;
  }
};

// Detect mobile
const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

// Lifecycle hooks to handle window resize listener
if (process.client) {
  onBeforeMount(checkWindowSize);
  onMounted(() => window.addEventListener("resize", checkWindowSize));
  onUnmounted(() => window.removeEventListener("resize", checkWindowSize));
}

const containerRef = ref(null);
</script>

<style lang="scss" scoped>
.home {
  position: relative;

  /* --- Swiper Customization --- */
  .custom-swiper {
    width: 100%;
    height: 100%;
    --swiper-pagination-color: #bf9847; // Gold for active
    --swiper-pagination-bullet-inactive-color: #ffffff; // White for inactive
    --swiper-pagination-bullet-inactive-opacity: 0.6;
    --swiper-pagination-bullet-size: 10px;
    --swiper-pagination-bullet-horizontal-gap: 6px;
    --swiper-pagination-bottom: 30px; // Move bullets up slightly

    &::part(pagination) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &::part(bullet) {
      transition: all 0.3s ease;
      border-radius: 10px;
    }

    &::part(bullet-active) {
      width: 24px; // Expands the active bullet
      border-radius: 10px;
    }
  }

  /* Slider Wrapper */
  .image-wrapper {
    width: 100%;
    height: 90vh;
    max-height: 90vh;
    aspect-ratio: 21 / 9;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .image-wrapper {
      height: 55vh;
      max-height: 55vh;
      aspect-ratio: 16 / 9;
    }
  }

  /* Image */
  .image-rendered {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .fade-in {
    opacity: 1;
  }

  /* Skeleton - Shimmer Effect */
  .skeleton-item {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    // Gradient definition for the shimmer
    background: linear-gradient(to right, #d1d1d1 0%, #e8e8e8 20%, #d1d1d1 40%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;

    transition: opacity 0.4s ease;
    z-index: 2;
  }

  // Keyframes for the shimmer animation
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .image-wrapper .fade-in + .skeleton-item {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
