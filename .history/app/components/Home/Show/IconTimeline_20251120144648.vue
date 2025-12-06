<script setup>
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
    <h2 class="text-center mb-10 text-xl font-semibold text-dark">
      Project Development Timeline
    </h2>
    <div class="timeline-container" @mouseleave="handleMouseLeaveContainer">
      <div class="timeline-text-display">
        <p :class="['h5 text-center p-3 mb-0', { 'is-fading': isFading }]">
          {{ hoverText }}
        </p>
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

// 1. SCSS Variables (Light Theme, Black/White Focus)
$secondary-color: #f0f0f0; // Soft Gray (Circle Base Background)
$accent-color: #000000; // 🚨 Black (Accent/Glow Color)
$line-color: #e0e0e0; // Subtle light gray for the ring
$light-bg-color: #ffffff; // 🚨 PURE WHITE Background
$text-color-dark: #343a40; // Dark text for high contrast (Deep Gray)

$circle-size: 50px;
$text-size: 180px;
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
  // Center background is black
  background-color: $accent-color;

  // Border is black (accent)
  border: 4px solid $accent-color;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  transition: all 0.5s ease;

  p {
    // Text is white
    color: $light-bg-color;
    font-weight: 600;
    font-size: 1rem;

    // 🚨 CSS for the fade transition
    transition: opacity 0.2s ease-in-out;
    opacity: 1;

    &.is-fading {
      opacity: 0;
    }
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
  // Circle background is black (accent)
  background-color: $accent-color;
  display: flex;
  justify-content: center;
  align-items: center;
  // Icon color is white
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
    // Circle background turns white
    background-color: $light-bg-color;
    transform: scale(1.05);
    // Glow matching the accent color (black in this case, but using an intense shadow)
    border: 1px solid $accent-color; // Black inner border
    // Icon turns black
    color: $accent-color;
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
