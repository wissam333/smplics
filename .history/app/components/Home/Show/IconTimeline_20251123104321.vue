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

      <!-- 3D Orbital Lines with Electron Bullets -->
      <div class="orbital-line orbital-1">
        <div class="electron electron-1"></div>
      </div>

      <div class="orbital-line orbital-2">
        <div class="electron electron-2"></div>
      </div>

      <div class="orbital-line orbital-3">
        <div class="electron electron-3"></div>
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

$accent-color: #000000; // Black (Accent/Glow Color)
$line-color: #ababab; // Subtle light gray for the ring
$light-bg-color: #ffffff; // PURE WHITE Background
$circle-size: 50px;
$text-size: 180px;
$timeline-radius: 200px; // Radius for the main line
$orbital-1-radius: $timeline-radius + 60px; // Outer orbital
$orbital-2-radius: $timeline-radius; // Middle orbital
$orbital-3-radius: $timeline-radius - 60px; // Inner orbital
$electron-size: 10px;
$container-size: ($orbital-1-radius * 2) + $circle-size;

// 3D Orbital Animations
@keyframes orbit-3d-1 {
  0% {
    transform: translate(-50%, -50%) rotateX(60deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateX(60deg) rotateY(360deg) rotateZ(0deg);
  }
}

@keyframes orbit-3d-2 {
  0% {
    transform: translate(-50%, -50%) rotateX(30deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateX(30deg) rotateY(-360deg) rotateZ(0deg);
  }
}

@keyframes orbit-3d-3 {
  0% {
    transform: translate(-50%, -50%) rotateX(45deg) rotateY(0deg) rotateZ(45deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateX(45deg) rotateY(360deg) rotateZ(45deg);
  }
}

// Electron movement along the 3D orbitals
@keyframes electron-move-1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateY(-$orbital-1-radius) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateY(-$orbital-1-radius) rotate(-360deg);
  }
}

@keyframes electron-move-2 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateY(-$orbital-2-radius) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg) translateY(-$orbital-2-radius) rotate(360deg);
  }
}

@keyframes electron-move-3 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateY(-$orbital-3-radius) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateY(-$orbital-3-radius) rotate(-360deg);
  }
}

// Pulsing glow effect for electrons
@keyframes electron-glow {
  0%, 100% {
    box-shadow: 
      0 0 10px 2px currentColor,
      0 0 20px 4px rgba(255, 255, 255, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 
      0 0 15px 4px currentColor,
      0 0 30px 6px rgba(255, 255, 255, 0.4),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
  }
}

.timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
  perspective: 1200px;
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

// --- The Main Circular Line ---
.timeline-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $timeline-radius * 2;
  height: $timeline-radius * 2;
  border: 2px solid $line-color;
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

// --- 3D Orbital Lines with Electron Bullets ---

.orbital-line {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  z-index: 0;
  
  // 3D Orbital Tube Effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    background: 
      radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.3) 20%,
        transparent 50%
      );
    filter: blur(1px);
    opacity: 0.6;
  }
  
  // Outer glow for the orbital
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 1px solid transparent;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(255, 255, 255, 0.2) 50%, 
      transparent 70%);
    background-size: 200% 200%;
    animation: shimmer 4s linear infinite;
    z-index: -1;
    opacity: 0.4;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 200%;
  }
  100% {
    background-position: -200% -200%;
  }
}

// Individual 3D Orbitals with different orientations
.orbital-1 {
  width: $orbital-1-radius * 2;
  height: $orbital-1-radius * 2;
  animation: orbit-3d-1 25s linear infinite;
  border: 2px solid rgba(255, 107, 107, 0.6); // Red orbital
  
  &::before {
    border-color: rgba(255, 107, 107, 0.4);
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 107, 107, 0.6) 0%,
      rgba(255, 107, 107, 0.2) 30%,
      transparent 60%
    );
  }
}

.orbital-2 {
  width: $orbital-2-radius * 2;
  height: $orbital-2-radius * 2;
  animation: orbit-3d-2 20s linear infinite;
  border: 2px solid rgba(78, 205, 196, 0.6); // Teal orbital
  
  &::before {
    border-color: rgba(78, 205, 196, 0.4);
    background: radial-gradient(
      circle at 30% 30%,
      rgba(78, 205, 196, 0.6) 0%,
      rgba(78, 205, 196, 0.2) 30%,
      transparent 60%
    );
  }
}

.orbital-3 {
  width: $orbital-3-radius * 2;
  height: $orbital-3-radius * 2;
  animation: orbit-3d-3 15s linear infinite;
  border: 2px solid rgba(69, 183, 209, 0.6); // Blue orbital
  
  &::before {
    border-color: rgba(69, 183, 209, 0.4);
    background: radial-gradient(
      circle at 30% 30%,
      rgba(69, 183, 209, 0.6) 0%,
      rgba(69, 183, 209, 0.2) 30%,
      transparent 60%
    );
  }
}

// Electron particles
.electron {
  width: $electron-size;
  height: $electron-size;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  
  // Electron core with gradient
  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0%,
    currentColor 40%,
    darken(currentColor, 20%) 100%
  );
  animation: electron-glow 2s ease-in-out infinite alternate;
}

.electron-1 {
  animation: 
    electron-move-1 3s linear infinite,
    electron-glow 2s ease-in-out infinite alternate;
  color: #ff6b6b; // Red electron
}

.electron-2 {
  animation: 
    electron-move-2 2.5s linear infinite,
    electron-glow 1.8s ease-in-out infinite alternate;
  color: #4ecdc4; // Teal electron
}

.electron-3 {
  animation: 
    electron-move-3 2s linear infinite,
    electron-glow 1.6s ease-in-out infinite alternate;
  color: #45b7d1; // Blue electron
}

// --- The Icon Circles ---
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

// --- Positioning Logic (Trigonometry) ---
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