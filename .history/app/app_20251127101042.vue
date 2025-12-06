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

// SSR-friendly global data fetching
const { data: initialData, error } = await useAsyncData(
  "globalData",
  async () => {
    const MainMenueURL = `${api.GetMenuDetail}?categoryId=1&pageSize=1000`;
    const MainSliderURL = `${api.Blocks}?categoryId=1&pageSize=1000`;
    const SocialsURL = `${api.GetMenuDetail}?categoryId=2&pageSize=1000`;

    const [MainMenueRes, MainSliderRes, SocialsRes] = await Promise.all([
      $fetch(MainMenueURL, { baseURL: apiBase }),
      $fetch(MainSliderURL, { baseURL: apiBase }),
      $fetch(SocialsURL, { baseURL: apiBase }),
    ]);

    return {
      menu: MainMenueRes,
      slider: MainSliderRes,
      socials: SocialsRes,
    };
  }
);

// Store globally **during SSR**
if (initialData.value) {
  const activeSortedMenus = initialData.value.menu.items
    .filter((i) => i.isActive)
    .sort((a, b) => a.levelOrder - b.levelOrder);

  useMenus().value = activeSortedMenus;
  useMainSlider().value = initialData.value.slider.items;
  useMenusSocial().value = initialData.value.socials;
}

// Title
const titles = { en: "Nerva", ar: "نيرفا" };
useHead({ title: () => titles[locale.value] });
</script>

<style lang="scss" scoped></style>
