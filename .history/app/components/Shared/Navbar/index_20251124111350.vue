<template>
  <div class="navbar-wrapper">
    <div
      class="top"
      :class="{
        en: isMounted && $i18n.locale === 'en',
        scrolled: scrolled,
      }"
    >
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
import { nextTick } from 'vue';
import { ref, onMounted, onUnmounted } from 'vue'; // Ensure these are imported if not auto-imported by Nuxt

// Access the reactive global locale state
const { locale: globalLocale } = useI18n(); 

// 🚨 NEW: Local variable for locale state, defaults to the SERVER/initial value
const clientLocale = ref(globalLocale.value); 

let mobile = ref(false);
let scrolled = ref(false);
const isMounted = ref(false);

provide("scrolled", scrolled);

const checkWindowSize = () => {
  mobile.value = window.matchMedia("(max-width: 1250px)").matches;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  scrolled.value = currentScrollY > 50;
};

onMounted(() => {
  // 1. Set mounted state first
  isMounted.value = true;
  
  // 🚨 CRITICAL FIX: Update the local locale state AFTER mounting.
  // This value will now reflect the client's detected language (from cookie/storage).
  clientLocale.value = globalLocale.value; 

  // 2. Check window size 
  checkWindowSize();
  
  // 3. Check scroll state after next tick (to avoid 'scrolled' class conflict)
  nextTick(() => {
      handleScroll(); 
  });

  // 4. Add listeners
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
