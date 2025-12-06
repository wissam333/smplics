<template>
  <div class="navbar-wrapper">
    <div
      class="top"
      :class="{
        en: locale === 'en',
        scrolled: scrolled,
      }"
    >
      <header class="container-fluid header-content">
        <SharedNavbarMobileNav v-if="isMobile" />
        <SharedNavbarPcNav v-else />
      </header>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();

const scrolled = ref(false);
const isMobile = ref(false);

// Provide scroll value to child components
provide("scrolled", scrolled);

// Update mobile state only on client
const updateMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

// Handle scroll state
const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  // Initialize
  updateMobile();
  handleScroll();

  // Event listeners
  window.addEventListener("resize", updateMobile);
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMobile);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
$transition-duration: 0.3s;
$header-height-desktop: 115px;
$header-height-mobile: 80px;

.top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1002;
  height: $header-height-desktop;
  transition: background-color $transition-duration ease,
    box-shadow $transition-duration ease,
    backdrop-filter $transition-duration ease;
  box-shadow: none;

  &.scrolled {
    background-color: #000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .header-content {
    width: 100%;
    height: 100%;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1250px) {
      padding: 0 20px;
    }

    @media (max-width: 991px) {
      height: $header-height-mobile;
      padding: 10px 20px;
    }
  }

  @media (max-width: 991px) {
    height: $header-height-mobile;
  }
}

.top.en {
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
</style>
