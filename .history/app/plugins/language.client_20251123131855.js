export default defineNuxtPlugin(async ({ $i18n }) => {
  if (!$i18n?.messages?.value?.[$i18n.locale.value]) {
    await $i18n.loadLocaleMessages($i18n.locale.value);
  }
});
