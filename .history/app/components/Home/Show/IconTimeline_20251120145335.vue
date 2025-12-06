<template>
  <div class="mx-auto my-8 p-6 section-bg light-theme-context">
    <div class="atom-container">
      <div class="nucleus">
        <div class="nucleus-inner"></div>
        <p :class="['nucleus-text', { 'is-fading': isFading }]">
          {{ hoverText }}
        </p>
      </div>

      <div class="electron-orbit electron-orbit-1"></div>
      <div class="electron-orbit electron-orbit-2"></div>
      <div class="electron-orbit electron-orbit-3"></div>

      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        :class="[
          'electron',
          `electron-${index + 1}`,
          { 'is-active': activeId === item.id },
        ]"
        @mouseenter="handleMouseEnter(item)"
      >
        <div class="electron-core"></div>
        <Icon :name="item.icon" class="electron-icon" />
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
  "Hover over an electron to see the corresponding step description!";
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
$electron-color: #3b82f6; // Blue for electrons
$electron-glow: #60a5fa; // Lighter blue for glow effect
$nucleus-color: #1e40af; // Darker blue for nucleus
$orbit-color: rgba(59, 130, 246, 0.2); // Subtle orbit lines
$text-color-light: #ffffff; // White text

$electron-size: 50px;
$nucleus-size: 180px;
$orbit-radius-1: 200px;
$orbit-radius-2: 160px;
$orbit-radius-3: 120px;
$container-size: ($orbit-radius-1 * 2) + $electron-size;

.atom-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
}

// --- The Nucleus (Center) ---
.nucleus {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $nucleus-size;
  height: $nucleus-size;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, $electron-glow, $nucleus-color);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  animation: nucleus-pulse 4s infinite ease-in-out;

  .nucleus-inner {
    position: absolute;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 40%, #ffffff, transparent 70%);
    opacity: 0.3;
  }
}

.nucleus-text {
  color: $text-color-light;
  font-size: 1rem;
  padding: 20px;
  z-index: 4;
  position: relative;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;

  &.is-fading {
    opacity: 0;
  }
}

@keyframes nucleus-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 
      0 0 20px rgba(59, 130, 246, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.2);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.02);
    box-shadow: 
      0 0 30px rgba(59, 130, 246, 0.7),
      inset 0 0 25px rgba(255, 255, 255, 0.3);
  }
}

// --- Electron Orbits ---
.electron-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px dashed $orbit-color;
  border-radius: 50%;
  z-index: 1;
  
  &.electron-orbit-1 {
    width: $orbit-radius-1 * 2;
    height: $orbit-radius-1 * 2;
    animation: orbit-rotate 20s infinite linear;
  }
  
  &.electron-orbit-2 {
    width: $orbit-radius-2 * 2;
    height: $orbit-radius-2 * 2;
    animation: orbit-rotate 15s infinite linear reverse;
  }
  
  &.electron-orbit-3 {
    width: $orbit-radius-3 * 2;
    height: $orbit-radius-3 * 2;
    animation: orbit-rotate 12s infinite linear;
  }
}

@keyframes orbit-rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

// --- The Electrons ---
.electron {
  width: $electron-size;
  height: $electron-size;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, lighten($electron-color, 20%), $electron-color);
  display: flex;
  justify-content: center;
  align-items: center;
  color: $text-color-light;
  font-size: 1.25rem;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  box-shadow: 
    0 0 10px $electron-glow,
    inset 0 2px 5px rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  .electron-core {
    position: absolute;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 40%, #ffffff, transparent 70%);
    opacity: 0.7;
  }

  .electron-icon {
    z-index: 1;
    position: relative;
    transition: all 0.3s ease;
  }

  // Visual state for hover and active
  &:hover,
  &.is-active {
    background: radial-gradient(circle at 30% 30%, lighten($electron-glow, 10%), $electron-glow);
    transform: scale(1.2);
    box-shadow: 
      0 0 20px $electron-glow,
      0 0 30px rgba(96, 165, 250, 0.5),
      inset 0 2px 5px rgba(255, 255, 255, 0.5);
    
    .electron-icon {
      transform: scale(1.2);
      filter: brightness(1.3);
    }
    
    .electron-core {
      opacity: 1;
      background: radial-gradient(circle at 40% 40%, #ffffff, #e0f2fe 70%);
    }
  }
}

// --- Positioning and Animation for Electrons ---
$num-electrons: 6;

// First orbit (2 electrons)
.electron-1 {
  $angle: 0deg;
  $x-offset: $orbit-radius-1 * math.cos($angle);
  $y-offset: $orbit-radius-1 * math.sin($angle);
  
  left: calc(50% + #{$x-offset} - (#{$electron-size} / 2));
  top: calc(50% + #{$y-offset} - (#{$electron-size} / 2));
  animation: electron-orbit-1 8s infinite linear;
}

.electron-2 {
  $angle: 180deg;
  $x-offset: $orbit-radius-1 * math.cos($angle);
  $y-offset: $orbit-radius-1 * math.sin($angle);
  
  left: calc(50% + #{$x-offset} - (#{$electron-size} / 2));
  top: calc(50% + #{$y-offset} - (#{$electron-size} / 2));
  animation: electron-orbit-1 8s infinite linear;
}

@keyframes electron-orbit-1 {
  from {
    transform: rotate(0deg) translateX($orbit-radius-1) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX($orbit-radius-1) rotate(-360deg);
  }
}

// Second orbit (2 electrons)
.electron-3 {
  $angle: 90deg;
  $x-offset: $orbit-radius-2 * math.cos($angle);
  $y-offset: $orbit-radius-2 * math.sin($angle);
  
  left: calc(50% + #{$x-offset} - (#{$electron-size} / 2));
  top: calc(50% + #{$y-offset} - (#{$electron-size} / 2));
  animation: electron-orbit-2 6s infinite linear;
}

.electron-4 {
  $angle: 270deg;
  $x-offset: $orbit-radius-2 * math.cos($angle);
  $y-offset: $orbit-radius-2 * math.sin($angle);
  
  left: calc(50% + #{$x-offset} - (#{$electron-size} / 2));
  top: calc(50% + #{$y-offset} - (#{$electron-size} / 2));
  animation: electron-orbit-2 6s infinite linear;
}

@keyframes electron-orbit-2 {
  from {
    transform: rotate(0deg) translateX($orbit-radius-2) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX($orbit-radius-2) rotate(-360deg);
  }
}

// Third orbit (2 electrons)
.electron-5 {
  $angle: 45deg;
  $x-offset: $orbit-radius-3 * math.cos($angle);
  $y-offset: $orbit-radius-3 * math.sin($angle);
  
  left: calc(50% + #{$x-offset} - (#{$electron-size} / 2));
  top: calc(50% + #{$y-offset} - (#{$electron-size} / 2));
  animation: electron-orbit-3 4s infinite linear;
}

.electron-6 {
  $angle: 225deg;
  $x-offset: $orbit-radius-3 * math.cos($angle);
  $y-offset: $orbit-radius-3 * math.sin($angle);
  
  left: calc(50% + #{$x-offset} - (#{$electron-size} / 2));
  top: calc(50% + #{$y-offset} - (#{$electron-size} / 2));
  animation: electron-orbit-3 4s infinite linear;
}

@keyframes electron-orbit-3 {
  from {
    transform: rotate(0deg) translateX($orbit-radius-3) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX($orbit-radius-3) rotate(-360deg);
  }
}
</style>