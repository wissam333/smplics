<template>
  <div class="copyright-bar">
    <div class="container">
      <p>
        &copy; {{ new Date().getFullYear() }}
        <span class="brand-name">
          {{ isArabic ? "نيرفا" : "Nerva" }}
        </span>
        .
        {{ isArabic ? " كل الحقوق محفوظة." : "All Rights Reserved." }}
      </p>
    </div>
  </div>
  <div></div>
</template>

<script setup>
const { locale } = useI18n();
const isArabic = computed(() => locale.value === "ar");
</script>

<style lang="scss" scoped>
.copyright-bar {
  background-color: #000; // Darker than main footer
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 0;
  text-align: center;

  p {
    margin: 0;
    color: #888;
    font-size: 14px;
  }

  .brand-name {
    color: $main;
    font-weight: 600;
    margin: 0 4px;
  }

  @media (max-width: 768px) {
    p {
      font-size: 12px;
    }
  }
}
</style>
