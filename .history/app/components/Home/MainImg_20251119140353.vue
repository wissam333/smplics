--- FILE: components/HomeSlider.vue ---
<template>
  <div class="home nav-margin">
    <div class="slider">
      <!-- Loader while fetching API -->
      <div v-if="pending" class="text-center text-white loader">
        <ElementsSpinner></ElementsSpinner>
      </div>

      <!-- Slider -->
      <div v-else>
        <!-- Skeleton while images empty -->
        <div v-if="images.length === 0" class="skeleton-list">
          <div class="skeleton-item"></div>
        </div>

        <swiper-container
          v-else
          style="direction: ltr"
          ref="containerRef"
          :pagination="true"
          :autoplay="{ delay: 3000 }"
          effect="fade"
          :loop="true"
          :speed="600"
        >
          <swiper-slide v-for="image in images" :key="image.id">
            <div class="image-wrapper">
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
const {
  public: { apiBase },
} = useRuntimeConfig();

const mainSlider = useMainSlider();

const mobile = ref(false);

const images = computed(() => {
  if (!mainSlider.value) return [];
  return mobile.value
    ? mainSlider.value[1]?.blockPhotos || []
    : mainSlider.value[0]?.blockPhotos || [];
});

const pending = computed(() => !mainSlider.value);

// Detect mobile
const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

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

  /* Desktop & large screens */
  .image-wrapper {
    width: 100%;
    height: 90vh;
    max-height: 90vh;
    aspect-ratio: 21 / 9;
    overflow: hidden;
    border-radius: 14px;
  }

  .image-rendered {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Mobile (less height) */
  @media (max-width: 768px) {
    .image-wrapper {
      height: 55vh;
      max-height: 55vh;
      aspect-ratio: 16 / 9;
    }
  }

  /* ---------- Skeleton (matches real image) ---------- */
  .skeleton-list {
    width: 100%;
  }
  .skeleton-item {
    width: 100%;
    height: 90vh;
    max-height: 90vh;
    aspect-ratio: 21 / 9;
    border-radius: 14px;
    background: linear-gradient(90deg, #f4f4f4 0%, #ffffff 50%, #f4f4f4 100%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.6s infinite linear;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 768px) {
    .skeleton-item {
      height: 55vh;
      max-height: 55vh;
      aspect-ratio: 16 / 9;
    }
  }

  @keyframes skeleton-shimmer {
    0% {
      background-position: -150% 0;
    }
    100% {
      background-position: 150% 0;
    }
  }
}
</style>
