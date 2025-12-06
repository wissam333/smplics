<template>
  <div class="navbar-wrapper">
    <!-- Contact Info Bar - Shown initially, hidden on scroll -->
    <div
      class="contact-bar"
      :class="{
        'contact-bar-hidden': scrolled,
      }"
    >
      <SharedNavbarContactInfo v-if="!scrolled || !mobile" />
    </div>

    <!-- Main Navigation - Always sticky -->
    <div
      class="top"
      :class="{
        en: $i18n.locale === 'en',
        scrolled: scrolled,
      }"
    >
      <header class="header-content">
        <SharedNavbarMobileNav v-if="mobile"></SharedNavbarMobileNav>
        <SharedNavbarPcNav :scrolled="scrolled" v-else></SharedNavbarPcNav>
      </header>
    </div>
  </div>
</template>

<script setup>
let mobile = ref(false);
let scrolled = ref(false);

const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  scrolled.value = currentScrollY > 50;
};

onMounted(() => {
  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkWindowSize);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
$transition-duration: 0.3s;
$header-height-desktop: 115px;
$header-height-mobile: 80px;

.contact-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1001;
  background-color: var(--bg-color);
  border-bottom: 1px solid #85858514;
  transition: all $transition-duration ease;
  transform: translateY(0);
  opacity: 1;

  &.contact-bar-hidden {
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }
}

.top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1002;
  // height: $header-height-desktop;
  transition: all $transition-duration ease;
  box-shadow: none;
   background-color: var(--bg-color);
  // Initial state - show below contact bar
  border-bottom: 1px solid #85858526;
  &.scrolled {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    height: 65px;

    // When scrolled, move to top
    top: 0;
  }

  &:not(.scrolled) {
    // When not scrolled, position below contact bar
    top: 45px; // Adjust this value based on your contact bar height
  }

  .header-content {
    width: 100%;
    // height: 100%;
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1250px) {
      padding: 0 20px;
    }

    @media (max-width: 991px) {
      height: $header-height-mobile !important;
      padding: 10px 20px;
    }
  }

  @media (max-width: 991px) {
    height: $header-height-mobile !important;

    &:not(.scrolled) {
      top: 80px; // Slightly higher for mobile if contact info takes more space
    }
  }
}

.top {
  &.en {
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
</style>
