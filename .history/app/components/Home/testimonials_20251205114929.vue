<template>
  <section
    class="testimonials-section relative overflow-hidden py-5"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="floating-shapes shape-1"></div>
      <div class="floating-shapes shape-2"></div>
      <div class="floating-shapes shape-3"></div>
      <div class="particle-bg"></div>
    </div>

    <div class="container mx-auto px-4 md:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 max-w-5xl mx-auto">
        <div class="inline-block mb-4">
          <div class="accent-badge fade-in" style="--delay: 0.1s">
            {{ $t("testimonials_subtitle", "Client Stories") }}
          </div>
        </div>

        <h2 class="section-title fade-in" style="--delay: 0.2s">
          <span class="title-line">{{
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
        <!-- Decorative elements -->
        <div class="decorative-corner top-left"></div>
        <div class="decorative-corner top-right"></div>
        <div class="decorative-corner bottom-left"></div>
        <div class="decorative-corner bottom-right"></div>

        <!-- Navigation Buttons -->
        <button class="custom-nav-btn prev-btn">
          <div class="nav-btn-content">
            <Icon name="ph:arrow-left" class="nav-icon" />
            <span class="nav-text">Prev</span>
          </div>
        </button>

        <button class="custom-nav-btn next-btn">
          <div class="nav-btn-content">
            <span class="nav-text">Next</span>
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
            :space-between="30"
            :loop="true"
            :autoplay="{
              delay: 7000,
              disableOnInteraction: false,
            }"
            :effect="'creative'"
            :creative-effect="{
              prev: {
                shadow: false,
                translate: ['-120%', 0, -500],
              },
              next: {
                shadow: false,
                translate: ['120%', 0, -500],
              },
            }"
            :pagination="{
              el: '.custom-pagination',
              clickable: true,
              renderBullet: renderBullet,
            }"
            :navigation="{
              nextEl: '.next-btn',
              prevEl: '.prev-btn',
            }"
            class="testimonials-swiper"
          >
            <SwiperSlide v-for="(item, index) in testimonials" :key="index">
              <div class="testimonial-card-wrapper">
                <!-- Card Glow Effect -->
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

                  <!-- Card Footer -->
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

                  <!-- Background Pattern -->
                  <div class="card-pattern"></div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <!-- Custom Pagination -->
          <div class="custom-pagination"></div>
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

const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;
const SwiperEffectCreative = EffectCreative;

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
    <div class="bullet-pulse"></div>
  </span>`;
};
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
  p &.dark-mode {
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

/* Section Header */
.accent-badge {
  display: block;
  color: var(--accent-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;

  .title-line {
    display: block;
    margin-bottom: 0.5rem;
  }

  .highlight-gradient {
    background: linear-gradient(90deg, $accent, $accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
}

.section-subtitle {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Floating Background Shapes */
.floating-shapes {
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
  z-index: 1;

  &.shape-1 {
    width: 400px;
    height: 400px;
    background: $accent;
    top: -200px;
    right: -100px;
    animation: float 20s ease-in-out infinite;
  }

  &.shape-2 {
    width: 300px;
    height: 300px;
    background: $accent;
    bottom: -150px;
    left: -150px;
    animation: float 25s ease-in-out infinite reverse;
  }

  &.shape-3 {
    width: 200px;
    height: 200px;
    background: $accent;
    top: 50%;
    left: 10%;
    animation: float 30s ease-in-out infinite;
  }
}

.particle-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 20% 30%,
      rgba($accent, 0.03) 1px,
      transparent 1px
    ),
    radial-gradient(circle at 80% 70%, rgba($accent, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: particle-move 100s linear infinite;
}

/* Testimonial Card */
.testimonial-carousel-wrapper {
  position: relative;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
}

.testimonial-card-wrapper {
  position: relative;
  padding: 30px;
}

.card-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(
    circle at center,
    rgba($accent, 0.05) 0%,
    transparent 70%
  );
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 0;

  .swiper-slide-active & {
    opacity: 1;
  }
}

.testimonial-card {
  position: relative;
  padding: 40px;
  border-radius: 24px;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    animation: shimmer 3s infinite;
  }

  &:hover {
    transform: translateY(-5px) scale(1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba($accent, 0.1);
  }
}

.client-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.client-avatar {
  position: relative;
  .avatar-inner {
    position: relative;
    width: 70px;
    height: 70px;
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
    font-weight: 700;
    font-size: 1.5rem;
  }

  .avatar-ring {
    position: absolute;
    inset: -3px;
    border: 2px solid $accent;
    border-radius: 50%;
    animation: pulse-ring 2s infinite;
  }

  .verified-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    background: white;
    color: $accent;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }
}

.client-info {
  flex: 1;

  .author-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: $accent;
    margin-bottom: 4px;
  }

  .author-role {
    font-size: 0.9rem;
    opacity: 0.8;
    display: block;
    margin-bottom: 8px;
  }

  .client-rating {
    display: flex;
    gap: 2px;

    .icon {
      color: $accent;
      font-size: 0.9rem;
    }
  }
}

.quote-content {
  position: relative;
  margin: 30px 0;

  .quote-icon {
    position: absolute;
    color: rgba($accent, 0.2);
    font-size: 3rem;

    &.opening {
      top: -10px;
      left: -10px;
      transform: rotate(180deg);
    }

    &.closing {
      bottom: -10px;
      right: -10px;
    }
  }
}

.testimonial-text {
  font-size: 1.2rem;
  line-height: 1.8;
  font-weight: 500;
  position: relative;
  z-index: 1;
  padding: 0 20px;

  @media (max-width: 640px) {
    font-size: 1.1rem;
    padding: 0;
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  margin-top: 30px;
  border-top: 1px solid rgba($accent, 0.1);
  font-size: 0.9rem;

  .project-info,
  .date-info {
    display: flex;
    align-items: center;
    color: $accent;
    opacity: 0.8;

    .icon {
      font-size: 1rem;
    }
  }
}

.card-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: linear-gradient(45deg, $accent 25%, transparent 25%),
    linear-gradient(-45deg, $accent 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, $accent 75%),
    linear-gradient(-45deg, transparent 75%, $accent 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  z-index: 0;
}

/* Navigation Buttons */
.custom-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 60px;
  height: 60px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  .nav-btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: $accent;
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .nav-icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &.prev-btn {
    left: -80px;

    &:hover {
      left: -85px;
      .nav-icon {
        transform: translateX(-3px);
      }
    }
  }

  &.next-btn {
    right: -80px;

    &:hover {
      right: -85px;
      .nav-icon {
        transform: translateX(3px);
      }
    }
  }

  &:hover {
    .nav-btn-content {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
}

/* Custom Pagination */
.custom-pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 15px;
  position: relative;
  z-index: 10;

  :deep(.swiper-pagination-bullet) {
    width: 14px;
    height: 14px;
    background: transparent;
    opacity: 0.5;
    position: relative;
    transition: all 0.3s ease;
    margin: 0 !important;

    .bullet-inner {
      width: 8px;
      height: 8px;
      background: $accent;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
    }

    .bullet-pulse {
      position: absolute;
      inset: -4px;
      border: 2px solid $accent;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.3s ease;
    }

    &:hover {
      opacity: 1;
    }

    &.swiper-pagination-bullet-active {
      opacity: 1;

      .bullet-inner {
        width: 12px;
        height: 12px;
      }

      .bullet-pulse {
        opacity: 0.5;
        animation: pulse 2s infinite;
      }
    }
  }
}

/* Stats Bar */
.stats-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 60px;
  padding: 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba($accent, 0.05), transparent);
  backdrop-filter: blur(10px);
  border: 1px solid rgba($accent, 0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  .stat-item {
    text-align: center;

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      color: $accent;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
      letter-spacing: 0.5px;
    }
  }

  .stat-divider {
    width: 1px;
    height: 30px;
    background: rgba($accent, 0.2);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 20px;

    .stat-divider {
      width: 30px;
      height: 1px;
    }
  }
}

/* Decorative Corners */
.decorative-corner {
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 1;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: $accent;
    opacity: 0.3;
  }

  &::before {
    width: 20px;
    height: 2px;
  }

  &::after {
    width: 2px;
    height: 20px;
  }

  &.top-left {
    top: 0;
    left: 0;

    &::before {
      top: 0;
      left: 0;
    }
    &::after {
      top: 0;
      left: 0;
    }
  }

  &.top-right {
    top: 0;
    right: 0;

    &::before {
      top: 0;
      right: 0;
    }
    &::after {
      top: 0;
      right: 0;
    }
  }

  &.bottom-left {
    bottom: 0;
    left: 0;

    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
    }
  }

  &.bottom-right {
    bottom: 0;
    right: 0;

    &::before {
      bottom: 0;
      right: 0;
    }
    &::after {
      bottom: 0;
      right: 0;
    }
  }
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes particle-move {
  0% {
    background-position: 0 0, 100px 100px;
  }
  100% {
    background-position: 50px 50px, 150px 150px;
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
    opacity: 0.5;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
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
