<template>
  <div class="navbar-wrapper">
    <div class="top" :class="topClasses">
      <header class="container-fluid header-content">
        <template v-if="isMounted">
          <SharedNavbarMobileNav v-if="mobile"></SharedNavbarMobileNav>
          <SharedNavbarPcNav v-else></SharedNavbarPcNav>
        </template>
      </header>
    </div>
  </div>
</template>

<script setup>
import { nextTick, computed } from "vue"; // 🚨 Import computed
import { ref, onMounted, onUnmounted } from "vue";

const { locale } = useI18n(); // Using 'locale' directly here to avoid the need for 'globalLocale'
let mobile = ref(false);
let scrolled = ref(false);
const isMounted = ref(false);

provide("scrolled", scrolled);

// 🚨 FINAL FIX: Computed property to safely handle the classes
const topClasses = computed(() => {
  const classes = {
    // 'scrolled' is safe to evaluate immediately because its default (false) matches server
    scrolled: scrolled.value,
  };

  // Only add the locale-dependent class if the component has mounted
  if (isMounted.value) {
    if (locale.value === "en") {
      classes.en = true;
    }
  }
  return classes;
});

const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  scrolled.value = currentScrollY > 50;
};

onMounted(() => {
  isMounted.value = true;
  checkWindowSize();

  nextTick(() => {
    handleScroll();
  });

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
