<template>
  <div class="contact-wrapper">
    <h4 class="section-title" :class="{ ar: isArabic }">
      {{ isArabic ? "الاتصال بنا" : "Contact Us" }}
    </h4>

    <div class="contact-list">
      <div class="contact-item" v-if="contactData.info">
        <div class="icon-box"><Icon name="mdi:phone" /></div>
        <div class="info-text ltr-force">{{ contactData.info }}</div>
      </div>

      <div class="contact-item" v-if="contactData.info2">
        <div class="icon-box"><Icon name="mdi:phone" /></div>
        <div class="info-text ltr-force">{{ contactData.info2 }}</div>
      </div>

      <div class="contact-item" v-if="contactData.info3">
        <div class="icon-box"><Icon name="mdi:envelope" /></div>
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
</template>

<script setup>
const {
  public: { api },
} = useRuntimeConfig();
const { locale } = useI18n();
const isArabic = computed(() => locale.value === "ar");

const { data: pageDetails } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/3`
);

const contactData = ref({
  info: "",
  info2: "",
  info3: "",
  info4: "",
  info5: "",
});

// Watch for data changes and parse HTML safely
watchEffect(() => {
  if (!process.client || !pageDetails.value) return;

  const description =
    locale.value === "en"
      ? pageDetails.value.englishDescription1
      : pageDetails.value.description1;

  // if (!description) return;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, "text/html");
    const paragraphs = [...doc.querySelectorAll("p")].map((p) =>
      p.textContent.trim()
    );

    // Safety check to ensure array has enough items
    if (paragraphs.length >= 7) {
      contactData.value = {
        info: paragraphs[0],
        info2: paragraphs[1],
        info3: paragraphs[2],
        info4: paragraphs[3],
        info5: paragraphs[4],
      };
    }
  } catch (e) {
    console.error("Error parsing contact details", e);
  }
});
</script>

<style lang="scss" scoped>
.section-title {
  color: $main;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
  position: relative;
  display: inline-block;

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
}

.contact-item {
  display: grid;
  grid-template-columns: 25px 1fr; // Icon width + content
  gap: 10px;
  align-items: start;

  .icon-box {
    color: $main;
    font-size: 18px;
    display: flex;
    justify-content: center;
    margin-top: 2px; // Align with text top
  }

  .info-text {
    color: #ddd;
    font-size: 15px;
    line-height: 1.5;
    word-break: break-word;

    &.ltr-force {
      direction: ltr;
      text-align: left;
    }
  }
}

// RTL Adjustment for Contact Items
:global(.ar) .contact-item {
  .info-text.ltr-force {
    text-align: right;
  }
}
</style>
