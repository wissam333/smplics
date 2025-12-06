const handleResetStorage = (startActivity) => {
  if (startActivity) {
    // 3600 : in seconds, for 1 hours :
    if (Date.now() - startActivity > 3600 * 3 * 1000) {
      localStorage.removeItem("startActivity");
      localStorage.removeItem("token");
      localStorage.removeItem("accountType");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
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
  const token =
    localStorage.getItem("token") != "undefined"
      ? localStorage.getItem("token")
      : null;
  const userInfo =
    localStorage.getItem("userInfo") != "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
  const accountType =
    localStorage.getItem("accountType") != "undefined"
      ? localStorage.getItem("accountType")
      : null;
  if (!token || !userInfo || !accountType) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accountType");
    useToken().value = null;
    useMainToken().value = null;
    useAuth().value.isAuthenticated = false;
    useUserInfo().value = null;
    useUserInfo().value = null;
    useAccountType().value = null;
  } else {
    // make global isAuthenticated state true
    useAuth().value.isAuthenticated = token ? true : false;
    // store Token in the store
    useToken().value = token;
    useMainToken().value = token;
    // store userinfo in the store
    useUserInfo().value = userInfo;
    // Store account type in store
    useAccountType().value = accountType;
  }
  // dark
  const isDark = localStorage.getItem("isDark");
  useIsDark().value = isDark;
});
