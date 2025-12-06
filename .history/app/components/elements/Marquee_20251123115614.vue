<template>
  <div
    class="marquee-container"
    :class="{ vertical: vertical }"
    :style="{
      '--duration': duration,
      '--gap': gap,
    }"
    @mouseover="pauseOnHover ? pauseThis($event) : null"
    @mouseleave="pauseOnHover ? resumeThis($event) : null"
  >
    <!-- Left vignette -->
    <div class="vignette left"></div>

    <!-- Marquee wrapper -->
    <div
      class="marquee-wrapper"
      :class="{ 'vertical-wrapper': vertical, 'horizontal-wrapper': !vertical }"
      :style="{ animationDirection: reverse ? 'reverse' : 'normal' }"
    >
      <div class="marquee-content">
        <slot />
      </div>
      <div class="marquee-content" aria-hidden="true">
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
  position: relative;
  width: 100%;
  --duration: 40s;
  --gap: 1rem;
}

.marquee-container.vertical {
  flex-direction: column;
  height: 500px; /* Set a specific height for vertical */
}

.marquee-wrapper {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  width: max-content;
}

.horizontal-wrapper {
  flex-direction: row;
  animation-name: marquee-horizontal;
  gap: var(--gap);
}

.vertical-wrapper {
  flex-direction: column;
  animation-name: marquee-vertical;
  height: max-content;
  gap: var(--gap);
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.horizontal-wrapper .marquee-content {
  flex-direction: row;
  gap: var(--gap);
}

.vertical-wrapper .marquee-content {
  flex-direction: column;
  gap: var(--gap);
}

/* Horizontal Animation */
@keyframes marquee-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

/* Vertical Animation */
@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% - var(--gap)));
  }
}

/* Vignette styles */
.vignette {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4rem;
  pointer-events: none;
  z-index: 10;
}

.vignette.left {
  left: 0;
  background: linear-gradient(to right, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
}

.vignette.right {
  right: 0;
  background: linear-gradient(to left, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
}

.marquee-container.vertical .vignette {
  width: 100%;
  height: 4rem;
}

.marquee-container.vertical .vignette.left {
  top: 0;
  background: linear-gradient(to bottom, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
}

.marquee-container.vertical .vignette.right {
  bottom: 0;
  top: auto;
  background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
}
</style>