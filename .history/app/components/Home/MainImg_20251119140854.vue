<template>
  <div class="home nav-margin">
    <div class="slider">
      <!-- Loader while fetching data -->
      <div v-if="pending" class="text-center text-white loader">
        <ElementsSpinner></ElementsSpinner>
      </div>

      <!-- Slider -->
      <div v-else>
        <swiper-container
          v-if="images.length"
          style="direction: ltr"
          ref="containerRef"
          :pagination="true"
          :navigation="true"
          :autoplay="{ delay: 3000 }"
          effect="fade"
          :loop="true"
          :speed="600"
        >
          <swiper-slide v-for="(image, idx) in images" :key="image.id">
            <div class="image-wrapper">
              <!-- Skeleton -->
              <div class="skeleton-item" v-show="!loaded[idx]"></div>

              <!-- Image -->
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

        <!-- If images array empty (should not happen after pending false) -->
        <div v-else class="skeleton-list">
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
    ? mainSlider.value[1]?.blockPhotos || []
    : mainSlider.value[0]?.blockPhotos || [];
});

const pending = computed(() => !mainSlider.value);

// track which image indexes have loaded
const loaded = ref([]);

// Use watch to re-initialize the loaded array whenever images changes
watch(
  images,
  (newImages) => {
    // Initialize loaded array with 'false' for every image
    loaded.value = new Array(newImages.length).fill(false);
  },
  { immediate: true } // Run immediately to initialize if images has data on first run
);

// mark index loaded
const markLoaded = (idx) => {
  // Ensure the assignment triggers reactivity
  // This is safe now because 'loaded' is pre-initialized via the watch.
  loaded.value[idx] = true;
};

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

  /* Slider Wrapper */
  .image-wrapper {
    width: 100%;
    height: 90vh;
    max-height: 90vh;
    aspect-ratio: 21 / 9;
    position: relative;
    overflow: hidden;
    border-radius: 14px;
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

  /* Skeleton - clean gray */
  .skeleton-item {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 14px;

    background: #d1d1d1;
    transition: opacity 0.4s ease;
    z-index: 2;
  }

  .image-wrapper .fade-in + .skeleton-item {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
