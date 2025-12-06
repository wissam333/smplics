<template>
  <div
    class="marquee-container"
    :class="{ vertical: vertical }"
    @mouseover="pauseOnHover ? pauseThis($event) : null"
    @mouseleave="pauseOnHover ? resumeThis($event) : null"
  >
    <!-- Left vignette -->
    <div class="vignette left"></div>

    <!-- Single marquee wrapper for ring loop -->
    <div
      class="marquee-wrapper"
      :class="{ 'vertical-wrapper': vertical, 'horizontal-wrapper': !vertical }"
      :style="{ animationDirection: reverse ? 'reverse' : 'normal' }"
    >
      <slot />
      <!-- Duplicate content for seamless loop (only once) -->
      <div v-if="!vertical" class="duplicate-content">
        <slot />
      </div>
    </div>

    <!-- Right vignette -->
    <div class="vignette right"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  reverse: {
    type: Boolean,
    default: false,
  },
  pauseOnHover: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
    default: "40s",
  },
  gap: {
    type: String,
    default: "1rem",
  },
});

const pauseOnHover = props.pauseOnHover;

const pauseThis = (e) => {
  const container = e.currentTarget;
  container.querySelectorAll(".marquee-wrapper").forEach((w) => {
    w.style.animationPlayState = "paused";
  });
};

const resumeThis = (e) => {
  const container = e.currentTarget;
  container.querySelectorAll(".marquee-wrapper").forEach((w) => {
    w.style.animationPlayState = "running";
  });
};
</script>

<style scoped>
.marquee-container {
  display: flex;
  overflow: hidden;
  padding: 0.5rem;
  gap: var(--gap, 1rem);
  --duration: 40s;
  --gap: 1rem;
  position: relative; /* required for absolute vignette */
}

.marquee-container.vertical {
  flex-direction: column;
  height: 100vh; /* You might want to set a specific height for vertical */
}

.marquee-wrapper {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  gap: var(--gap, 1rem);
  animation-duration: var(--duration, 40s);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  width: max-content; /* Important for horizontal ring loop */
}

.horizontal-wrapper {
  flex-direction: row;
  animation-name: marquee-horizontal-ring;
}

.vertical-wrapper {
  flex-direction: column;
  animation-name: marquee-vertical-ring;
  height: max-content; /* Important for vertical ring loop */
}

.duplicate-content {
  display: contents; /* The children will be part of the flex container */
}

/* Horizontal Ring Loop Animation */
@keyframes marquee-horizontal-ring {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - (var(--gap) / 2)));
  }
}

/* Vertical Ring Loop Animation */
@keyframes marquee-vertical-ring {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-50% - (var(--gap) / 2)));
  }
}

/* Vignette styles */
.vignette {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3rem; /* width of the shadow */
  pointer-events: none; /* allow clicks to pass through */
  z-index: 10;
}

.vignette.left {
  left: 0;
  background: linear-gradient(to right, rgb(18 18 18), transparent);
}

.vignette.right {
  right: 0;
  background: linear-gradient(to left, rgb(18 18 18), transparent);
}
</style>