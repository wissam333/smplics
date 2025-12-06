<template>
  <div class="about-section py-5">
    <div class="container">
      <div v-if="pending">
        <ElementsSpinner></ElementsSpinner>
      </div>
      <div v-else class="row align-items-center">
        <div
          class="col-lg-6 mb-4 mb-lg-0"
          :data-aos="$i18n.locale === 'ar' ? 'fade-left' : 'fade-right'"
        >
          <div class="about-image-stack">
            <img
              class="w-100 main-image"
              :src="apiBase + data.image"
              alt="About Us"
              loading="lazy"
            />
          </div>
        </div>

        <div
          class="col-lg-6"
          :data-aos="$i18n.locale === 'ar' ? 'fade-right' : 'fade-left'"
        >
          <div class="about-content">
            <h4 class="subheading" :data-aos-delay="200">
              {{ $t("Get to Know") }}
            </h4>
            <h2 class="title fw-bold mb-4">
              <span class="text-secondary-bg">
                {{ $i18n.locale === "en" ? "About" : "من" }}
              </span>
              <span class="text-main">
                {{ $i18n.locale === "en" ? " Us" : " نحن " }}
              </span>
            </h2>

            <div
              class="desc lead mb-4"
              v-html="
                useTruncateDescription(
                  $i18n.locale === 'en'
                    ? data.englishDescription1
                    : data.description1,
                  70 // Increased truncate length for better context
                )
              "
            ></div>

            <nuxt-link to="/about-us" class="cta-button">
              {{ $t("Read More") }}
              <Icon
                name="material-symbols:arrow-forward-rounded"
                size="20px"
                class="ms-1"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();

// Use useAsyncData for SSR support and better error handling/loading state
const { data, pending } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/1`
);
</script>
<style lang="scss" scoped>
$main-color: #3f51b5; // Example: Deep Blue (Replace with your $main)
$secondary-color: #f5f5f5; // Example: Light Background
$text-color: #333;
$transition-speed: 0.4s;

.about-section {
  padding: 80px 0; // Increased padding for better separation
  background-color: #ffffff; // Ensure background is white for contrast

  .about-content {
    color: $text-color;

    .subheading {
      font-size: 16px;
      font-weight: 600;
      color: $main-color;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 5px;
      position: relative;
      padding-inline-start: 15px;

      // Decoration: Vertical line next to the subheading
      &::before {
        content: "";
        position: absolute;
        inset-inline-start: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: $main-color;
        border-radius: 2px;
      }
    }

    .title {
      font-size: 40px;
      margin-top: 12px;
      // Decoration: Subtle background box for the primary word
      .text-secondary-bg {
        padding: 5px 10px;
        background-color: rgba($main-color, 0.1); // Light tint of main color
        border-radius: 4px;
        color: $text-color;
      }
      .text-main {
        color: $main-color;
      }
    }

    .desc {
      font-size: 16px;
      line-height: 1.8;
      color: #666;
    }
  }

  // --- CTA Button Styling ---
  .cta-button {
    display: inline-flex;
    align-items: center;
    padding: 12px 30px;
    margin-top: 15px;
    background-color: $main-color;
    color: #ffffff;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all $transition-speed ease;
    box-shadow: 0 5px 15px rgba($main-color, 0.3);

    &:hover {
      background-color: $main-color;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba($main-color, 0.4);
    }
  }

  // --- Image Decoration (Layered Effect) ---
  .about-image-stack {
    position: relative;
    padding: 30px; // Space for the pseudo-element decoration

    .main-image {
      display: block;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      position: relative;
      z-index: 2;
    }

    // Decoration: Background layer (old decoration improved)
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $secondary-color; // Solid color for depth
      border-radius: 8px;
      z-index: 1;
      // Offset position for the layered effect
      transform: translate(20px, 20px);
    }

    // Decoration: Small accent square (New)
    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 50px;
      height: 50px;
      background-color: $main-color;
      opacity: 0.8;
      border-radius: 4px;
      z-index: 3;
    }
  }

  // Responsive adjustments for the image decoration
  @media (max-width: 991px) {
    .about-image-stack {
      padding: 15px;
      &::before {
        transform: translate(10px, 10px);
      }
      &::after {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
