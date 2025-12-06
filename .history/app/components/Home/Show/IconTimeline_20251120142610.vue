<script setup>
import { ref } from "vue";

// 1. Data for the timeline icons and the corresponding descriptions.
// You'll use the 'id' to map the hovered icon to the description.
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
  // Revert to default text when the mouse leaves the line area
  hoverText.value = defaultText;
};
</script>

<template>
  <div class="col-lg-6 mx-auto my-5">
    <div class="timeline-container" @mouseleave="handleMouseLeave">
      <div class="timeline-text-display">
        <p class="h5 text-center p-3 mb-0">{{ hoverText }}</p>
      </div>

      <div
        class="timeline-line d-flex justify-content-between align-items-center"
      >
        <div
          v-for="item in timelineItems"
          :key="item.id"
          class="timeline-circle"
          @mouseenter="handleMouseEnter(item.text)"
        >
          <i :class="['bi', item.icon, 'timeline-icon']"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Import Bootstrap icons
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");

// 1. SCSS Variables (Cool feature: Use a custom primary color)
$primary-color: #007bff; // Bootstrap Primary
$accent-color: #ffc107; // A cool, vibrant yellow/orange
$line-color: #e0e0e0;
$circle-size: 50px;
$text-size: 150px; // Size of the center text display circle

.timeline-container {
  position: relative;
  padding-top: $circle-size / 2; // Create space above the line for the text circle
  padding-bottom: $circle-size / 2;
  margin-top: $circle-size;
}

// --- The Main Line with a subtle shadow effect ---
.timeline-line {
  position: relative;
  width: 100%;
  height: 8px;
  background: $line-color;
  border-radius: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); // Cool 3D effect
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
  position: relative;
  z-index: 2; // Keep circles on top of the line
  transition: transform 0.3s ease, background-color 0.3s ease;

  // COOL FEATURE: Grow and glow on hover
  &:hover {
    background-color: $accent-color;
    transform: scale(1.2);
    box-shadow: 0 0 15px $accent-color;
  }
}

.timeline-icon {
  // Use Bootstrap Icons (Ensure you've installed or linked them)
}

// --- The Center Text Display Circle ---
.timeline-text-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // Center it precisely
  width: $text-size;
  height: $text-size;
  border-radius: 50%;
  background-color: white;
  border: 4px solid $accent-color; // Use accent color for the border
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3; // Ensure it's on top of everything
  transition: all 0.5s ease;

  p {
    color: $primary-color;
    font-weight: bold;
    font-size: 0.9rem; // Adjust font size for the circle
  }
}
</style>
