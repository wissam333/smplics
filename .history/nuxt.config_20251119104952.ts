// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    'nuxt-swiper',
    '@nuxt/icon',
    'nuxt-aos',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/i18n'
  ]
})