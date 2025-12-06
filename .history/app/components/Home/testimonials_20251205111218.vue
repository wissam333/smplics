<template>
  <section
    class="testimonials-section relative overflow-hidden"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="text-center mb-16 max-w-4xl mx-auto">
        <h2 class="section-title fade-in" style="--delay: 0.1s">
          {{ $t("testimonials_title_1", "Why customers love") }}
          <span class="highlight">{{
            $t("testimonials_title_2", "working with us")
          }}</span>
        </h2>
      </div>

      <div class="carousel-wrapper fade-in" style="--delay: 0.3s">
        <button class="custom-nav-btn prev-btn">
          <Icon name="ph:arrow-left-bold" />
        </button>
        <button class="custom-nav-btn next-btn">
          <Icon name="ph:arrow-right-bold" />
        </button>

        <Swiper
          :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :pagination="{
            el: '.custom-pagination',
            clickable: true,
          }"
          :navigation="{
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
          }"
          class="testimonials-swiper"
        >
          <SwiperSlide v-for="(item, index) in testimonials" :key="index">
            <div class="testimonial-card">
              <div class="quote-icon top-left">
                <Icon name="ph:quotes-fill" />
              </div>

              <div class="card-content">
                <p class="testimonial-text">
                  {{ item.text }}
                </p>

                <div class="author-info" v-if="item.author">
                  <h4 class="author-name">{{ item.author }}</h4>
                  <span class="author-role">{{ item.role }}</span>
                </div>
              </div>

              <div class="quote-icon bottom-right">
                <Icon name="ph:quotes-fill" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="custom-pagination"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import Swiper and Styles
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Renaming modules for cleaner template usage
const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;

const { t } = useI18n();
const isDark = useIsDark();

const testimonials = [
  {
    text: "Without any doubt I recommend Smplics as one of the best web design and digital marketing agencies. One of the best agencies I've came across so far. Wouldn't be hesitated to introduce their work to someone else.",
    author: "Sarah Jenkins",
    role: "CEO, TechFlow",
  },
  {
    text: "The team understood our vision immediately. The execution was flawless, and the final product exceeded our expectations in both performance and aesthetics.",
    author: "Michael Ross",
    role: "Founder, StartUp Inc",
  },
  {
    text: "Professional, creative, and incredibly responsive. They didn't just build a website; they built a brand identity that truly resonates with our audience.",
    author: "Ahmed Hassan",
    role: "Marketing Director",
  },
];
</script>

<style lang="scss" scoped>
.testimonials-section {
  padding: 100px 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease;

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 60px;
    .highlight {
      color: var(--accent-color);
    }

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
}

/* --- Carousel Wrapper --- */
.carousel-wrapper {
  position: relative;
  max-width: 900px; /* Constrain width to look like card in image */
  margin: 0 auto;
  padding: 0 4rem; /* Make space for arrows */

  @media (max-width: 768px) {
    padding: 0;
  }
}

/* --- The Card --- */
.testimonial-card {
  background-color: var(--card-bg); /* Use specific card bg from vars */
  /* If card-bg is same as body, we might need a distinct dark shade like the image */
  /* Forcing a dark shade if theme is dark to match the black card in screenshot: */
  [data-theme="dark"] & {
    background-color: #0f0f0f; /* Or slightly darker than main bg */
  }

  padding: 4rem 3rem;
  border-radius: 8px; /* Sharp but slightly rounded corners */
  text-align: center;
  position: relative;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    padding: 3rem 1.5rem;
  }
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.8;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  z-index: 2;
  position: relative;
}

.author-info {
  margin-top: 1rem;

  .author-name {
    font-weight: 700;
    color: var(--accent-color);
    font-size: 1rem;
  }

  .author-role {
    font-size: 0.85rem;
    opacity: 0.7;
  }
}

/* --- Decoration Icons (Quotes) --- */
.quote-icon {
  position: absolute;
  color: var(--accent-color);
  font-size: 2rem;
  opacity: 1;

  &.top-left {
    top: 2rem;
    left: 2rem;
    transform: rotate(180deg); /* Flip for opening quote */
  }

  &.bottom-right {
    bottom: 2rem;
    right: 2rem;
  }
}

/* --- Custom Navigation Buttons --- */
.custom-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 15px rgba(238, 118, 57, 0.4);
  }

  &.prev-btn {
    left: 0;
  }

  &.next-btn {
    right: 0;
  }

  /* Hide arrows on mobile, rely on dots/swipe */
  @media (max-width: 768px) {
    display: none;
  }
}

/* --- Pagination (Dots) --- */
.custom-pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 8px;

  /* Targeting Swiper's internal classes for customization */
  :deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    background-color: var(--text-color);
    opacity: 0.3;
    transition: all 0.3s ease;
    margin: 0 !important;
  }

  :deep(.swiper-pagination-bullet-active) {
    background-color: var(--accent-color);
    opacity: 1;
    width: 12px;
    height: 12px;
  }
}

/* --- Animation --- */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s cubic-bezier(0.5, 0, 0, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
