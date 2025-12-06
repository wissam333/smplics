<template>
  <div class="banner" :dir="isRtl ? 'rtl' : 'ltr'">
    <img src="/banner.jpg" :alt="t.imgAlt" />

    <div class="info">
      <h2>{{ t.title }}</h2>

      <p>{{ t.subtitle }}</p>

      <button>{{ t.buttonText }}</button>
    </div>
  </div>
    <div></div>
</template>

<script setup>
const { locale } = useI18n();

const isRtl = computed(() => locale.value === "ar");

const translations = {
  en: {
    title: "Explore Our Vision and Capabilities",
    subtitle:
      "Download the comprehensive Nerv Company Profile to learn more about our services and expertise.",
    buttonText: "Download Now",
    imgAlt: "Company Banner Background",
  },
  ar: {
    title: "اكتشف رؤيتنا وقدراتنا", // Discover our vision and capabilities
    subtitle:
      "قم بتنزيل ملف تعريف شركة نيرف الشامل لمعرفة المزيد حول خدماتنا وخبراتنا.", // Download the comprehensive Nerv Company Profile to learn more about our services and expertise.
    buttonText: "حمّل الآن", // Download Now
    imgAlt: "خلفية إعلانية للشركة",
  },
};

const t = computed(() => translations[locale.value] || translations.en);
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100vw;
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    @media (max-width: 991px) {
      height: 400px;
    }
  }

  .info {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    color: white;
    text-align: center;
    padding: 20px;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

      @media (max-width: 600px) {
        font-size: 1.5rem;
      }
    }

    p {
      max-width: 600px;
      margin-top: 5px;
      margin-bottom: 25px;
      font-size: 1.1rem;
      line-height: 1.5;

      @media (max-width: 600px) {
        font-size: 0.9rem;
      }
    }

    button {
      background-color: transparent;
      padding: 12px 35px;
      border: 2px solid #fff;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #fff;
        color: #000;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

// RTL specific adjustments for text alignment if needed,
// though 'text-align: center' should handle most cases.
[dir="rtl"] {
  .info {
    text-align: center;
    h2,
    p {
      direction: rtl;
    }
  }
}
</style>
