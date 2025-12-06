<template>
  <div
    class="marquee-container"
    :class="{ vertical: vertical }"
    @mouseover="pauseOnHover ? pauseThis($event) : null"
    @mouseleave="pauseOnHover ? resumeThis($event) : null"
  >
    <!-- Left vignette -->
    <div class="vignette left"></div>

    <!-- Marquee content -->
    <div class="marquee-track" :class="{ 'vertical-track': vertical, 'horizontal-track': !vertical }">
      <div 
        class="marquee-content"
        :style="marqueeStyles"
      >
        <slot />
        <slot v-if="seamlessLoop" />
      </div>
    </div>

    <!-- Right vignette -->
    <div class="vignette right"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  reverse: {
    type: Boolean,
    default: false
  },
  pauseOnHover: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  duration: {
    type: String,
    default: "40s"
  },
  gap: {
    type: String,
    default: "0rem"
  },
  seamlessLoop: {
    type: Boolean,
    default: true
  }
});

const pauseOnHover = props.pauseOnHover;

const marqueeStyles = computed(() => {
  const styles = {
    '--duration': props.duration,
    '--gap': props.gap,
    'animation-direction': props.reverse ? 'reverse' : 'normal'
  }
  
  if (props.seamlessLoop) {
    styles['--content-width'] = 'auto'
  }
  
  return styles
})

const pauseThis = (e) => {
  const container = e.currentTarget;
  container.querySelectorAll(".marquee-content").forEach((w) => {
    w.style.animationPlayState = "paused";
  });
};

const resumeThis = (e) => {
  const container = e.currentTarget;
  container.querySelectorAll(".marquee-content").forEach((w) => {
    w.style.animationPlayState = "running";
  });
};
</script>

<style scoped>
.marquee-container {
  display: flex;
  overflow: hidden;
  padding: 0.5rem;
  gap: 0;
  position: relative;
  width: 100%;
}

.marquee-container.vertical {
  flex-direction: column;
  height: 100%;
}

.marquee-track {
  display: flex;
  width: 100%;
  height: 100%;
}

.horizontal-track {
  flex-direction: row;
}

.vertical-track {
  flex-direction: column;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  align-items: center;
  gap: var(--gap, 1rem);
  animation-duration: var(--duration, 40s);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  min-width: max-content;
}

.horizontal-track .marquee-content {
  flex-direction: row;
  animation-name: marquee-horizontal-seamless;
}

.vertical-track .marquee-content {
  flex-direction: column;
  animation-name: marquee-vertical-seamless;
}

/* Seamless horizontal animation */
@keyframes marquee-horizontal-seamless {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - var(--gap) / 2));
  }
}

/* Seamless vertical animation */
@keyframes marquee-vertical-seamless {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-50% - var(--gap) / 2));
  }
}

/* Alternative: For non-seamless loop (if needed) */
@keyframes marquee-horizontal-classic {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical-classic {
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
  background: linear-gradient(to right, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.8) 50%, transparent 100%);
}

.vignette.right {
  right: 0;
  background: linear-gradient(to left, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.8) 50%, transparent 100%);
}

/* Vertical vignettes */
.marquee-container.vertical .vignette {
  width: 100%;
  height: 3rem;
}

.marquee-container.vertical .vignette.left {
  top: 0;
  background: linear-gradient(to bottom, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.8) 50%, transparent 100%);
}

.marquee-container.vertical .vignette.right {
  bottom: 0;
  top: auto;
  background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.8) 50%, transparent 100%);
}

/* Performance optimizations */
.marquee-content {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .marquee-content {
    animation-duration: 80s !important;
  }
}
</style>