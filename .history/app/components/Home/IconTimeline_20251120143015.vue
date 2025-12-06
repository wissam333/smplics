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

// 2. Reactive state to hold the currently displayed text.
const defaultText =
  "Hover over an icon to see the corresponding step description!";
const hoverText = ref(defaultText);

// 3. Functions to handle the hover events.
const handleMouseEnter = (text) => {
  hoverText.value = text;
};

const handleMouseLeave = () => {
  // Reset text to default when leaving the main container area
  hoverText.value = defaultText;
};
</script>

<template>
  <div class="col-lg-6 mx-auto my-5">
    <div class="timeline-container" @mouseleave="handleMouseLeave">
      <div class="timeline-text-display">
        <p class="h5 text-center p-3 mb-0">{{ hoverText }}</p>
      </div>

      <div class="timeline-line"></div>

      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        :class="['timeline-circle', `circle-${index + 1}`]"
        @mouseenter="handleMouseEnter(item.text)"
      >
        <Icon :name="item.icon" class="timeline-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 🚨 FIX: Import SASS Math Module to enable math.div()
@use "sass:math";

// 1. SCSS Variables
$primary-color: #007bff;
$accent-color: #ffc107;
$line-color: #e0e0e0;
$circle-size: 50px;
$text-size: 150px;

// Define the radius of the main circular line
$timeline-radius: 200px;
$container-size: ($timeline-radius * 2) + $circle-size;

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
  border: 4px solid $accent-color;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  transition: all 0.5s ease;

  p {
    color: $primary-color;
    font-weight: bold;
    font-size: 0.9rem;
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
  border: 8px solid $line-color;
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

// --- The Icon Circles ---
.timeline-circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  background-color: $primary-color;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: $accent-color;
    transform: scale(1.2);
    box-shadow: 0 0 15px $accent-color;
  }
}

// --- Positioning Logic using SCSS Loops (Trigonometry) ---

$num-circles: 6;
// FIX: Use math.div() for SASS calculation
$angle-increment: math.div(360deg, $num-circles);

@for $i from 1 through $num-circles {
  .circle-#{$i} {
    $angle: $angle-increment * ($i - 1);

    // Calculate the pixel displacement from the center.
    // NOTE: Use math.cos() and math.sin() since we are using the imported 'sass:math' module.
    $x-offset: $timeline-radius * math.cos($angle);
    $y-offset: $timeline-radius * math.sin($angle);

    // Use CSS calc() to combine the relative (50%) and absolute (px) units.
    left: calc(50% + #{$x-offset} - (#{$circle-size} / 2));
    top: calc(50% + #{$y-offset} - (#{$circle-size} / 2));
  }
}
</style>
