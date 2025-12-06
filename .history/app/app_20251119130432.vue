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
const {
  public: { api, apiBase },
} = useRuntimeConfig();

onMounted(async () => {
  try {
    const MainMenueURL = `${api.GetMenuDetail}?categoryId=1&pageSize=1000`;
    const MainSliderURL = `${api.Blocks}?categoryId=1&pageSize=1000`;
    const SocialsURL = `${api.GetMenuDetail}?categoryId=3&pageSize=1000`;

    const [MainMenueRes, MainSliderRes, SocialsRes, ProductsCategoriesRes] =
      await Promise.all([
        $fetch(MainMenueURL, {
          baseURL: apiBase,
        }),
        $fetch(MainSliderURL, {
          baseURL: apiBase,
        }),
        $fetch(SocialsURL, {
          baseURL: apiBase,
        }),
      ]);

    if (MainMenueRes) {
      const activeSortedMenus = MainMenueRes.items
        .filter((item) => item.isActive)
        .sort((a, b) => a.levelOrder - b.levelOrder);
      useMenus().value = activeSortedMenus;
    }
    if (MainSliderRes) {
      useMainSlider().value = MainSliderRes.items;
    }
    if (SocialsRes) {
      useMenusSocial().value = SocialsRes.items;
    }
  } catch (error) {
    console.error("Failed to fetch main apis", error);
  }
});

const titles = {
  en: "Nerva",
  ar: "نيرفا",
};

// Update the title dynamically
useHead({
  title: computed(() => titles[locale.value]),
});
</script>

<style lang="scss" scoped></style>
