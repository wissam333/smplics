<template>
  <div
    class="marquee-container"
    :class="{ vertical: vertical }"
    @mouseover="pauseOnHover ? pauseThis($event) : null"
    @mouseleave="pauseOnHover ? resumeThis($event) : null"
  >
    <!-- Left vignette -->
    <div class="vignette left"></div>

    <!-- Marquee wrapper -->
    <div
      class="marquee-track"
      :class="{ 'vertical-track': vertical, 'horizontal-track': !vertical }"
      :style="{
        animationDirection: reverse ? 'reverse' : 'normal',
        animationDuration: duration,
        gap: gap
      }"
    >
      <div class="marquee-content" :style="{ gap: gap }">
        <slot />
      </div>
      <div class="marquee-content" :style="{ gap: gap }" aria-hidden="true">
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
}

.marquee-track {
  display: flex;
  flex-shrink: 0;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.horizontal-track {
  flex-direction: row;
  animation-name: scrollHorizontal;
}

.vertical-track {
  flex-direction: column;
  animation-name: scrollVertical;
  height: max-content;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
}

.horizontal-track .marquee-content {
  flex-direction: row;
}

.vertical-track .marquee-content {
  flex-direction: column;
}

/* Animations */
@keyframes scrollHorizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollVertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

/* Vignettes */
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