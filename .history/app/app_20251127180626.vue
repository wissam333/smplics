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

const globalData = useState("globalDataCache", () => null);

/* -----------------------------------------------------------
   LOAD DATA ONLY IF CACHE IS EMPTY
   (Runs ONLY on server because of import.meta.server)
----------------------------------------------------------- */
if (!globalData.value && import.meta.server) {
  console("============================")
  const { data, error } = await useAsyncData("globalData", async () => {
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

      return {
        menu: MainMenueRes,
        slider: MainSliderRes,
        socials: SocialsRes,
      };
    } catch (err) {
      console.error("SSR FETCH ERROR:", err);
      return { menu: null, slider: null, socials: null };
    }
  });

  globalData.value = data.value;
}

/* -----------------------------------------------------------
   NOW globalData.value IS ALWAYS AVAILABLE
   - From cache (fast)
   - Or fetched once (SSR)
----------------------------------------------------------- */
if (globalData.value) {
  const activeSortedMenus = globalData.value.menu.items
    ?.filter((i) => i.isActive)
    .sort((a, b) => a.levelOrder - b.levelOrder);

  useMenus().value = activeSortedMenus || [];
  useMainSlider().value = globalData.value.slider.items || [];
  useMenusSocial().value = globalData.value.socials || [];
}

/* -----------------------------------------------------------
   PAGE TITLE
----------------------------------------------------------- */
const titles = { en: "Nerva", ar: "نيرفا" };
useHead({
  title: () => titles[locale.value],
});
</script>

<style lang="scss" scoped></style>
