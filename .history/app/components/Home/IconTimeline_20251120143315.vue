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
const activeId = ref(null); // New state to track the active (last hovered) icon ID

// 3. Functions to handle the hover events.
const handleMouseEnter = (item) => {
  hoverText.value = item.text;
  activeId.value = item.id; // Set the active ID
};

const handleMouseLeaveContainer = () => {
  // Reset text and visual state only when leaving the entire container
  hoverText.value = defaultText;
  activeId.value = null;
};
</script>

<template>
  <!-- Added subtle background to the overall section for better contrast -->
  <div class="col-lg-8 mx-auto my-8 p-6 section-bg">
    <h2 class="text-center mb-10 text-xl font-semibold text-gray-700">Project Development Timeline</h2>
    <!-- Attach mouseleave handler to the container to reset state -->
    <div class="timeline-container" @mouseleave="handleMouseLeaveContainer">
      <div class="timeline-text-display">
        <!-- Text color defined in SCSS -->
        <p class="h5 text-center p-3 mb-0">{{ hoverText }}</p>
      </div>

      <div class="timeline-line"></div>

      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        :class="[
          'timeline-circle',
          `circle-${index + 1}`,
          // Conditionally apply 'is-active' class based on state
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
// 🚨 FIX: Import SASS Math Module to enable math.div()
@use "sass:math";

// 1. SCSS Variables - NEW MODERN PALETTE
$primary-color: #1a535c;   // Deep Teal (Main circle background, Text color)
$accent-color: #4ecdc4;   // Bright Cyan (Active color, Glow, Border)
$line-color: #ced4da;     // Subtle Gray/Blue (Line color)
$background-color: #f8f9fa; // Very subtle off-white background

$circle-size: 60px; // Slightly larger circles for better touch targets
$text-size: 180px;  // Slightly larger center display

// Define the radius of the main circular line
$timeline-radius: 200px;
$container-size: ($timeline-radius * 2) + $circle-size;

.section-bg {
    background-color: $background-color;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  background-color: white;
  // Accent color for the border
  border: 5px solid $accent-color; 
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); // Stronger, cleaner shadow
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  transition: all 0.5s ease;

  p {
    // Primary color for the text
    color: $primary-color; 
    font-weight: 600; // Semi-bold for clarity
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
  // Subtle line color
  border: 6px solid $line-color; 
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

// --- The Icon Circles ---
.timeline-circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  // Primary color for the circle background
  background-color: $primary-color; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.75rem; // Slightly larger icon size
  cursor: pointer;
  position: absolute;
  z-index: 2;
  // Added smoother transition for box-shadow
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;

  // Visual state for hover and active
  &:hover,
  &.is-active { 
    // Accent color for the active state
    background-color: $accent-color; 
    transform: scale(1.15); // Slightly less scale for smoother look
    // Vivid glow matching the accent color
    box-shadow: 0 0 20px $accent-color, 0 0 8px rgba(0, 0, 0, 0.3); 
    border: 3px solid white; // White inner border for extra pop
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