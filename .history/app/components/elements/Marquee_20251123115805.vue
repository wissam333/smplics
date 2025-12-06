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
      class="marquee-track"
      :class="{ 'vertical-track': vertical, 'horizontal-track': !vertical }"
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
    default: "2rem",
  },
});

const pauseOnHover = props.pauseOnHover;

const pauseThis = (e) => {
  const container = e.currentTarget;
  const tracks = container.querySelectorAll(".marquee-track");
  tracks.forEach((track) => {
    track.style.animationPlayState = "paused";
  });
};

const resumeThis = (e) => {
  const container = e.currentTarget;
  const tracks = container.querySelectorAll(".marquee-track");
  tracks.forEach((track) => {
    track.style.animationPlayState = "running";
  });
};
</script>

<style scoped>
.marquee-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  --duration: 40s;
  --gap: 2rem;
}

.marquee-track {
  display: flex;
  flex-shrink: 0;
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.horizontal-track {
  flex-direction: row;
  animation-name: scrollHorizontal;
  gap: var(--gap);
}

.vertical-track {
  flex-direction: column;
  animation-name: scrollVertical;
  gap: var(--gap);
  height: max-content;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
}

.horizontal-track .marquee-content {
  flex-direction: row;
  gap: var(--gap);
}

.vertical-track .marquee-content {
  flex-direction: column;
  gap: var(--gap);
}

/* Horizontal scroll animation */
@keyframes scrollHorizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

/* Vertical scroll animation */
@keyframes scrollVertical {
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
  background: linear-gradient(to right, #121212, transparent);
}

.vignette.right {
  right: 0;
  background: linear-gradient(to left, #121212, transparent);
}

.marquee-container.vertical .vignette {
  width: 100%;
  height: 4rem;
}

.marquee-container.vertical .vignette.left {
  top: 0;
  background: linear-gradient(to bottom, #121212, transparent);
}

.marquee-container.vertical .vignette.right {
  bottom: 0;
  top: auto;
  background: linear-gradient(to top, #121212, transparent);
}
</style>