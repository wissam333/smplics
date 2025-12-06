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

    <!-- Marquee wrapper with dynamic content -->
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
  padding: 0.5rem;
  position: relative;
  --duration: 40s;
  --gap: 1rem;
}

.marquee-container.vertical {
  flex-direction: column;
  height: 100vh;
}

.marquee-wrapper {
  display: flex;
  flex-shrink: 0;
  gap: var(--gap);
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  width: max-content;
}

.horizontal-wrapper {
  flex-direction: row;
  animation-name: marquee-horizontal;
}

.vertical-wrapper {
  flex-direction: column;
  animation-name: marquee-vertical;
  height: max-content;
}

.marquee-content {
  display: flex;
  gap: var(--gap);
}

.horizontal-wrapper .marquee-content {
  flex-direction: row;
}

.vertical-wrapper .marquee-content {
  flex-direction: column;
}

/* Vignette styles */
.vignette {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3rem;
  pointer-events: none;
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

.marquee-container.vertical .vignette {
  width: 100%;
  height: 3rem;
}

.marquee-container.vertical .vignette.left {
  top: 0;
  background: linear-gradient(to bottom, rgb(18 18 18), transparent);
}

.marquee-container.vertical .vignette.right {
  bottom: 0;
  top: auto;
  background: linear-gradient(to top, rgb(18 18 18), transparent);
}

@keyframes marquee-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% - var(--gap)));
  }
}

.marquee-wrapper {
  display: flex;
  flex-shrink: 0;
  gap: var(--gap);
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.marquee-content {
  display: flex;
  gap: var(--gap);
  flex-shrink: 0;
}
</style>
