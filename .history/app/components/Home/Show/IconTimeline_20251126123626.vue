<template>
  <div class="mx-auto my-8 p-3 md:p-6 section-bg light-theme-context">
    <div class="timeline-container">
      <div class="timeline-text-display">
        <p
          :class="['h5 text-center p-2 md:p-3 mb-0', { 'is-fading': isFading }]"
        >
          {{ hoverText }}
        </p>
      </div>

      <!-- Main Decorative Ring -->
      <div class="timeline-line"></div>

      <!-- 3D Orbital Lines with Electron Bullets -->
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
          `circle-${index + 1}`,
          { 'is-active': activeId === item.id },
        ]"
        @mouseenter="handleMouseEnter(item)"
        @touchstart="handleTouchStart(item)"
      >
        <Icon :name="item.icon" class="timeline-icon" />
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup>
const { locale } = useI18n();

// API configuration
const API_URL = "https://admin.nerva-online.com/api/blocks";
const CATEGORY_ID = 13;

// Reactive data
const timelineItems = ref([]);
const defaultText = ref(locale.value === "ar" ? "نيرفا" : "Nerva");
const hoverText = ref(defaultText.value);
const activeId = ref(null);
const isFading = ref(false);
const TRANSITION_DURATION = 200;

// Icons to use for the timeline items
const timelineIcons = [
  "mdi:account-group", // Sports federation management
  "mdi:stadium", // Sports clubs/academies management
  "mdi:dumbbell", // Gyms and sports centers
  "mdi:home-city", // Real estate management
  "mdi:shopping", // E-commerce B2C
  "mdi:truck-delivery", // Supplier management
  "mdi:school", // Training centers
  "mdi:teach", // Training and private courses
  "mdi:school-outline", // School management
  "mdi:car", // Car rental reservations
];

// Fetch data from API
const fetchTimelineData = async () => {
  try {
    const { data: apiData } = await useFetch(
      `${API_URL}?pageNumber=0&pageSize=10&orderBy=RecordOrder&categoryId=${CATEGORY_ID}`
    );

    if (apiData.value && apiData.value.items) {
      // Transform API data to match our component structure
      timelineItems.value = apiData.value.items.map((item, index) => ({
        id: item.id,
        name: item.name,
        englishName: item.englishName,
        icon: timelineIcons[index % timelineIcons.length], // Cycle through icons if needed
        text: locale.value === "ar" ? item.name : item.englishName,
        pageUrl: item.pageUrl,
        isActive: item.isActive,
      }));
    }
  } catch (error) {
    console.error("Error fetching timeline data:", error);
  }
};

// Touch support for mobile
const handleTouchStart = (item) => {
  handleMouseEnter(item);
};

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

const handleMouseLeaveContainer = () => {
  if (hoverText.value !== defaultText.value) {
    isFading.value = true;

    setTimeout(() => {
      hoverText.value = defaultText.value;
      activeId.value = null;
      isFading.value = false;
    }, TRANSITION_DURATION);
  } else {
    activeId.value = null;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchTimelineData();
});

// Watch for locale changes to update text
watch(locale, () => {
  defaultText.value = locale.value === "ar" ? "نيرفا" : "Nerva";

  // Update timeline items text based on locale
  if (timelineItems.value.length > 0) {
    timelineItems.value = timelineItems.value.map((item) => ({
      ...item,
      text: locale.value === "ar" ? item.name : item.englishName,
    }));

    // Reset hover text if currently showing an item text
    if (activeId.value) {
      const activeItem = timelineItems.value.find(
        (item) => item.id === activeId.value
      );
      if (activeItem) {
        hoverText.value = activeItem.text;
      }
    } else {
      hoverText.value = defaultText.value;
    }
  }
});
</script>

<style lang="scss" scoped>
@use "sass:math";

$accent-color: #000000;
$line-color: #ababab;
$light-bg-color: #ffffff;
$circle-size: 50px;
$text-size: 180px;
$timeline-radius: 200px;
$orbital-2-radius: $timeline-radius;
$orbital-3-radius: $timeline-radius - 60px;
$electron-size: 10px;
$container-size: (($timeline-radius + 60px) * 2) + $circle-size;

// Mobile breakpoints
$mobile-breakpoint: 768px;
$small-mobile-breakpoint: 480px;

// Mobile-specific variables
$circle-size-mobile: 40px;
$text-size-mobile: 140px;
$timeline-radius-mobile: 150px;
$orbital-2-radius-mobile: $timeline-radius-mobile;
$orbital-3-radius-mobile: $timeline-radius-mobile - 45px;

$text-size-small-mobile: 120px;
$timeline-radius-small-mobile: 120px;
$orbital-2-radius-small-mobile: $timeline-radius-small-mobile;
$orbital-3-radius-small-mobile: $timeline-radius-small-mobile - 35px;
$circle-size-small-mobile: 35px;

// 3D Orbital Animations
@keyframes orbit-3d-2 {
  0% {
    transform: translate(-50%, -50%) rotateX(30deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateX(30deg) rotateY(-360deg)
      rotateZ(0deg);
  }
}

@keyframes orbit-3d-3 {
  0% {
    transform: translate(-50%, -50%) rotateX(45deg) rotateY(0deg) rotateZ(45deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateX(45deg) rotateY(360deg)
      rotateZ(45deg);
  }
}

// FIXED: Electron movement animations with CSS variables for dynamic radius
@keyframes electron-move-2 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg)
      translateY(calc(-1 * var(--orbital-2-radius, #{$orbital-2-radius})))
      rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg)
      translateY(calc(-1 * var(--orbital-2-radius, #{$orbital-2-radius})))
      rotate(360deg);
  }
}

@keyframes electron-move-3 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg)
      translateY(calc(-1 * var(--orbital-3-radius, #{$orbital-3-radius})))
      rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg)
      translateY(calc(-1 * var(--orbital-3-radius, #{$orbital-3-radius})))
      rotate(-360deg);
  }
}

// Pulsing glow effect for electrons
@keyframes electron-glow {
  0%,
  100% {
    box-shadow: 0 0 10px 2px currentColor, 0 0 20px 4px rgba(255, 255, 255, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 0 0 15px 4px currentColor, 0 0 30px 6px rgba(255, 255, 255, 0.4),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
  }
}

.timeline-container {
  position: relative;
  width: 100%;
  max-width: $container-size;
  height: auto;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  perspective: 1200px;

  @media (max-width: $mobile-breakpoint) {
    max-width: ($timeline-radius-mobile * 2) + $circle-size-mobile;
    perspective: 800px;
  }

  @media (max-width: $small-mobile-breakpoint) {
    max-width: ($timeline-radius-small-mobile * 2) + $circle-size-small-mobile;
    perspective: 600px;
  }
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

  // 3D Sphere Gradient
  background: radial-gradient(
    circle at 30% 30%,
    lighten($accent-color, 15%) 0%,
    $accent-color 20%,
    darken($accent-color, 10%) 70%,
    darken($accent-color, 15%) 100%
  );

  // 3D Border Effect
  border: 4px solid transparent;
  background-clip: padding-box;

  // Enhanced 3D Shadows
  box-shadow: 
    /* Outer glow */ 0 0 25px rgba(0, 0, 0, 0.3),
    /* Bottom shadow for depth */ 0 10px 30px rgba(0, 0, 0, 0.4),
    /* Inner shadow for curvature */ inset 0 8px 20px rgba(255, 255, 255, 0.1),
    inset 0 -8px 20px rgba(0, 0, 0, 0.6),
    /* Top highlight */ inset 0 2px 4px rgba(255, 255, 255, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  transition: all 0.5s ease;

  // Subtle shine effect
  &::before {
    content: "";
    position: absolute;
    top: 10%;
    left: 15%;
    width: 20%;
    height: 20%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 30%,
      transparent 70%
    );
    pointer-events: none;
  }

  // Reflection effect
  &::after {
    content: "";
    position: absolute;
    bottom: 15%;
    right: 15%;
    width: 15%;
    height: 15%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  p {
    color: $light-bg-color;
    font-size: 1rem;
    font-weight: 500;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
    padding: 1rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 2;

    &.is-fading {
      opacity: 0;
    }
  }

  // Hover effect for extra interactivity
  &:hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4), 0 15px 40px rgba(0, 0, 0, 0.5),
      inset 0 8px 20px rgba(255, 255, 255, 0.15),
      inset 0 -8px 20px rgba(0, 0, 0, 0.7),
      inset 0 2px 4px rgba(255, 255, 255, 0.25);
  }

  @media (max-width: $mobile-breakpoint) {
    width: $text-size-mobile;
    height: $text-size-mobile;

    p {
      font-size: 0.9rem;
      padding: 0.8rem;
    }

    &::before {
      top: 8%;
      left: 12%;
      width: 18%;
      height: 18%;
    }

    &::after {
      bottom: 12%;
      right: 12%;
      width: 12%;
      height: 12%;
    }
  }

  @media (max-width: $small-mobile-breakpoint) {
    width: $text-size-small-mobile;
    height: $text-size-small-mobile;

    p {
      font-size: 0.8rem;
      padding: 0.6rem;
      line-height: 1.3;
    }

    &::before {
      top: 6%;
      left: 10%;
      width: 15%;
      height: 15%;
    }

    &::after {
      bottom: 10%;
      right: 10%;
      width: 10%;
      height: 10%;
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

  @media (max-width: $mobile-breakpoint) {
    width: $timeline-radius-mobile * 2;
    height: $timeline-radius-mobile * 2;
  }

  @media (max-width: $small-mobile-breakpoint) {
    width: $timeline-radius-small-mobile * 2;
    height: $timeline-radius-small-mobile * 2;
    border-width: 1.5px;
  }
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
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    background: radial-gradient(
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
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 1px solid transparent;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 70%
    );
    background-size: 200% 200%;
    animation: shimmer 4s linear infinite;
    z-index: -1;
    opacity: 0.4;
  }

  @media (max-width: $mobile-breakpoint) {
    &::before {
      filter: blur(0.5px);
    }

    &::after {
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
    }
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

// Individual 3D Orbitals with CSS variables for dynamic radius
.orbital-2 {
  width: calc(var(--orbital-2-radius, #{$orbital-2-radius}) * 2);
  height: calc(var(--orbital-2-radius, #{$orbital-2-radius}) * 2);
  animation: orbit-3d-2 20s linear infinite;
  border: 2px solid #69acdfb9;
  --orbital-2-radius: #{$orbital-2-radius};

  &::before {
    border-color: #69acdf6f;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(102, 151, 152, 0.6) 0%,
      rgba(160, 247, 255, 0.2) 30%,
      transparent 60%
    );
  }

  @media (max-width: $mobile-breakpoint) {
    --orbital-2-radius: #{$orbital-2-radius-mobile};
  }

  @media (max-width: $small-mobile-breakpoint) {
    --orbital-2-radius: #{$orbital-2-radius-small-mobile};
  }
}

.orbital-3 {
  width: calc(var(--orbital-3-radius, #{$orbital-3-radius}) * 2);
  height: calc(var(--orbital-3-radius, #{$orbital-3-radius}) * 2);
  animation: orbit-3d-3 15s linear infinite;
  border: 2px solid #f39200af;
  --orbital-3-radius: #{$orbital-3-radius};

  &::before {
    border-color: #f3920079;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(214, 187, 129, 0.6) 0%,
      rgba(240, 213, 158, 0.2) 30%,
      transparent 60%
    );
  }

  @media (max-width: $mobile-breakpoint) {
    --orbital-3-radius: #{$orbital-3-radius-mobile};
  }

  @media (max-width: $small-mobile-breakpoint) {
    --orbital-3-radius: #{$orbital-3-radius-small-mobile};
  }
}

// FIXED: Electron particles with CSS variables
.electron {
  width: $electron-size;
  height: $electron-size;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;

  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0%,
    currentColor 40%,
    currentColor 100%
  );
  animation: electron-glow 2s ease-in-out infinite alternate;

  @media (max-width: $mobile-breakpoint) {
    width: $electron-size * 0.8;
    height: $electron-size * 0.8;
  }
}

.electron-2 {
  color: #69acdf;
  // Apply the animation with the CSS variable
  animation: electron-move-2 2.5s linear infinite,
    electron-glow 1.8s ease-in-out infinite alternate;
}

.electron-3 {
  color: #f39200;
  // Apply the animation with the CSS variable
  animation: electron-move-3 2s linear infinite,
    electron-glow 1.6s ease-in-out infinite alternate;
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
    border: 2px solid #fff;
  z-index: 2;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;
 // 3D Sphere Gradient
  background: radial-gradient(
    circle at 30% 30%,
    lighten($accent-color, 15%) 0%,
    $accent-color 20%,
    darken($accent-color, 10%) 70%,
    darken($accent-color, 15%) 100%
  );

  // 3D Border Effect
  border: 4px solid transparent;
  background-clip: padding-box;

  // Enhanced 3D Shadows
  box-shadow: 
    /* Outer glow */ 0 0 25px rgba(0, 0, 0, 0.3),
    /* Bottom shadow for depth */ 0 10px 30px rgba(0, 0, 0, 0.4),
    /* Inner shadow for curvature */ inset 0 8px 20px rgba(255, 255, 255, 0.1),
    inset 0 -8px 20px rgba(0, 0, 0, 0.6),
    /* Top highlight */ inset 0 2px 4px rgba(255, 255, 255, 0.2);

  &:hover,
  &.is-active {
    background-color: $light-bg-color;
    transform: scale(1.05);
    // border: 1px solid $accent-color;
    color: $second;
  }

  @media (max-width: $mobile-breakpoint) {
    width: $circle-size-mobile;
    height: $circle-size-mobile;
    font-size: 1.5rem;

    &::after {
      content: "";
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
    }
  }

  @media (max-width: $small-mobile-breakpoint) {
    width: $circle-size-small-mobile;
    height: $circle-size-small-mobile;
    font-size: 1.25rem;
  }
}

// --- Positioning Logic (Trigonometry) ---
$num-circles: 10; // Updated to handle up to 10 items from API
$angle-increment: math.div(360deg, $num-circles);

@for $i from 1 through $num-circles {
  .circle-#{$i} {
    $angle: $angle-increment * ($i - 1) - 90deg;

    $x-offset: $timeline-radius * math.cos($angle);
    $y-offset: $timeline-radius * math.sin($angle);

    left: calc(50% + #{$x-offset} - (#{$circle-size} / 2));
    top: calc(50% + #{$y-offset} - (#{$circle-size} / 2));

    @media (max-width: $mobile-breakpoint) {
      $x-offset-mobile: $timeline-radius-mobile * math.cos($angle);
      $y-offset-mobile: $timeline-radius-mobile * math.sin($angle);

      left: calc(50% + #{$x-offset-mobile} - (#{$circle-size-mobile} / 2));
      top: calc(50% + #{$y-offset-mobile} - (#{$circle-size-mobile} / 2));
    }

    @media (max-width: $small-mobile-breakpoint) {
      $x-offset-small: $timeline-radius-small-mobile * math.cos($angle);
      $y-offset-small: $timeline-radius-small-mobile * math.sin($angle);

      left: calc(50% + #{$x-offset-small} - (#{$circle-size-small-mobile} / 2));
      top: calc(50% + #{$y-offset-small} - (#{$circle-size-small-mobile} / 2));
    }
  }
}

// Additional mobile optimizations
@media (max-width: $mobile-breakpoint) {
  .orbital-line {
    animation-duration: 30s !important;
  }

  .electron {
    animation-duration: 4s linear infinite !important;
  }
}

// Prevent text selection on mobile for better UX
.timeline-circle {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
}
</style>
