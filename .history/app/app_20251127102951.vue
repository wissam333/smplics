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
    const MainMenueURL = `https://admin.nerva-online.com/api/v1/menus/GetMenuMaster?categoryId=1&pageSize=1000`;
    const MainSliderURL = `https://admin.nerva-online.com/api/blocks?categoryId=1&pageSize=1000`;
    const SocialsURL = `https://admin.nerva-online.com/api/v1/menus/GetMenuMaster?categoryId=2&pageSize=1000`;

    const fetchOptions = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://nerva-online.com",
      },
    };

    try {
      const [MainMenueRes, MainSliderRes, SocialsRes] = await Promise.all([
        $fetch(MainMenueURL, fetchOptions),
        $fetch(MainSliderURL, fetchOptions),
        $fetch(SocialsURL, fetchOptions),
      ]);

      console.log("SSR MENU Response:", MainMenueRes);
      console.log("SSR SLIDER Response:", MainSliderRes);
      console.log("SSR SOCIALS Response:", SocialsRes);

      return {
        menu: MainMenueRes,
        slider: MainSliderRes,
        socials: SocialsRes,
      };
    } catch (err) {
      console.error("SSR FETCH ERROR:", err);
      return { menu: null, slider: null, socials: null };
    }
  },
  { server: false }
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
