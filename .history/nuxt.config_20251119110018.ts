// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "nuxt-swiper",
    "@nuxt/icon",
    "nuxt-aos",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
  ],
  veeValidate: {
    autoImports: true,
  },
  i18n: {
    strategy: "no_prefix", // بدون تغيير في الرابط
    langDir: "locales/",
    defaultLocale: "en",
    locales: [
      {
        code: "ar",
        iso: "ar-EG",
        name: "العربية",
        file: "ar.json",
        dir: "rtl",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
        dir: "ltr",
      },
    ],
    detectBrowserLanguage: false,
  },
});
