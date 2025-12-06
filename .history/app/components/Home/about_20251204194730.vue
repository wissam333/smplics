<template>
  <section
    class="about-section relative overflow-hidden"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <div class="bg-glow top-glow"></div>
    <div class="bg-glow bottom-glow"></div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="max-w-4xl mx-auto text-center mb-16">
        <span class="label fade-in" style="--delay: 0.1s">{{
          $i18n.locale === "ar" ? "معلومات عنا" : "About Us"
        }}</span>

        <h2 class="hero-title fade-in" style="--delay: 0.2s">
          {{
            $i18n.locale === "ar"
              ? "بسيط. ذكي. مؤثر"
              : "Simple. Smart. Impactful"
          }}
          <Icon name="ph:sparkle-fill" class="accent-sparkle" />
        </h2>

        <div class="description-text fade-in" style="--delay: 0.3s">
          <p>
            {{
              $i18n.locale === "ar"
                ? 'في Smplics، نُحوّل التحديات الرقمية المعقدة إلى حلول فعّالة وأنيقة. لسنا مجرد فريق من المصممين والمطورين، بل نحن مفكرون استراتيجيون وبنّاءون ومبدعون نؤمن بأن العمل الرائع يبدأ بالوضوح وينتهي بتأثير ملموس. من الشركات الناشئة إلى المؤسسات الكبرى، نتعاون مع العلامات التجارية التي تسعى لأكثر من مجرد منتج "جميل". نصمم تجارب رقمية جذابة وسريعة الأداء وتحقق نتائج ملموسة.'
                : "At Smplics, We Turn Complex Digital Challenges Into Elegant, Powerful Solutions. We're Not Just A Team Of Designers And Developers — We're Strategic Thinkers, Builders, And Creators Who Believe That Great Work Starts With Clarity And Ends With Measurable Impact. From Startups To Enterprises, We Partner With Brands That Want More Than Just A \"pretty\" Product. We Design Digital Experiences That Look Sharp, Run Fast, And Deliver Results."
            }}
          </p>

          <div class="mt-6 font-semibold">
            <p>
              {{
                $i18n.locale === "ar"
                  ? "نحن لا نعقد الأمور أكثر من اللازم."
                  : "We Don't Overcomplicate."
              }}
            </p>
            <p>
              {{
                $i18n.locale === "ar"
                  ? "نحن لا نبالغ في الوعود."
                  : "We Don't Overpromise."
              }}
            </p>
            <p class="highlight-text mt-2">
              {{
                $i18n.locale === "ar"
                  ? "نحن فقط نجعل الأمر يعمل بشكل جميل."
                  : "We Just Make It Work —Beautifully."
              }}
            </p>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <ElementsThreeDCardContainer
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card-container fade-in"
          :style="{ '--delay': `${0.4 + index * 0.1}s` }"
        >
          <div class="stat-card">
            <ElementsThreeDCardElement translateZ="30" class="stat-content">
              <h3 class="stat-value">{{ stat.value }}</h3>
              <p class="stat-label">
                {{ $i18n.locale === "ar" ? stat.labelAr : stat.labelEn }}
              </p>
            </ElementsThreeDCardElement>

            <!-- Floating elements for parallax effect -->
            <ElementsThreeDCardElement
              translateZ="15"
              rotateX="5"
              rotateY="5"
              class="absolute inset-0 opacity-20"
            >
              <div
                class="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-accent blur-xl"
              ></div>
            </ElementsThreeDCardElement>

            <ElementsThreeDCardElement
              translateZ="-10"
              rotateX="-3"
              rotateY="-3"
              class="absolute inset-0 opacity-10"
            >
              <div
                class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-accent blur-xl"
              ></div>
            </ElementsThreeDCardElement>

            <div class="card-border"></div>
            <div class="card-shine"></div>
          </div>
        </ElementsThreeDCardContainer>
      </div>
    </div>
  </section>
</template>

<script setup>
const isDark = useIsDark();

const stats = [
  { value: "15+", labelEn: "Websites build", labelAr: "بناء المواقع" },
  { value: "90%", labelEn: "Client satisfaction", labelAr: "رضا العملاء" },
  { value: "15+", labelEn: "Team members", labelAr: "أعضاء الفريق" },
  { value: "20+", labelEn: "Amazing clients", labelAr: "عملاء مذهلون" },
];
</script>

<style lang="scss" scoped>
/* --- Variables --- */
$accent: #ee7639;
$dark-bg: #181815;
$dark-card: #1e1e1b;
$light-bg: #ffffff;
$light-card: #e6e6e6;

.about-section {
  position: relative;
  padding: 120px 0;
  transition: background-color 0.5s ease, color 0.5s ease;

  /* Theme: Dark Mode */
  &.dark-mode {
    background-color: $dark-bg;
    color: white;

    .stat-card {
      background-color: $dark-card;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }

    .description-text {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  /* Theme: Light Mode */
  &.light-mode {
    background-color: $light-bg;
    color: #1a1a1a;

    .stat-card {
      background-color: $light-card;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03);
    }

    .description-text {
      color: #4a4a4a;
    }
  }
}

/* --- Stats Grid --- */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.stat-card-container {
  height: 100%;
}

.stat-card {
  position: relative;
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  height: 100%;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 991px) {
    padding: 1.5rem 1rem;
  }
  /* The Content */
  .stat-content {
    position: relative;
    z-index: 10;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: $accent;
    margin-bottom: 0.5rem;
    line-height: 1;
    transition: transform 0.3s ease;
    @media (max-width: 991px) {
      font-size: 1rem;
    }
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 600;
    opacity: 0.9;
    transition: transform 0.3s ease;
  }

  /* Hover Effects */
  &:hover {
    .stat-value {
      transform: scale(1.05);
    }

    .stat-label {
      transform: translateY(2px);
    }
  }
}

/* Enhanced Gradient Border */
.card-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(
    135deg,
    transparent,
    rgba($accent, 0.4),
    transparent
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 5;

  .stat-card:hover & {
    opacity: 1;
  }
}

/* Shine Effect */
.card-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform: rotate(30deg);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;

  .stat-card:hover & {
    opacity: 0.3;
    animation: shine 1.5s ease-in-out;
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(30deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(30deg);
  }
}

/* Rest of your existing styles remain the same */
.label {
  display: block;
  color: $accent;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  .accent-sparkle {
    color: $accent;
    vertical-align: top;
    font-size: 0.6em;
    animation: sparkle 3s infinite ease-in-out;
  }
}

.description-text {
  font-size: 0.8rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;

  .highlight-text {
    color: $accent;
    font-weight: 700;
  }
}

/* --- Background Ambient Glows --- */
.bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba($accent, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.top-glow {
  top: -300px;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-glow {
  bottom: -300px;
  left: 10%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba($accent, 0.05) 0%, transparent 70%);
}

/* --- Animations --- */
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

@keyframes sparkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.7;
  }
}
</style>
