<template>
  <ClientOnly>
    <button
      class="aesthetic-btn-icon"
      @click="toggleLang"
      title="Switch Language"
    >
      <Icon name="i-ph-translate-bold" size="22" />
      <span class="lang-indicator">{{ $i18n.locale.toUpperCase() }}</span>
    </button>
    <template #fallback>
      <div class="pointer changelan" :style="`color: ${color};`">
        <span style="opacity: 0">...</span>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
const { locale, setLocale } = useI18n();

const toggleLang = () => {
  const newLang = locale.value === "ar" ? "en" : "ar";
  setLocale(newLang);
};
</script>

<style lang="scss" scoped>
.changelan {
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
  &.en {
    font-family: alinma, "Arial", "sans-serif";
  }
  &.ar {
    font-family: Poppins, sans-serif;
  }
}

.aesthetic-btn-icon {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-color); // Icon color
  /* Common styling for icon buttons */
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover,
  &.active {
    // Hover background using a fixed transparent accent color tint
    background-color: rgba(127, 90, 240, 0.1);

    color: var(--accent-color);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
}
.lang-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 0.5rem;
  font-weight: 900;
  background: var(--text-color);
  color: var(--card-bg); // Use card-bg for high contrast text on the indicator
  padding: 1px 3px;
  border-radius: 4px;
}
</style>
