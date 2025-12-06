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

      <!-- Outer Animated Line (NOW STATIC) and Bullet (NOW ANIMATED) -->
      <div class="animated-line-1">
        <div class="moving-bullet-1"></div>
      </div>

      <!-- Inner Animated Line (NOW STATIC) and Bullet (NOW ANIMATED) -->
      <div class="animated-line-2">
        <div class="moving-bullet-2"></div>
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
$anim-line-1-radius: $timeline-radius + 40px; // Outer line (240px)
$anim-line-2-radius: $timeline-radius - 40px; // Inner line (160px)
$bullet-size: 8px;
$container-size: ($anim-line-1-radius * 2) + $circle-size; 

@keyframes spin-clockwise {
    to {
        transform: rotate(0px);
    }
}

@keyframes spin-counter-clockwise {
    to {
        transform: rotate(-360deg);
    }
}

.timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
}

// --- The Center Text Display Circle (Unchanged) ---
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

// --- The Main Circular Line (Decorative Ring) (Unchanged) ---
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

// --- UPDATED: Animated Lines (NOW STATIC) and Bullets (NOW ANIMATED) ---

// Base styles for both animated line containers (STATIC LINES)
.animated-line-1,
.animated-line-2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    // The visual ring is here (STATIC)
    border: 1px dotted rgba($accent-color, 0.3); 
    z-index: 0; 
    // CRITICAL FIX: Removed the animation property here!
}

// Line 1: Outer Ring (STATIC)
.animated-line-1 {
    width: $anim-line-1-radius * 2;
    height: $anim-line-1-radius * 2;
}

// Line 2: Inner Ring (STATIC)
.animated-line-2 {
    width: $anim-line-2-radius * 2;
    height: $anim-line-2-radius * 2;
}

// Base styles for the bullets (Animation added here)
.moving-bullet-1,
.moving-bullet-2 {
    width: $bullet-size;
    height: $bullet-size;
    border-radius: 50%;
    background-color: $accent-color;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%); 
    box-shadow: 0 0 5px $accent-color;
}
.moving-bullet-1 {
    transform-origin: 50% $anim-line-1-radius; 
    animation: spin-clockwise 60s linear infinite; 
}

.moving-bullet-2 {
    transform-origin: 50% $anim-line-2-radius;
    animation: spin-counter-clockwise 45s linear infinite;
}

// --- The Icon Circles (Unchanged) ---
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

// --- Positioning Logic (Trigonometry) (Unchanged) ---
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