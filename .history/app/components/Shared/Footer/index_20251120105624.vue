<template>
  <div class="bottom">
    <SharedFooterNewsLetter></SharedFooterNewsLetter>

    <div class="container">
      <div class="foot" :class="$i18n.locale === 'ar' ? 'ar' : ''">
        <SharedFooterLogo></SharedFooterLogo>
        <SharedFooterLinks></SharedFooterLinks>
        <SharedFooterContactInfo></SharedFooterContactInfo>
      </div>
    </div>

    <SharedFooterCopyRight></SharedFooterCopyRight>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bottom {
  position: relative;
  background-color: #000;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  border-top: 2px solid $main;

  .foot {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 8px;
    align-items: start;
    justify-items: center;
    color: $main;
    position: relative;
    padding: 30px 0px;
    column-gap: 40px;
    z-index: 10;

    @media (max-width: 991px) {
      grid-template-columns: 1fr;
      justify-items: start;
      gap: 30px;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      justify-items: start;
      padding: 30px 0px;
    }
  }
}
</style>
