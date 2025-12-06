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
    useIsDark().value
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.setAttribute("data-theme", "light");
  }
});
</script>

<style lang="scss" scoped></style>
