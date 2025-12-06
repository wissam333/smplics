<script setup>
import { ref } from "vue";

// 1. Data for the timeline icons and the corresponding descriptions.
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

// 2. Reactive state for text, active icon ID, and the fading state.
const defaultText =
  "Hover over an icon to see the corresponding step description!";
const hoverText = ref(defaultText);
const activeId = ref(null);
const isFading = ref(false); // State to control the fade animation
const TRANSITION_DURATION = 200; // Time in milliseconds for the fade effect

// 3. Functions to handle the hover events with fade logic.
const handleMouseEnter = (item) => {
  // Only trigger fade if the text is actually changing
  if (hoverText.value !== item.text) {
    isFading.value = true;
    
    // 1. Wait for fade out, then update text
    setTimeout(() => {
      hoverText.value = item.text;
      activeId.value = item.id;
      
      // 2. Start fade in
      isFading.value = false;
    }, TRANSITION_DURATION);
  } else {
    activeId.value = item.id;
  }
};

const handleMouseLeaveContainer = () => {
  // Start fade out only if the text is not already the default text
  if (hoverText.value !== defaultText) {
    isFading.value = true;
    
    // 1. Wait for fade out, then reset text
    setTimeout(() => {
      hoverText.value = defaultText;
      activeId.value = null;
      
      // 2. Start fade in
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
      
      <div class="timeline-orbit decorative-orbit-1"></div>
      <div class="timeline-orbit decorative-orbit-2"></div>

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

// 1. SCSS Variables
$accent-color: #000000;       
$light-bg-color: #ffffff;     
$text-color-dark: #343a40;    

$circle-size: 50px;
$text-size: 180px;
$timeline-radius: 200px; 
$container-size: ($timeline-radius * 2) + $circle-size;

// Animation Variables
$orbit-duration-main: 25s; 
$orbit-duration-decor-1: 18s; 
$orbit-duration-decor-2: 20s;
$bullet-size: 8px; 

// Keyframe for the general orbit spin
@keyframes orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
  
  // 🚨 Apply the main 3D context
  transform-style: preserve-3d; 
  perspective: 1000px; 
  // Slight initial rotation to show the 3D effect immediately
  transform: rotateX(15deg) rotateY(10deg); 
  transition: transform 0.5s ease;
}

// Optional: enhance the 3D feeling on hover over the container
.timeline-container:hover {
    transform: rotateX(5deg) rotateY(3deg);
}

// --- The Center Nucleus (Text Display) ---
.timeline-text-display {
  position: absolute;
  top: 50%;
  left: 50%;
  // Ensure the nucleus stays flat relative to the screen
  transform: translate(-50%, -50%) rotateY(-10deg) rotateX(-15deg); 
  z-index: 3;
  
  // ... (other styles)
  width: $text-size;
  height: $text-size;
  border-radius: 50%;
  background-color: $accent-color; 
  border: 4px solid $accent-color; 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  
  animation-name: orbit-spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

// Main Orbit (Flat)
.orbit-main {
  animation-duration: $orbit-duration-main;
  transform: translate(-50%, -50%) rotateX(-15deg) rotateY(-10deg); 
}

// Decorative Orbit 1 (Tilted plane, faster, reversed, with bullets)
.decorative-orbit-1 {
  animation-duration: $orbit-duration-decor-1;
  animation-direction: reverse;
  transform: translate(-50%, -50%) rotateX(60deg) rotateY(10deg); 

  // BULLET 1 (using ::before) and BULLET 2 (using ::after)
  &::before, &::after {
    content: '';
    position: absolute;
    width: $bullet-size;
    height: $bullet-size;
    border-radius: 50%;
    background: $accent-color;
    box-shadow: 0 0 5px rgba($accent-color, 0.5);
    z-index: 3;
    
    transform: translateX($timeline-radius) translate(calc(-0.5 * #{$bullet-size}), calc(-0.5 * #{$bullet-size}));
    
    animation: orbit-spin $orbit-duration-decor-1 linear infinite reverse;
  }
  
  // BULLET 2 (offset by 180deg)
  &::after {
    transform: rotate(180deg) translateX($timeline-radius) translate(calc(-0.5 * #{$bullet-size}), calc(-0.5 * #{$bullet-size}));
  }
}

// Decorative Orbit 2 (Heavily tilted plane, with bullets)
.decorative-orbit-2 {
  animation-duration: $orbit-duration-decor-2;
  transform: translate(-50%, -50%) rotateX(70deg); 
  
  // BULLET 1 (using ::before) and BULLET 2 (using ::after)
  &::before, &::after {
    content: '';
    position: absolute;
    width: $bullet-size;
    height: $bullet-size;
    border-radius: 50%;
    background: $accent-color;
    box-shadow: 0 0 5px rgba($accent-color, 0.5);
    z-index: 3;
    
    transform: translateX($timeline-radius) translate(calc(-0.5 * #{$bullet-size}), calc(-0.5 * #{$bullet-size}));
    animation: orbit-spin $orbit-duration-decor-2 linear infinite;
  }
  
  &::after {
    transform: rotate(180deg) translateX($timeline-radius) translate(calc(-0.5 * #{$bullet-size}), calc(-0.5 * #{$bullet-size}));
  }
}

// --- The Icon Circles (Timeline Steps - STATICALLY POSITIONED) ---
.timeline-circle {
  // ... (Visual styles)
  z-index: 2;
  
  // To counteract the initial rotation on the container, we rotate the circle back
  // This ensures the circles appear relatively flat on the main plane.
  transform: rotateY(-10deg) rotateX(-15deg);
}

// --- Positioning Logic (Trigonometry RESTORED) ---
$num-circles: 6;
$angle-increment: math.div(360deg, $num-circles);

@for $i from 1 through $num-circles {
  .circle-#{$i} {
    $angle: $angle-increment * ($i - 1);
    
    $x-offset: $timeline-radius * math.cos($angle);
    $y-offset: $timeline-radius * math.sin($angle);
    
    // Static placement relative to the center
    left: calc(50% + #{$x-offset} - (#{$circle-size} / 2));
    top: calc(50% + #{$y-offset} - (#{$circle-size} / 2));
  }
}
</style>