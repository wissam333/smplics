export const useGetSiteApi = () => {
  const {
    public: { apiBase, cachedTime },
  } = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const token = useMainToken(); // Get the ref

  const handleCachingDataTime = (key) => {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    if (!data) return;

    // Check if data is expired
    const expirationDate = new Date(data.fetchedAt);
    expirationDate.setTime(expirationDate.getTime() + cachedTime);
    const isExpired = expirationDate.getTime() < Date.now();

    if (isExpired) return;
    return data;
  };

  const _fetch = (url, options = {}) => {
    const { isServer = true, isLazy = false, ...extraOptions } = options;

    return useFetch(url, {
      key: typeof url === "function" ? url() : url,
      baseURL: apiBase ?? "https://admin.marbeyacharm.net",
      server: isServer,
      lazy: isLazy,
      headers: {
        "Accept-Language": "en-US",
        Authorization: token.value ? `Bearer ${token.value}` : undefined,
        ...extraOptions.headers, // Allow overriding headers if needed
      },
      transform(input) {
        return {
          ...input,
          fetchedAt: new Date(),
        };
      },
      getCachedData(key) {
        return handleCachingDataTime(key);
      },
      ...extraOptions,
    });
  };

  // --- 3. Public Methods ---

  const GetAll = (endpoint, options = {}) => {
    return _fetch(endpoint, options);
  };

  const GetById = (endpointWithoutId, id, options = {}) => {
    // Handle dynamic ID reactively
    return _fetch(() => `${endpointWithoutId}${unref(id)}`, options);
  };

  return {
    GetAll,
    GetById,
  };
};
