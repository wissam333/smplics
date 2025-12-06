<script setup>
import { ref } from "vue";

// Data remains the same...
const timelineItems = [
  {
    id: 1,
    icon: "mdi:lightbulb-on-outline",
    text: "💡 Idea Generation: Starting with a spark of creativity and a core concept.",
  },
  {
    id: 2,
    icon: "mdi:tools",
    text: "🛠️ Planning & Tools: Structuring the project and selecting the right tech stack.",
  },
  {
    id: 3,
    icon: "mdi:code-braces",
    text: "💻 Development Sprint: Coding the features and building the foundation.",
  },
  {
    id: 4,
    icon: "mdi:bug",
    text: "🔍 Testing & Quality: Thoroughly checking for bugs and ensuring reliability.",
  },
  {
    id: 5,
    icon: "mdi:rocket-launch-outline",
    text: "🚀 Final Launch: Deploying the application to the production environment.",
  },
  {
    id: 6,
    icon: "mdi:chart-line",
    text: "📈 Analysis & Growth: Monitoring performance and planning future updates.",
  },
];

// Reactive state and logic for fading text remains the same...
const defaultText =
  "Hover over an icon to see the corresponding step description!";
const hoverText = ref(defaultText);
const activeId = ref(null);
const isFading = ref(false); // State to control the fade animation
const TRANSITION_DURATION = 200; // Time in milliseconds for the fade effect

const handleMouseEnter = (item) => {
  if (hoverText.value !== item.text) {
    isFading.value = true;
    setTimeout(() => {
      hoverText.value = item.text;
      activeId.value = item.id;
      isFading.value = false;
    }, TRANSITION_DURATION);
  } else {
    activeId.value = item.id;
  }
};

const handleMouseLeaveContainer = () => {
  if (hoverText.value !== defaultText) {
    isFading.value = true;
    setTimeout(() => {
      hoverText.value = defaultText;
      activeId.value = null;
      isFading.value = false;
    }, TRANSITION_DURATION);
  } else {
    activeId.value = null; 
  }
};
</script>

<template>
  <div class="col-lg-8 mx-auto my-8 p-6 section-bg light-theme-context">
    <h2 class="text-center mb-10 text-xl font-semibold text-dark">Project Development Timeline</h2>
    
    <div class="timeline-container" @mouseleave="handleMouseLeaveContainer">
      <div class="timeline-text-display">
        <p :class="['h5 text-center p-3 mb-0', { 'is-fading': isFading }]">
          {{ hoverText }}
        </p>
      </div>

      <div class="timeline-orbit orbit-main"></div>
      
      <div class="timeline-orbit orbit-1"></div>
      <div class="timeline-orbit orbit-2"></div>

      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        :class="[
          'timeline-circle',
          `circle-${index + 1}`,
          { 'is-active': activeId === item.id },
        ]"
        @mouseenter="handleMouseEnter(item)"
      >
        <Icon :name="item.icon" class="timeline-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";

// 1. SCSS Variables (Light Theme, Black/White Focus)
$accent-color: #000000;       // Black 
$light-bg-color: #ffffff;     // PURE WHITE Background
$secondary-color: #f0f0f0;    // Soft Gray for inactive circles 

$circle-size: 50px;
$text-size: 180px;
$timeline-radius: 200px; // Radius for the orbital lines
$container-size: ($timeline-radius * 2) + $circle-size;

// Animation Variables
$orbit-duration-main: 25s; // Slow spin for the main path
$orbit-duration-decor-1: 18s; 
$orbit-duration-decor-2: 20s;
$electron-distance: $timeline-radius; 

// Keyframe for the general orbit spin
@keyframes orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

// Keyframe for the electron path (fixed distance on the main path)
@keyframes electron-path {
  from { transform: rotate(0deg) translateX($electron-distance) rotate(-0deg); }
  to { transform: rotate(360deg) translateX($electron-distance) rotate(-360deg); }
}

.timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
  transform-style: preserve-3d; 
  perspective: 1000px; 
}

// --- The Center Nucleus (Text Display) ---
.timeline-text-display {
  // ... (Visual styles remain the same)
  background-color: $accent-color; 
  border: 4px solid $accent-color; 
  z-index: 3;
}

// --- The Orbital Rings ---
.timeline-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  width: $timeline-radius * 2;
  height: $timeline-radius * 2;
  border: 1px solid $accent-color; 
  border-radius: 50%;
  z-index: 1;
  transform-style: preserve-3d;
  
  // Apply the general orbit spin animation
  animation-name: orbit-spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

// Main Orbit (Flat, aligns with circles' movement)
.orbit-main {
  animation-duration: $orbit-duration-main;
  // No complex transform, just flat rotation
  transform: translate(-50%, -50%); 
}

// Decorative Orbit 1 (Tilted plane, faster, reversed)
.orbit-1 {
  animation-duration: $orbit-duration-decor-1;
  animation-direction: reverse;
  transform: translate(-50%, -50%) rotateX(60deg) rotateY(10deg); 
}

// Decorative Orbit 2 (Heavily tilted plane)
.orbit-2 {
  animation-duration: $orbit-duration-decor-2;
  transform: translate(-50%, -50%) rotateX(70deg); 
}

// --- The Icon Circles (Electrons) ---
.timeline-circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  background-color: $accent-color; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: $light-bg-color; 
  font-size: 1.5rem; 
  cursor: pointer;
  
  // Positioned at the center, ready for animation
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transition: all 0.3s ease;
  
  // Apply the main path animation
  animation-name: electron-path;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 

  // Visual state for hover and active
  &:hover,
  &.is-active { 
    background-color: $light-bg-color; 
    transform: scale(1.05); 
    box-shadow: 0 0 20px rgba($accent-color, 0.8), 0 0 8px $accent-color; 
    border: 3px solid $accent-color; 
    color: $accent-color; 
  }
}

// Positioning the 6 circles evenly on the main path animation
$num-circles: 6;
$time-offset: calc(#{$orbit-duration-main} / #{$num-circles});

@for $i from 1 through $num-circles {
  .circle-#{$i} {
    animation-duration: $orbit-duration-main;
    // Each circle is offset by a fraction of the total animation time
    animation-delay: calc(#{$time-offset} * (#{$i} - 1) * -1);
  }
}
</style>