<template>
  <div class="mx-auto my-8 p-6 section-bg light-theme-context">
    <div class="atom-3d-container">
      <div class="atom-3d-scene">
        <!-- 3D Nucleus -->
        <div class="nucleus-3d">
          <div class="nucleus-core"></div>
          <div class="nucleus-glow"></div>
          <p :class="['nucleus-text', { 'is-fading': isFading }]">
            {{ hoverText }}
          </p>
        </div>

        <!-- 3D Electron Orbits -->
        <div class="orbit-3d orbit-1">
          <div class="orbit-ring"></div>
        </div>
        <div class="orbit-3d orbit-2">
          <div class="orbit-ring"></div>
        </div>
        <div class="orbit-3d orbit-3">
          <div class="orbit-ring"></div>
        </div>

        <!-- 3D Electrons -->
        <div
          v-for="(item, index) in timelineItems"
          :key="item.id"
          :class="[
            'electron-3d',
            `electron-${index + 1}`,
            { 'is-active': activeId === item.id },
          ]"
          @mouseenter="handleMouseEnter(item)"
        >
          <div class="electron-sphere">
            <div class="electron-glow"></div>
            <Icon :name="item.icon" class="electron-icon" />
          </div>
          <div class="electron-trail"></div>
        </div>
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
const isFading = ref(false);
const TRANSITION_DURATION = 200;

// 3. Functions to handle the hover events with fade logic.
const handleMouseEnter = (item) => {
  if (hoverText.value !== item.text) {
    isFading.value = true;
    setTimeout(() => {
      hoverText.value = item.text;
      activeId.value = item.id;
      isFading.value = false;
    }, TRANSITION_DURATION);
  } else {
    activeId.value = item.id;
  }
};
</script>

<style lang="scss" scoped>
@use "sass:math";

// 3D Variables
$electron-color: #3b82f6;
$electron-glow: #60a5fa;
$nucleus-color: #1e40af;
$orbit-color: rgba(59, 130, 246, 0.15);
$text-color-light: #ffffff;

$electron-size: 45px;
$nucleus-size: 160px;
$orbit-radius-1: 220px;
$orbit-radius-2: 180px;
$orbit-radius-3: 140px;

.atom-3d-container {
  perspective: 1200px;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.atom-3d-scene {
  position: relative;
  width: 500px;
  height: 500px;
  transform-style: preserve-3d;
  animation: scene-rotate 20s infinite linear;
}

@keyframes scene-rotate {
  from {
    transform: rotateY(0deg) rotateX(15deg);
  }
  to {
    transform: rotateY(360deg) rotateX(15deg);
  }
}

// --- 3D Nucleus ---
.nucleus-3d {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: $nucleus-size;
  height: $nucleus-size;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    lighten($nucleus-color, 20%),
    $nucleus-color 70%
  );
  transform-style: preserve-3d;
  animation: nucleus-rotate 15s infinite linear reverse;

  .nucleus-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 20px);
    width: 40%;
    height: 40%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 40% 40%,
      lighten($electron-glow, 30%),
      $electron-glow 70%
    );
    filter: blur(5px);
    animation: core-pulse 3s infinite ease-in-out;
  }

  .nucleus-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, -10px);
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      transparent 30%,
      rgba($electron-glow, 0.3) 70%,
      transparent 100%
    );
    animation: glow-pulse 4s infinite ease-in-out;
  }
}

.nucleus-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 30px);
  color: $text-color-light;
  font-size: 0.9rem;
  padding: 25px;
  text-align: center;
  z-index: 10;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  &.is-fading {
    opacity: 0;
  }
}

@keyframes nucleus-rotate {
  from {
    transform: translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotateX(360deg) rotateY(180deg);
  }
}

@keyframes core-pulse {
  0%, 100% {
    transform: translate3d(-50%, -50%, 20px) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate3d(-50%, -50%, 25px) scale(1.1);
    opacity: 1;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    transform: translate3d(-50%, -50%, -10px) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate3d(-50%, -50%, -15px) scale(1.1);
    opacity: 0.8;
  }
}

// --- 3D Orbits ---
.orbit-3d {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform-style: preserve-3d;
  border: 1px solid $orbit-color;

  .orbit-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      transparent 0%,
      rgba($electron-glow, 0.1) 50%,
      transparent 100%
    );
    animation: ring-glow 3s infinite ease-in-out;
  }

  &.orbit-1 {
    width: $orbit-radius-1 * 2;
    height: $orbit-radius-1 * 2;
    transform: translate3d(-50%, -50%, 0) rotateX(60deg);
    animation: orbit-rotate-1 25s infinite linear;

    .orbit-ring {
      width: 100%;
      height: 100%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  &.orbit-2 {
    width: $orbit-radius-2 * 2;
    height: $orbit-radius-2 * 2;
    transform: translate3d(-50%, -50%, 0) rotateY(60deg) rotateX(30deg);
    animation: orbit-rotate-2 20s infinite linear reverse;

    .orbit-ring {
      width: 100%;
      height: 100%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  &.orbit-3 {
    width: $orbit-radius-3 * 2;
    height: $orbit-radius-3 * 2;
    transform: translate3d(-50%, -50%, 0) rotateZ(45deg) rotateX(45deg);
    animation: orbit-rotate-3 15s infinite linear;

    .orbit-ring {
      width: 100%;
      height: 100%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
}

@keyframes orbit-rotate-1 {
  from {
    transform: translate3d(-50%, -50%, 0) rotateX(60deg) rotateZ(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotateX(60deg) rotateZ(360deg);
  }
}

@keyframes orbit-rotate-2 {
  from {
    transform: translate3d(-50%, -50%, 0) rotateY(60deg) rotateX(30deg) rotateZ(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotateY(60deg) rotateX(30deg) rotateZ(360deg);
  }
}

@keyframes orbit-rotate-3 {
  from {
    transform: translate3d(-50%, -50%, 0) rotateZ(45deg) rotateX(45deg) rotateY(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotateZ(45deg) rotateX(45deg) rotateY(360deg);
  }
}

@keyframes ring-glow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

// --- 3D Electrons ---
.electron-3d {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  cursor: pointer;

  .electron-sphere {
    width: $electron-size;
    height: $electron-size;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      lighten($electron-color, 25%),
      $electron-color 70%
    );
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    .electron-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 5px);
      width: 120%;
      height: 120%;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba($electron-glow, 0.4) 0%,
        transparent 70%
      );
      filter: blur(8px);
      transition: all 0.4s ease;
    }

    .electron-icon {
      color: $text-color-light;
      font-size: 1.2rem;
      transform: translateZ(8px);
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }
  }

  .electron-trail {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 30px;
    background: linear-gradient(
      to bottom,
      transparent,
      $electron-glow,
      transparent
    );
    transform-origin: top center;
    transform: translate3d(-50%, -50%, 0) rotateZ(90deg);
    opacity: 0;
    filter: blur(1px);
  }

  // Hover effects
  &:hover,
  &.is-active {
    .electron-sphere {
      transform: scale(1.3);
      background: radial-gradient(
        circle at 30% 30%,
        lighten($electron-glow, 20%),
        $electron-glow 70%
      );
      box-shadow: 
        0 0 25px $electron-glow,
        0 0 40px rgba($electron-glow, 0.6);

      .electron-glow {
        transform: translate3d(-50%, -50%, 10px) scale(1.3);
        opacity: 0.8;
      }

      .electron-icon {
        transform: translateZ(12px) scale(1.2);
        filter: brightness(1.5);
      }
    }

    .electron-trail {
      opacity: 0.7;
      animation: trail-stretch 1s infinite alternate;
    }
  }
}

@keyframes trail-stretch {
  0% {
    height: 30px;
    opacity: 0.4;
  }
  100% {
    height: 50px;
    opacity: 0.7;
  }
}

// --- 3D Electron Positioning and Animations ---
// First orbit electrons
.electron-1 {
  transform: translate3d(-50%, -50%, 0) rotateX(60deg);
  animation: electron-orbit-1 8s infinite linear;
}

.electron-2 {
  transform: translate3d(-50%, -50%, 0) rotateX(60deg) rotateY(180deg);
  animation: electron-orbit-1 8s infinite linear;
}

@keyframes electron-orbit-1 {
  from {
    transform: translate3d(-50%, -50%, 0) rotateX(60deg) rotateZ(0deg) 
               translateX($orbit-radius-1) rotateZ(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotateX(60deg) rotateZ(360deg) 
               translateX($orbit-radius-1) rotateZ(-360deg);
  }
}

// Second orbit electrons
.electron-3 {
  transform: translate3d(-50%, -50%, 0) rotateY(60deg) rotateX(30deg);
  animation: electron-orbit-2 6s infinite linear;
}

.electron-4 {
  transform: translate3d(-50%, -50%, 0) rotateY(60deg) rotateX(30deg) rotateZ(180deg);
  animation: electron-orbit-2 6s infinite linear;
}

@keyframes electron-orbit-2 {
  from {
    transform: translate3d(-50%, -50%, 0) rotateY(60deg) rotateX(30deg) rotateZ(0deg) 
               translateX($orbit-radius-2) rotateZ(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotateY(60deg) rotateX(30deg) rotateZ(360deg) 
               translateX($orbit-radius-2) rotateZ(-360deg);
  }
}

// Third orbit electrons
.electron-5 {
  transform: translate3d(-50%, -50%, 0) rotateZ(45deg) rotateX(45deg);
  animation: electron-orbit-3 4s infinite linear;
}

.electron-6 {
  transform: translate3d(-50%, -50%, 0) rotateZ(45deg) rotateX(45deg) rotateY(180deg);
  animation: electron-orbit-3 4s infinite linear;
}

@keyframes electron-orbit-3 {
  from {
    transform: translate3d(-50%, -50%, 0) rotateZ(45deg) rotateX(45deg) rotateY(0deg) 
               translateX($orbit-radius-3) rotateY(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotateZ(45deg) rotateX(45deg) rotateY(360deg) 
               translateX($orbit-radius-3) rotateY(-360deg);
  }
}
</style>