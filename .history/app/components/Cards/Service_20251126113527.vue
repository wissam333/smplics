<template>
  <div class="service-card">
    <NuxtLink :to="`/our-services/${item.id}`" class="card-link">
      <!-- Image Container -->
      <div class="image-wrapper">
        <!-- 1. Skeleton (Shown while loading) -->
        <transition name="fade">
          <ElementsSkeletonLoader v-if="isLoading" class="absolute-skeleton" />
        </transition>

        <!-- 2. Actual Image -->
        <!-- We keep it in DOM but hidden to trigger the @load event -->
        <img
          :src="imageUrl"
          :alt="title"
          loading="lazy"
          :class="{ loaded: !isLoading }"
          @load="onImageLoad"
        />

        <!-- Gradient Overlay -->
        <div class="overlay"></div>
      </div>

      <!-- Text Content -->
      <div class="card-content">
        <h3>{{ title }}</h3>
        <div class="icon-indicator">
          <Icon
            :name="isRtl ? 'heroicons:arrow-left' : 'heroicons:arrow-right'"
            class="action-icon"
          />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isRtl: {
    type: Boolean,
    default: false,
  },
});

// State
const isLoading = ref(true);

// Computed
const title = computed(() =>
  props.isRtl ? props.item.name : props.item.englishName
);

const imageUrl = computed(() => {
  const path = props.item.image1;
  if (!path) return "/placeholder-image.png";
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `https://admin.nerva-online.com/${cleanPath}`;
});

// Methods
const onImageLoad = () => {
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.service-card {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #e5e7eb; // Placeholder bg
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  .card-link {
    display: block;
    width: 100%;
    height: 100%;
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .absolute-skeleton {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
      opacity: 0; // Hidden initially
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform: translateY(0); // Start at normal position

      &.loaded {
        opacity: 1; // Fade in when loaded
      }
    }

    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 60px; // Match the title height
      z-index: 2;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.4) 40%,
        transparent 100%
      );
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px; // Fixed height for title
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
    background: rgba(0, 0, 0, 0.8); // Background for better text readability
    transform: translateY(100%); // Start hidden below
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    h3 {
      color: #fff;
      font-size: 1.1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
      max-width: 85%;
      line-height: 1.2;
    }

    .icon-indicator {
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s ease; // Slight delay
      color: #f2994a;
    }
  }

  // Hover Effects
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);

    .image-wrapper {
      img {
        filter: grayscale(0%);
        transform: translateY(-60px); // Move image up by 60px
      }

      .overlay {
        opacity: 0;
      }
    }

    .card-content {
      transform: translateY(0); // Slide up to reveal title

      .icon-indicator {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

// Vue transition for skeleton fade out
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
