<template>
  <section
    class="testimonials-section relative overflow-hidden py-5"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <!-- Animated background elements - Simplified for mobile -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="floating-shapes shape-1"></div>
      <div class="floating-shapes shape-2"></div>
      <div class="particle-bg"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header - Improved for mobile -->
      <div class="text-center mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto">
        <div class="inline-block mb-3 sm:mb-4">
          <div class="accent-badge fade-in" style="--delay: 0.1s">
            {{ $t("testimonials_subtitle", "Client Stories") }}
          </div>
        </div>

        <h2 class="section-title fade-in" style="--delay: 0.2s">
          <span class="title-line block mb-1 sm:mb-2">{{
            $t("testimonials_title_1", "Why customers love")
          }}</span>
          <span class="highlight-gradient">{{
            $t("testimonials_title_2", "working with us")
          }}</span>
        </h2>

        <p class="section-subtitle fade-in" style="--delay: 0.3s">
          {{
            $t(
              "testimonials_description",
              "Real feedback from amazing clients who trusted our process"
            )
          }}
        </p>
      </div>

      <!-- Testimonials Carousel -->
      <div class="relative max-w-6xl mx-auto">
        <!-- Decorative elements - Hidden on mobile -->
        <div class="decorative-corner top-left hidden sm:block"></div>
        <div class="decorative-corner top-right hidden sm:block"></div>
        <div class="decorative-corner bottom-left hidden sm:block"></div>
        <div class="decorative-corner bottom-right hidden sm:block"></div>

        <!-- Navigation Buttons - Mobile optimized -->
        <button class="custom-nav-btn prev-btn mobile-nav-btn">
          <div class="nav-btn-content">
            <Icon name="ph:arrow-left" class="nav-icon" />
          </div>
        </button>

        <button class="custom-nav-btn next-btn mobile-nav-btn">
          <div class="nav-btn-content">
            <Icon name="ph:arrow-right" class="nav-icon" />
          </div>
        </button>

        <!-- Swiper Container -->
        <div class="testimonial-carousel-wrapper fade-in" style="--delay: 0.4s">
          <Swiper
            :modules="[
              SwiperAutoplay,
              SwiperPagination,
              SwiperNavigation,
              SwiperEffectCreative,
            ]"
            :slides-per-view="1"
            :space-between="20"
            :loop="true"
            :autoplay="{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
            :effect="'creative'"
            :creative-effect="{
              prev: {
                shadow: false,
                translate: ['0%', 0, -100],
                opacity: 0.5,
              },
              next: {
                shadow: false,
                translate: ['0%', 0, -100],
                opacity: 0.5,
              },
            }"
            :pagination="{
              el: '.custom-pagination',
              clickable: true,
              dynamicBullets: true,
              renderBullet: renderBullet,
            }"
            :navigation="{
              nextEl: '.next-btn',
              prevEl: '.prev-btn',
            }"
            :breakpoints="{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
            }"
            class="testimonials-swiper"
          >
            <SwiperSlide v-for="(item, index) in testimonials" :key="index">
              <div class="testimonial-card-wrapper">
                <!-- Card Glow Effect - Reduced on mobile -->
                <div class="card-glow"></div>

                <!-- Main Card -->
                <div class="testimonial-card">
                  <!-- Client Avatar & Info -->
                  <div class="client-header">
                    <div class="client-avatar">
                      <div class="avatar-inner">
                        <div class="avatar-placeholder">
                          {{ getInitials(item.author) }}
                        </div>
                        <div class="avatar-ring"></div>
                        <div class="verified-badge">
                          <Icon name="ph:check-circle-fill" />
                        </div>
                      </div>
                    </div>

                    <div class="client-info">
                      <h4 class="author-name">{{ item.author }}</h4>
                      <span class="author-role">{{ item.role }}</span>
                      <div class="client-rating">
                        <Icon
                          name="ph:star-fill"
                          v-for="star in 5"
                          :key="star"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Quote Content -->
                  <div class="quote-content">
                    <div class="quote-icon opening">
                      <Icon name="ph:quotes-fill" />
                    </div>

                    <p class="testimonial-text">
                      {{ item.text }}
                    </p>

                    <div class="quote-icon closing">
                      <Icon name="ph:quotes-fill" />
                    </div>
                  </div>

                  <!-- Card Footer - Stacked on mobile -->
                  <div class="card-footer">
                    <div class="project-info">
                      <Icon name="ph:briefcase" class="mr-2" />
                      <span>Successfully Completed</span>
                    </div>
                    <div class="date-info">
                      <Icon name="ph:calendar" class="mr-2" />
                      <span>{{ getRandomDate() }}</span>
                    </div>
                  </div>

                  <!-- Background Pattern - Lighter on mobile -->
                  <div class="card-pattern"></div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <!-- Custom Pagination -->
          <div class="custom-pagination"></div>
        </div>

        <!-- Mobile Indicators -->
        <div class="mobile-indicators sm:hidden mt-6">
          <div class="flex items-center justify-center space-x-2">
            <div
              v-for="(item, index) in testimonials"
              :key="index"
              class="h-1 w-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-all duration-300"
              :class="{
                'w-12 bg-orange-500 dark:bg-orange-600': activeIndex === index,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCreative,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ref, onMounted } from "vue";

const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;
const SwiperEffectCreative = EffectCreative;

const { t } = useI18n();
const isDark = useIsDark();
const activeIndex = ref(0);

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
  {
    text: "Their attention to detail and commitment to excellence is unmatched. The project was delivered on time and beyond our expectations.",
    author: "Jessica Lee",
    role: "Product Manager, Innovate Corp",
  },
];

// Helper functions
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getRandomDate = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[Math.floor(Math.random() * months.length)];
  const year = 2023 + Math.floor(Math.random() * 2);
  return `${month} ${year}`;
};

// Custom bullet renderer
const renderBullet = (index, className) => {
  return `<span class="${className}">
    <div class="bullet-inner"></div>
  </span>`;
};

// Update active index for mobile indicators
const updateActiveIndex = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

onMounted(() => {
  // Add touch improvements
  const swiperEl = document.querySelector(".testimonials-swiper");
  if (swiperEl) {
    swiperEl.addEventListener("touchstart", () => {
      swiperEl.style.cursor = "grabbing";
    });

    swiperEl.addEventListener("touchend", () => {
      swiperEl.style.cursor = "grab";
    });
  }
});
</script>

<style lang="scss" scoped>
$accent: #ee7639;
$dark-bg: #181815;
$dark-card: #1e1e1b;
$light-bg: #ffffff;
$light-card: #f3f4f6;

.testimonials-section {
  position: relative;
  transition: background-color 0.3s ease;

  &.dark-mode {
    background-color: $dark-bg;
    color: white;

    .testimonial-card {
      background: linear-gradient(145deg, $dark-card 0%, #1a1a17 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);

      &::before {
        background: linear-gradient(
          90deg,
          transparent,
          rgba($accent, 0.1),
          transparent
        );
      }
    }

    .section-subtitle {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &.light-mode {
    background-color: $light-bg;
    color: #1a1a1a;

    .testimonial-card {
      background: linear-gradient(145deg, $light-card 0%, #ffffff 100%);
      border: 1px solid rgba(0, 0, 0, 0.05);

      &::before {
        background: linear-gradient(
          90deg,
          transparent,
          rgba($accent, 0.05),
          transparent
        );
      }
    }

    .section-subtitle {
      color: #666;
    }
  }
}

/* Section Header - Mobile Optimized */
.accent-badge {
  display: inline-block;
  color: $accent;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.75rem;
  padding: 4px 12px;
  background: rgba($accent, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: 0.9rem;
    padding: 6px 16px;
  }
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.75rem;

  @media (min-width: 640px) {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }

  .highlight-gradient {
    background: linear-gradient(90deg, $accent, $accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: inline-block;
  }
}

.section-subtitle {
  font-size: 0.875rem;
  line-height: 1.5;
  max-width: 90%;
  margin: 0 auto;
  padding: 0 0.5rem;

  @media (min-width: 640px) {
    font-size: 1rem;
    max-width: 600px;
    padding: 0;
  }
}

/* Floating Background Shapes - Reduced for mobile */
.floating-shapes {
  position: absolute;
  border-radius: 50%;
  opacity: 0.03;
  z-index: 1;

  &.shape-1 {
    width: 200px;
    height: 200px;
    background: $accent;
    top: -100px;
    right: -50px;
    animation: float 20s ease-in-out infinite;

    @media (min-width: 768px) {
      width: 400px;
      height: 400px;
      top: -200px;
      right: -100px;
    }
  }

  &.shape-2 {
    width: 150px;
    height: 150px;
    background: $accent;
    bottom: -75px;
    left: -75px;
    animation: float 25s ease-in-out infinite reverse;

    @media (min-width: 768px) {
      width: 300px;
      height: 300px;
      bottom: -150px;
      left: -150px;
    }
  }
}

.particle-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 20% 30%,
      rgba($accent, 0.02) 1px,
      transparent 1px
    ),
    radial-gradient(circle at 80% 70%, rgba($accent, 0.02) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: particle-move 100s linear infinite;

  @media (min-width: 768px) {
    background-size: 50px 50px;
  }
}

/* Testimonial Card - Mobile Optimized */
.testimonial-carousel-wrapper {
  position: relative;
  padding: 0 10px;

  @media (min-width: 640px) {
    padding: 0 20px;
  }

  @media (min-width: 1024px) {
    padding: 0 60px;
  }
}

.testimonial-card-wrapper {
  position: relative;
  padding: 15px;

  @media (min-width: 640px) {
    padding: 20px;
  }

  @media (min-width: 768px) {
    padding: 30px;
  }
}

.card-glow {
  position: absolute;
  inset: -5px;
  background: radial-gradient(
    circle at center,
    rgba($accent, 0.03) 0%,
    transparent 70%
  );
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;

  @media (min-width: 768px) {
    inset: -10px;
    filter: blur(20px);
  }

  .swiper-slide-active & {
    opacity: 1;
  }
}

.testimonial-card {
  position: relative;
  padding: 20px;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  z-index: 2;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  @media (min-width: 640px) {
    padding: 30px;
    border-radius: 20px;
  }

  @media (min-width: 768px) {
    padding: 40px;
    border-radius: 24px;
    backdrop-filter: blur(10px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 1px;
    animation: shimmer 3s infinite;
  }

  &:hover {
    @media (min-width: 768px) {
      transform: translateY(-5px) scale(1);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba($accent, 0.1);
    }
  }
}

.client-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;

  @media (min-width: 640px) {
    align-items: center;
    gap: 16px;
    margin-bottom: 25px;
  }

  @media (min-width: 768px) {
    gap: 20px;
    margin-bottom: 30px;
  }
}

.client-avatar {
  position: relative;
  flex-shrink: 0;

  .avatar-inner {
    position: relative;
    width: 50px;
    height: 50px;

    @media (min-width: 640px) {
      width: 60px;
      height: 60px;
    }

    @media (min-width: 768px) {
      width: 70px;
      height: 70px;
    }
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, $accent, $accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1rem;

    @media (min-width: 640px) {
      font-size: 1.25rem;
      font-weight: 700;
    }

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .avatar-ring {
    position: absolute;
    inset: -2px;
    border: 1px solid rgba($accent, 0.5);
    border-radius: 50%;
    animation: pulse-ring 2s infinite;

    @media (min-width: 768px) {
      inset: -3px;
      border-width: 2px;
    }
  }

  .verified-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    background: white;
    color: $accent;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;

    @media (min-width: 640px) {
      width: 20px;
      height: 20px;
      font-size: 0.7rem;
    }

    @media (min-width: 768px) {
      width: 24px;
      height: 24px;
      font-size: 0.8rem;
    }
  }
}

.client-info {
  flex: 1;
  min-width: 0; /* Prevents overflow */

  .author-name {
    font-size: 1rem;
    font-weight: 600;
    color: $accent;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (min-width: 640px) {
      font-size: 1.1rem;
      margin-bottom: 4px;
    }

    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }

  .author-role {
    font-size: 0.75rem;
    opacity: 0.7;
    display: block;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (min-width: 640px) {
      font-size: 0.85rem;
      margin-bottom: 6px;
    }

    @media (min-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 8px;
    }
  }

  .client-rating {
    display: flex;
    gap: 1px;

    @media (min-width: 640px) {
      gap: 2px;
    }

    .icon {
      color: $accent;
      font-size: 0.75rem;

      @media (min-width: 640px) {
        font-size: 0.85rem;
      }

      @media (min-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }
}

.quote-content {
  position: relative;
  margin: 20px 0;

  @media (min-width: 768px) {
    margin: 30px 0;
  }

  .quote-icon {
    position: absolute;
    color: rgba($accent, 0.15);
    font-size: 1.5rem;
    display: none;

    @media (min-width: 640px) {
      display: block;
      font-size: 2rem;
    }

    @media (min-width: 768px) {
      font-size: 3rem;
    }

    &.opening {
      top: -5px;
      left: -5px;
      transform: rotate(180deg);

      @media (min-width: 768px) {
        top: -10px;
        left: -10px;
      }
    }

    &.closing {
      bottom: -5px;
      right: -5px;

      @media (min-width: 768px) {
        bottom: -10px;
        right: -10px;
      }
    }
  }
}

.testimonial-text {
  font-size: 0.875rem;
  line-height: 1.6;
  font-weight: 400;
  position: relative;
  z-index: 1;
  padding: 0;

  @media (min-width: 640px) {
    font-size: 1rem;
    line-height: 1.7;
    padding: 0 10px;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.8;
    font-weight: 500;
    padding: 0 20px;
  }
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  margin-top: 20px;
  border-top: 1px solid rgba($accent, 0.1);
  font-size: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
    font-size: 0.85rem;
    padding-top: 20px;
    margin-top: 25px;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
    padding-top: 20px;
    margin-top: 30px;
  }

  .project-info,
  .date-info {
    display: flex;
    align-items: center;
    color: $accent;
    opacity: 0.8;

    .icon {
      font-size: 0.875rem;
      margin-right: 6px;
      flex-shrink: 0;

      @media (min-width: 768px) {
        font-size: 1rem;
        margin-right: 8px;
      }
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.card-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  background-image: linear-gradient(45deg, $accent 25%, transparent 25%),
    linear-gradient(-45deg, $accent 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, $accent 75%),
    linear-gradient(-45deg, transparent 75%, $accent 75%);
  background-size: 15px 15px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  z-index: 0;

  @media (min-width: 768px) {
    opacity: 0.03;
    background-size: 20px 20px;
  }
}

/* Navigation Buttons - Mobile Optimized */
.custom-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba($accent, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: none;

  @media (min-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.mobile-nav-btn {
    display: flex;
    width: 40px;
    height: 40px;
    background: rgba($accent, 0.15);

    @media (min-width: 640px) {
      display: none;
    }
  }

  .nav-btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-icon {
    font-size: 1.25rem;
    color: $accent;
    transition: transform 0.2s ease;
  }

  &.prev-btn {
    left: 0;

    @media (min-width: 1024px) {
      left: -60px;
      background: transparent;
    }
  }

  &.next-btn {
    right: 0;

    @media (min-width: 1024px) {
      right: -60px;
      background: transparent;
    }
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:hover {
    @media (min-width: 768px) {
      background: rgba($accent, 0.2);

      &.prev-btn .nav-icon {
        transform: translateX(-2px);
      }

      &.next-btn .nav-icon {
        transform: translateX(2px);
      }
    }
  }
}

/* Custom Pagination - Mobile Optimized */
.custom-pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 8px;
  position: relative;
  z-index: 10;

  @media (min-width: 768px) {
    margin-top: 40px;
    gap: 15px;
  }

  :deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    background: transparent;
    opacity: 0.5;
    position: relative;
    transition: all 0.2s ease;
    margin: 0 !important;

    @media (min-width: 768px) {
      width: 14px;
      height: 14px;
    }

    .bullet-inner {
      width: 6px;
      height: 6px;
      background: $accent;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s ease;

      @media (min-width: 768px) {
        width: 8px;
        height: 8px;
      }
    }

    &:active {
      opacity: 1;
    }

    &.swiper-pagination-bullet-active {
      opacity: 1;

      .bullet-inner {
        width: 10px;
        height: 10px;

        @media (min-width: 768px) {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}

/* Mobile Indicators */
.mobile-indicators {
  .active-indicator {
    background: $accent;
  }
}

/* Animations - Optimized for mobile */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(5px);
  }
}

@keyframes particle-move {
  0% {
    background-position: 0 0, 50px 50px;
  }
  100% {
    background-position: 30px 30px, 80px 80px;
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s cubic-bezier(0.5, 0, 0, 1) forwards;
  animation-delay: var(--delay);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Touch improvements */
.testimonials-swiper {
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;

  .swiper-slide {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

/* Better text rendering on mobile */
.testimonial-text {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prevent text size adjustment on mobile */
@media screen and (max-width: 768px) {
  .testimonial-text,
  .author-name,
  .author-role {
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
}
</style>
