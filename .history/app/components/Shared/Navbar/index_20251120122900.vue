<template>
  <div class="navbar-wrapper">
    <div
      class="top"
      :class="{
        en: $i18n.locale === 'en',
        scrolled: scrolled,
      }"
    >
      <header
        class="container-fluid header-content"
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

let scrolled = ref(false);

provide("scrolled", scrolled);

const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  // This state controls the background color of the parent '.top' div
  scrolled.value = currentScrollY > 50;
};

if (process.client) {
  onBeforeMount(() => {
    checkWindowSize();
  });

  onMounted(() => {
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

  // Initial Transparent State (no background-color or blur needed here if it's purely transparent)
  box-shadow: none;

  // Scrolled State: Turns White
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
