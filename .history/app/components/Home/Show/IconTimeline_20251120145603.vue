<template>
  <div class="mx-auto my-8 p-6 section-bg light-theme-context">
    <div class="atom-timeline-container">
      <div class="atom-text-display">
        <p :class="['h5 text-center p-3 mb-0', { 'is-fading': isFading }]">
          {{ hoverText }}
        </p>
      </div>

      <!-- Atomic Connection Lines -->
      <div class="atom-line atom-line-1"></div>
      <div class="atom-line atom-line-2"></div>

      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        :class="[
          'atom-bullet',
          `bullet-${index + 1}`,
          { 'is-active': activeId === item.id },
        ]"
        @mouseenter="handleMouseEnter(item)"
      >
        <div class="bullet-core"></div>
        <Icon :name="item.icon" class="atom-icon" />
      </div>
    </div>
  </div>
</template>

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

<style lang="scss" scoped>
@use "sass:math";

// 1. SCSS Variables (Atomic Theme)
$bullet-color: #000000; // Black bullets
$bullet-glow: #333333; // Dark gray for glow
$line-color: #000000; // Black lines
$pulse-color: #666666; // Gray for pulse effect
$center-bg: #000000; // Black center
$text-color-light: #ffffff; // White text

$bullet-size: 50px;
$center-size: 180px;
$timeline-radius: 200px;
$container-size: ($timeline-radius * 2) + $bullet-size;

.atom-timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
}

// --- The Center Text Display ---
.atom-text-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $center-size;
  height: $center-size;
  border-radius: 50%;
  background-color: $center-bg;
  border: 4px solid $center-bg;
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  animation: center-pulse 3s infinite ease-in-out;

  p {
    color: $text-color-light;
    font-size: 1rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;

    &.is-fading {
      opacity: 0;
    }
  }
}

@keyframes center-pulse {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(0, 0, 0, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(0, 0, 0, 0.5),
      inset 0 0 25px rgba(255, 255, 255, 0.15);
  }
}

// --- Atomic Connection Lines ---
.atom-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    $line-color 20%,
    $line-color 80%,
    transparent 100%
  );
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      $pulse-color 20%,
      $pulse-color 80%,
      transparent 100%
    );
    opacity: 0;
    animation: line-pulse 2s infinite;
  }

  &.atom-line-1 {
    width: $timeline-radius * 2;
    animation: line-rotate-1 8s infinite linear;
  }

  &.atom-line-2 {
    width: $timeline-radius * 2;
    animation: line-rotate-2 6s infinite linear reverse;
  }
}

@keyframes line-pulse {
  0%, 100% {
    opacity: 0;
    transform: scaleX(1);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.1);
  }
}

@keyframes line-rotate-1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes line-rotate-2 {
  from {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(405deg);
  }
}

// --- The Bullets ---
.atom-bullet {
  width: $bullet-size;
  height: $bullet-size;
  border-radius: 50%;
  background-color: $bullet-color;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $text-color-light;
  font-size: 1.75rem;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  .bullet-core {
    position: absolute;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 40%, #666666, #000000 70%);
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .atom-icon {
    z-index: 1;
    position: relative;
    transition: all 0.3s ease;
  }

  // Visual state for hover and active
  &:hover,
  &.is-active {
    background-color: #333333;
    transform: scale(1.1);
    box-shadow: 
      0 0 15px $bullet-glow,
      0 0 25px rgba(51, 51, 51, 0.4);
    
    .atom-icon {
      transform: scale(1.1);
      filter: brightness(1.3);
    }
    
    .bullet-core {
      opacity: 1;
      background: radial-gradient(circle at 40% 40%, #888888, #333333 70%);
      transform: scale(1.2);
    }
  }
}

// --- Positioning Logic ---
$num-bullets: 6;
$angle-increment: math.div(360deg, $num-bullets);

@for $i from 1 through $num-bullets {
  .bullet-#{$i} {
    $angle: $angle-increment * ($i - 1);
    $x-offset: $timeline-radius * math.cos($angle);
    $y-offset: $timeline-radius * math.sin($angle);

    left: calc(50% + #{$x-offset} - (#{$bullet-size} / 2));
    top: calc(50% + #{$y-offset} - (#{$bullet-size} / 2));
  }
}
</style>