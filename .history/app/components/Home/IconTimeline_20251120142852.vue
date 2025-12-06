<script setup>
import { ref } from "vue";

// 1. Data for the timeline icons and the corresponding descriptions.
const timelineItems = [
  {
    id: 1,
    icon: "bi-lightbulb",
    text: "💡 Idea Generation: Starting with a spark of creativity and a core concept.",
  },
  {
    id: 2,
    icon: "bi-tools",
    text: "🛠️ Planning & Tools: Structuring the project and selecting the right tech stack.",
  },
  {
    id: 3,
    icon: "bi-code-slash",
    text: "💻 Development Sprint: Coding the features and building the foundation.",
  },
  {
    id: 4,
    icon: "bi-bug",
    text: "🔍 Testing & Quality: Thoroughly checking for bugs and ensuring reliability.",
  },
  {
    id: 5,
    icon: "bi-rocket-takeoff",
    text: "🚀 Final Launch: Deploying the application to the production environment.",
  },
  {
    id: 6,
    icon: "bi-bar-chart",
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
        <i :class="['bi', item.icon, 'timeline-icon']"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

// 1. SCSS Variables
$primary-color: #007bff; // Bootstrap Primary
$accent-color: #ffc107; // A cool, vibrant yellow/orange
$line-color: #e0e0e0;
$circle-size: 50px;
$text-size: 150px; // Size of the center text display circle

// Define the radius of the main circular line
$timeline-radius: 200px;
$container-size: ($timeline-radius * 2) + $circle-size;

.timeline-container {
  position: relative;
  // Set explicit dimensions to contain all absolutely positioned elements
  width: $container-size;
  height: $container-size;
  margin: 0 auto; // Center the container horizontally
}

// --- The Center Text Display Circle ---
.timeline-text-display {
  position: absolute;
  top: 50%;
  left: 50%;
  // Center it precisely based on its own dimensions
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
  z-index: 3; // On top
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
  border: 8px solid $line-color; // Creates the circular line
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
  position: absolute; // Crucial for circular layout
  z-index: 2;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;

  // COOL FEATURE: Grow and glow on hover
  &:hover {
    background-color: $accent-color;
    transform: scale(1.2);
    box-shadow: 0 0 15px $accent-color;
  }
}

// --- Positioning Logic using SCSS Loops (Trigonometry) ---

$num-circles: 6;
// Calculate the angle increment (360 degrees divided by 6 circles = 60 degrees)
$angle-increment: 360deg / $num-circles;

@for $i from 1 through $num-circles {
  .circle-#{$i} {
    // Calculate the angle for the current circle
    $angle: $angle-increment * ($i - 1);

    // Calculate X and Y coordinates using polar to Cartesian conversion:
    // x = R * cos(theta) + Center_X - (Circle_Size / 2)
    // y = R * sin(theta) + Center_Y - (Circle_Size / 2)

    $x-pos: 50% + $timeline-radius * cos($angle) - ($circle-size / 2);
    $y-pos: 50% + $timeline-radius * sin($angle) - ($circle-size / 2);

    left: $x-pos;
    top: $y-pos;
  }
}
</style>
