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

// 2. Reactive state for text and active icon ID.
const defaultText =
  "Hover over an icon to see the corresponding step description!";
const hoverText = ref(defaultText);
const activeId = ref(null); 

// 3. Functions to handle the hover events.
const handleMouseEnter = (item) => {
  hoverText.value = item.text;
  activeId.value = item.id; 
};

const handleMouseLeaveContainer = () => {
  // Reset text and visual state only when leaving the entire container
  hoverText.value = defaultText;
  activeId.value = null;
};
</script>

<template>
  <div class="col-lg-8 mx-auto my-8 p-6 section-bg dark-theme-context">
    <h2 class="text-center mb-10 text-xl font-semibold text-white">Project Development Timeline</h2>
    <div class="timeline-container" @mouseleave="handleMouseLeaveContainer">
      <div class="timeline-text-display">
        <p class="h5 text-center p-3 mb-0">{{ hoverText }}</p>
      </div>

      <div class="timeline-line"></div>

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

// 1. SCSS Variables - PURE BLACK/WHITE DARK THEME PALETTE
$primary-color: #00878a;     // Muted Cyan/Teal (Icon Circle Base Color)
$accent-color: #64ffda;      // Neon Mint Green (High Contrast Glow/Active Color)
$line-color: #1c3641;        // Dark, deep secondary color (The main ring)
$dark-bg-color: #000000;     // 🚨 PURE BLACK Background
$container-bg-color: #0a0a0a; // Slightly lighter black for the component area
$text-color: #ffffff;        // 🚨 PURE WHITE Text

$circle-size: 60px;
$text-size: 180px;
$timeline-radius: 200px;
$container-size: ($timeline-radius * 2) + $circle-size;

.dark-theme-context {
    background-color: $dark-bg-color; // Pure Black page context
    color: $text-color; // Default text color is White
}

.section-bg {
    background-color: $container-bg-color; // Component background (slightly off-black)
    border-radius: 1rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8); // Adjusted shadow for black context
}

.timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
}

// --- The Center Text Display Circle ---
.timeline-text-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $text-size;
  height: $text-size;
  border-radius: 50%;
  background-color: $container-bg-color; // Slightly off-black background for the display area
  
  // Use a bright glow for the border against the dark background
  border: 2px solid $accent-color; 
  box-shadow: 0 0 10px rgba($accent-color, 0.5), inset 0 0 5px rgba($accent-color, 0.2);
  
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  transition: all 0.5s ease;

  p {
    // White text color for high contrast
    color: $text-color; 
    font-weight: 600;
    font-size: 1rem; 
  }
}

// --- The Main Circular Line (Decorative Ring) ---
.timeline-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $timeline-radius * 2;
  height: $timeline-radius * 2;
  // Dark, deep line color
  border: 6px solid $line-color; 
  border-radius: 50%;
  // Minimal inner shadow for subtle definition
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6); 
  z-index: 1;
}

// --- The Icon Circles ---
.timeline-circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  // Muted primary color for the circle background
  background-color: $primary-color; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: $text-color; // White icons on dark background
  font-size: 1.75rem; 
  cursor: pointer;
  position: absolute;
  z-index: 2;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  
  // Subtle outer shadow in normal state
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); 

  // Visual state for hover and active
  &:hover,
  &.is-active { 
    // Accent color for the active state
    background-color: $accent-color; 
    transform: scale(1.15); 
    // Powerful neon glow!
    box-shadow: 0 0 25px rgba($accent-color, 0.8), 0 0 8px $accent-color; 
    border: 3px solid $primary-color; // Border in muted primary color to give depth
    color: $dark-bg-color; // Icon changes to black/dark for contrast
  }
}

// --- Positioning Logic using SCSS Loops (Trigonometry) ---
$num-circles: 6;
$angle-increment: math.div(360deg, $num-circles);

@for $i from 1 through $num-circles {
  .circle-#{$i} {
    $angle: $angle-increment * ($i - 1);
    
    $x-offset: $timeline-radius * math.cos($angle);
    $y-offset: $timeline-radius * math.sin($angle);
    
    left: calc(50% + #{$x-offset} - (#{$circle-size} / 2));
    top: calc(50% + #{$y-offset} - (#{$circle-size} / 2));
  }
}
</style>