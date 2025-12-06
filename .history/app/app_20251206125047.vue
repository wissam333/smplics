<template>
  <div>
    <ElementsLoader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div class="whatsupp pointer" :class="$i18n.locale === 'ar' ? 'ar' : ''">
    <a :href="`https://wa.me/+971585840433`" target="_blank" class="mx-2">
      <img src="/photos/whatsup.webp" loading="lazy" alt="Whatsup Image" />
    </a>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const titles = { en: "Smplics", ar: "سمبلكس" };
useHead({
  title: () => titles[locale.value],
});

onMounted(() => {
  if (process.client) {
    if (useIsDark().value) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("isDark", true);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("isDark", false);
    }
  }
});
</script>

<style lang="scss" scoped>
.whatsupp {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 26px;
  left: auto;
  bottom: 140px;
  z-index: 1001;
  transition: all 0.2s linear;
  background-color: #40cb5a;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.1);
  }

  &.ar {
    right: auto !important;
    left: 10px;
    bottom: 20px !important;
  }
  @media (max-width: 991px) {
    width: 43px;
    height: 43px;
    bottom: 130px;
    right: 10px;
    // &.ar {
    //   right: auto !important;
    //   left: 0px;
    // }
  }
  img {
    width: 35px;
    height: 35px;
  }
}
</style>
