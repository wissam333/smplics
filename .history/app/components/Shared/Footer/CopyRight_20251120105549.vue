<template>
  <div class="c">
    <p>
      &copy;
      <span class="name">
        {{
          $i18n.locale === "ar" ? "المتحدون للديكور" : "Al Motthedon For Decor"
        }}
      </span>
      {{ new Date().getFullYear() }}.
      {{
        $i18n.locale === "ar" ? " كل الحقوق محفوظة." : "All Rights Reserved."
      }}
    </p>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.c {
  color: #fff;
  font-size: 15px;
  text-align: center;
  padding-bottom: 10px;
  margin: 0px 0px 0px 0px;
  padding-top: 24px;
  border-top: 1px solid #eee;
  // background: linear-gradient(to left, $main, $second, $main);
  background: #000;

  @media (max-width: 768px) {
    width: 100vw;
    margin: 60px 0px 0px 0px;
    font-size: 13px;
  }

  .name {
    color: #fff;
    font-weight: bold;
  }
}
</style>
