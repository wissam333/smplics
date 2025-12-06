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
        <div class="content-wrapper">
          <h3 class="title">{{ title }}</h3>
          <div class="icon-indicator">
            <Icon
              :name="isRtl ? 'heroicons:arrow-left' : 'heroicons:arrow-right'"
              class="action-icon"
            />
          </div>
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
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  .card-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
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
      filter: grayscale(30%);
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform: scale(1);

      &.loaded {
        opacity: 1;
      }
    }

    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        transparent 70%
      );
      opacity: 0.7;
      transition: opacity 0.4s ease;
    }
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    z-index: 3;
    overflow: hidden;

    .content-wrapper {
      transform: translateY(100%);
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .title {
      color: #fff;
      font-size: 1.375rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
      max-width: 80%;
      line-height: 1.3;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    .icon-indicator {
      opacity: 0;
      transform: translateX(-15px) scale(0.8);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      color: #f2994a;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      padding: 0.5rem;
      backdrop-filter: blur(10px);

      .action-icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  // Hover Effects
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2),
      0 10px 10px -5px rgba(0, 0, 0, 0.1);

    .image-wrapper {
      img {
        filter: grayscale(0%);
        transform: scale(1.08) translateY(-10px);
      }

      .overlay {
        opacity: 0.8;
      }
    }

    .card-content {
      .content-wrapper {
        transform: translateY(0);
      }

      .icon-indicator {
        opacity: 1;
        transform: translateX(0) scale(1);
        transition-delay: 0.1s;
      }
    }
  }

  // Active state for click feedback
  &:active {
    transform: translateY(-4px);
    transition-duration: 0.1s;
  }
}

// Enhanced skeleton loader animation
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}

// Responsive adjustments
@media (max-width: 768px) {
  .service-card {
    aspect-ratio: 3/2;

    .card-content {
      padding: 1.5rem;

      .title {
        font-size: 1.125rem;
      }
    }
  }
}
</style>
