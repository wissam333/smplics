<template>
  <div>
    <ElementsLoader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
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

<style lang="scss" scoped></style>
