<template>
  <div>
    <div
      class="top"
      :class="{
        // Existing classes for language and visibility
        en: $i18n.locale === 'en',
        // NEW: Class to trigger background change
        scrolled: scrolled,
      }"
    >
      <header
        class="d-flex justify-content-between"
        :class="locale === 'ar' ? 'ar-flex' : ''"
      >
        <SharedNavbarMobileNav v-if="mobile"></SharedNavbarMobileNav>
        <SharedNavbarPcNav v-else></SharedNavbarPcNav>
      </header>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
let mobile = ref(false);
let lastScrollY = ref(0);
// Existing state for showing/hiding on scroll up/down
let isNavbarVisible = ref(true);

// NEW: State for background color change
let scrolled = ref(false);

// Function to check screen size for mobile view
const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

// Function to handle scroll effect
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const scrollThreshold = 150; // Distance in pixels before white background appears

  // 1. Manage Background Change (Transparent -> White)
  scrolled.value = currentScrollY > 10; // Simple threshold for background swap

  // 2. Manage Navbar Show/Hide (Existing logic, slightly simplified)
  if (
    currentScrollY < scrollThreshold ||
    window.matchMedia("(max-width: 1250px)").matches
  ) {
  }

  lastScrollY.value = currentScrollY;
};

// Client-side execution wrapper
if (process.client) {
  onBeforeMount(() => {
    checkWindowSize();
  });

  onMounted(() => {
    // Call handleScroll immediately to set initial state based on page load position
    handleScroll();
    window.addEventListener("resize", checkWindowSize);
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkWindowSize);
    window.removeEventListener("scroll", handleScroll);
  });
}
</script>

<style lang="scss" scoped>
// Define variables if they are used elsewhere
// $main: #bf9847;
$transition-duration: 0.3s;

.top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1002;
  height: 135px;
  // Combine all transitions into the main wrapper
  transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out,
    background-color $transition-duration, box-shadow $transition-duration;

  @media (max-width: 991px) {
    height: 80px;
    border-bottom: 2px solid transparent;
  }

  // Hide/Show classes (Existing)
  &.hidden {
    transform: translateY(-100%);
    opacity: 0;
  }
  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  // --- Background Styles ---

  // 1. Default (Transparent at the top)
  background-color: transparent;
  box-shadow: none;

  // 2. Scrolled State (White background)
  &.scrolled {
    background-color: #ffffff; // Solid White
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); // Add shadow when white
  }

  // --- Header Inner Styles (Cleanup) ---
  header {
    width: 100%;
    height: 115px;
    padding: 0 20px;
    align-items: center;
    transition: all $transition-duration;

    // Remove background styles from the inner header element
    background-color: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    box-shadow: none !important;

    @media (max-width: 991px) {
      height: 80px;
      padding: 10px 20px;
    }
  }

  // Existing RTL/Logo styles below...
}

.top {
  &.en {
    // Existing language specific styles
    .navCollapsed {
      transform: translateX(-100%);
      &.open {
        transform: translateX(-20%);
      }
      .container {
        padding-right: 0;
        padding-left: 20%;
      }
    }
  }
}

.logo {
  display: flex;
  align-items: center;
  width: 160px;
  padding: 10px;
  background: transparent;
  position: absolute;
  top: 0;
  right: 40px;
  cursor: pointer;

  &.ar {
    left: 40px;
    right: auto;
  }

  @media (max-width: 1250px) {
    width: 200px;
  }

  @media (max-width: 991px) {
    width: 120px;
    padding: 10px 0px;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
