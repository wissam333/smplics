<template>
  <div class="contact-wrapper">
    <h4 class="section-title" :class="{ ar: isArabic }">
      {{ isArabic ? "الاتصال بنا" : "Contact Us" }}
    </h4>

    <div class="contact-list">
      <div class="contact-item" v-if="contactData.info">
        <div class="icon-box"><Icon name="mdi:globe" /></div>
        <div class="info-text ltr-force">{{ contactData.info }}</div>
      </div>

      <div class="contact-item" v-if="contactData.info2">
        <div class="icon-box"><Icon name="mdi:phone" /></div>
        <div class="info-text ltr-force">{{ contactData.info2 }}</div>
      </div>

      <div class="contact-item" v-if="contactData.info3">
        <div class="icon-box"><Icon name="mdi:mailbox" /></div>
        <div class="info-text">{{ contactData.info3 }}</div>
      </div>

      <div class="contact-item" v-if="contactData.info4">
        <div class="icon-box"><Icon name="mdi:map-marker" /></div>
        <div class="info-text">{{ contactData.info4 }}</div>
      </div>

      <div class="contact-item" v-if="contactData.info5">
        <div class="icon-box"><Icon name="mdi:web" /></div>
        <div class="info-text">{{ contactData.info5 }}</div>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup>
const {
  public: { api },
} = useRuntimeConfig();
const { locale } = useI18n();
const isArabic = computed(() => locale.value === "ar");

// Use useAsyncData for better hydration mismatch handling
const { data: pageDetails } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/3`
);

// COMPUTED: This runs on Server AND Client.
// No layout shift because HTML arrives populated.
const contactData = computed(() => {
  if (!pageDetails.value) return {};
  useMap().value = pageDetails.value.geoLocation;
  const description =
    locale.value === "en"
      ? pageDetails.value.englishDescription1
      : pageDetails.value.description1;

  if (!description) return {};

  try {
    // Regex matches content between <p> tags.
    // Works in Node.js (Server) and Browser.
    const matches = [...description.matchAll(/<p[^>]*>(.*?)<\/p>/g)].map((m) =>
      m[1].trim()
    );

    if (matches.length) {
      return {
        info: matches[0] || "",
        info2: matches[1] || "",
        info3: matches[2] || "",
        info4: matches[3] || "",
        info5: matches[4] || "",
      };
    }
  } catch (e) {
    console.error("Error parsing contact details", e);
  }
  return {};
});
</script>

<style lang="scss" scoped>
/* Same styles as before */
.section-title {
  color: $main;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
  position: relative;
    text-align: start;
  &.ar {
    font-family: "alinma", sans-serif;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: $main;
  }

  &.ar::after {
    left: auto;
    right: 0;
  }
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 200px; // PERFORMANCE FIX: Reserve space just in case data is slow
}

.contact-item {
  display: grid;
  grid-template-columns: 25px 1fr;
  gap: 10px;
  align-items: start;

  .icon-box {
    color: $main;
    font-size: 18px;
    display: flex;
    justify-content: center;
    margin-top: 2px;
    // Fix: prevent icon from collapsing
    width: 25px;
    height: 25px;
  }

  .info-text {
    color: #ddd;
    font-size: 15px;
    line-height: 1.5;
    word-break: break-word;
    text-align: start;
  }
}
</style>
