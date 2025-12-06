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

const titles = {
  en: "Ugarit Center",
  ar: "مركز أوغاريت",
};

// Update the title dynamically
useHead({
  title: computed(() => titles[locale.value]),
});
</script>

<style lang="scss" scoped></style>
