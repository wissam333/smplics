export default defineNuxtPlugin(async ({ $i18n }) => {
  const i18n = nuxtApp.$i18n;
  const savedLanguage = localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : i18n.defaultLocale;
  i18n.locale.value = savedLanguage;

  if (!$i18n?.messages?.value?.[$i18n.locale.value]) {
    await $i18n.loadLocaleMessages($i18n.locale.value);
  }
});
