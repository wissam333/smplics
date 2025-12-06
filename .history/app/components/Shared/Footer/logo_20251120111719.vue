<template>
  <div class="logo" data-aos="fade-down">
    <nuxt-link to="/">
      <NuxtImg src="/logo/logo.png" loading="lazy" alt="Logo Image" />
    </nuxt-link>
    <div class="socials" :class="$i18n.locale === 'ar' ? 'ar' : ''">
      <div
        class="socials-img"
        v-for="social in useMenusSocial().value"
        :key="social.id"
        v-show="social.isActive"
      >
        <a :href="social?.urlField" target="_blank" class="mx-2">
          <Icon class="icon" :name="`mdi:${social.englishName}`" />
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
  img {
    width: 100%;
    // margin-top: -20px;
    @media (max-width: 1400px) {
      width: 250px;
    }
  }
  .socials {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    @media (max-width: 1200px) {
      flex-direction: row;
      margin-bottom: 50px;
    }

    &.ar {
      .socials-img {
        margin-left: 10px !important;
        margin-right: 0px !important;
      }

      @media (max-width: 991px) {
        justify-content: flex-end;
      }
    }

    .socials-img {
      margin-right: 10px;
      display: flex;
      justify-content: center;

      a {
        .icon {
          width: 30px;
          height: 30px;
          color: #fff;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          &:hover {
            color: $main;
          }
        }
      }

      img {
        width: 40px;
      }
    }
  }
}
</style>
