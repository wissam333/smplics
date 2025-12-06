const handleResetStorage = (startActivity) => {
  if (startActivity) {
    // 3600 : in seconds, for 1 hours :
    if (Date.now() - startActivity > 3600 * 3 * 1000) {
      localStorage.removeItem("startActivity");

      localStorage.removeItem("isDark");

      localStorage.setItem("startActivity", Date.now());
    }
  } else {
    localStorage.setItem("startActivity", Date.now());
  }
};

export default defineNuxtPlugin(async (nuxtApp) => {
  const startActivity = localStorage.getItem("startActivity");
  handleResetStorage(startActivity);

  // dark
  const isDark = localStorage.getItem("isDark");
  isDark === "true" ? (useIsDark().value = true) : false;
});
