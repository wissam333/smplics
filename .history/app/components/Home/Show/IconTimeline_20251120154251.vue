<template>
  <div class="mx-auto my-8 p-6 section-bg light-theme-context">
    <div class="timeline-container" @mouseleave="handleMouseLeaveContainer">
      <div class="timeline-text-display">
        <!-- Using Bootstrap's text utilities and the fade class -->
        <p :class="['h5 text-center p-3 mb-0', { 'is-fading': isFading }]">
          {{ hoverText }}
        </p>
      </div>

      <!-- Main Decorative Ring -->
      <div class="timeline-line"></div>

      <!-- Outer Animated Line (STATIC 3D ORBIT) and Bullet (ANIMATED) -->
      <div class="animated-line-1">
        <div class="moving-bullet-1"></div>
      </div>

      <!-- Inner Animated Line (STATIC 3D ORBIT) and Bullet (ANIMATED) -->
      <div class="animated-line-2">
        <div class="moving-bullet-2"></div>
      </div>

      <!-- Timeline Icon Circles -->
      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        :class="[
          'timeline-circle',
          `circle-${item.id}`, // Using item.id for circle-1, circle-2 etc.
          { 'is-active': activeId === item.id },
        ]"
        @mouseenter="handleMouseEnter(item)"
      >
        <!-- Assuming Nuxt Icon component is available -->
        <Icon :name="item.icon" class="timeline-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // Import ref explicitly for setup script environment

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

<style lang="scss" scoped>
@use "sass:math";

// 1. SCSS Variables (Light Theme, Black/White Focus)
$accent-color: #000000; // Black (Accent/Glow Color)
$line-color: #ababab; // Subtle light gray for the ring
$light-bg-color: #ffffff; // PURE WHITE Background

$circle-size: 50px;
$text-size: 180px;
$timeline-radius: 200px; // Radius for the main line

// Radii for the animated lines
$anim-line-1-radius: $timeline-radius + 40px; // Outer line (240px)
$anim-line-2-radius: $timeline-radius - 40px; // Inner line (160px)
$bullet-size: 8px;

// Update container size to comfortably fit the outermost ring
$container-size: ($anim-line-1-radius * 2) + $circle-size; 

// --- Keyframes for the Animation (Rotation is the same) ---
@keyframes spin-clockwise {
    to {
        // Rotates around the Z-axis (local to the element's plane)
        transform: rotate(360deg); 
    }
}

@keyframes spin-counter-clockwise {
    to {
        // Rotates around the Z-axis (local to the element's plane)
        transform: rotate(-360deg);
    }
}

.timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
  
  // ----------------------------------------------------
  // 3D Setup: Defines the viewing distance and ensures nested transforms work
  perspective: 1000px; 
  transform-style: preserve-3d;
  // ----------------------------------------------------
}

// --- The Center Text Display Circle (Unchanged) ---
.timeline-text-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  z-index: 3;
  transition: all 0.5s ease;

  p {
    color: $light-bg-color;
    font-size: 1rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;

    &.is-fading {
      opacity: 0;
    }
  }
}

// --- The Main Circular Line (Decorative Ring) (Tilted Plane) ---
.timeline-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: $timeline-radius * 2;
  height: $timeline-radius * 2;
  border: 2px solid $line-color;
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 1;
  
  // Custom 3D tilt for this plane
  // Keep this line static or add a very slow rotation if desired
  transform: translate(-50%, -50%) rotateX(5deg); 
}

// --- Animated Lines (ROTATING ORBITS with distinct 3D rotations) ---

.animated-line-1,
.animated-line-2 {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    // The visual ring is here (STATIC)
    border: 1px dotted rgba($accent-color, 0.3); 
    z-index: 0; 
}

// Line 1: Outer Ring - Stronger X-tilt, now spinning slowly
.animated-line-1 {
    width: $anim-line-1-radius * 2;
    height: $anim-line-1-radius * 2;
    // Apply 3D tilt, then the slow Z-axis rotation for the path itself
    transform: translate(-50%, -50%) rotateX(30deg); 
    animation: spin-clockwise 120s linear infinite; 
}

// Line 2: Inner Ring - Y-axis rotation for cross-plane look, now spinning slowly
.animated-line-2 {
    width: $anim-line-2-radius * 2;
    height: $anim-line-2-radius * 2;
    // Apply 3D tilt, then the slow Z-axis rotation for the path itself
    transform: translate(-50%, -50%) rotateY(60deg);
    animation: spin-counter-clockwise 100s linear infinite;
}

// Base styles for the bullets (Animation added here)
.moving-bullet-1,
.moving-bullet-2 {
    width: $bullet-size;
    height: $bullet-size;
    border-radius: 50%;
    background-color: $accent-color;
    position: absolute;
    
    // Position bullet at the top edge of the static line container
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%); 
    box-shadow: 0 0 5px $accent-color;
}

// Bullet 1: Outer Ring - Slower, Clockwise (Bullet orbiting its parent plane)
.moving-bullet-1 {
    // Rotation pivot is centered in the main timeline, at the distance of the line's radius
    transform-origin: 50% $anim-line-1-radius; 
    // The bullet is rotating much faster than the plane it sits on
    animation: spin-clockwise 20s linear infinite; 
}

// Bullet 2: Inner Ring - Faster, Counter-Clockwise (Bullet orbiting its parent plane)
.moving-bullet-2 {
    // Rotation pivot is centered in the main timeline, at the distance of the line's radius
    transform-origin: 50% $anim-line-2-radius;
    // The bullet is rotating much faster than the plane it sits on
    animation: spin-counter-clockwise 15s linear infinite;
}

// --- The Icon Circles (Unchanged in style, but now inherit parent 3D tilt) ---
.timeline-circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  background-color: $accent-color;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $light-bg-color;
  font-size: 1.75rem;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  // Visual state for hover and active
  &:hover,
  &.is-active {
    background-color: $light-bg-color;
    transform: scale(1.05);
    border: 1px solid $accent-color; // Black inner border
    color: $accent-color;
  }
}

// --- Positioning Logic (Trigonometry) (Unchanged) ---
$num-circles: 6;
$angle-increment: math.div(360deg, $num-circles);

// The icon circles remain positioned on the main $timeline-radius ring
@for $i from 1 through $num-circles {
  .circle-#{$i} {
    // Start at the 12 o'clock position (90 degrees offset from standard math)
    $angle: $angle-increment * ($i - 1) - 90deg; 

    $x-offset: $timeline-radius * math.cos($angle);
    $y-offset: $timeline-radius * math.sin($angle);

    left: calc(50% + #{$x-offset} - (#{$circle-size} / 2));
    top: calc(50% + #{$y-offset} - (#{$circle-size} / 2));
  }
}
</style>