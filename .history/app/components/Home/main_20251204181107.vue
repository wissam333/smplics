<template>
  <UiWavyBackground
    :colors="['rgba(238, 118, 57, 0.3)', 'rgba(238, 118, 57, 0.2)', 'rgba(238, 118, 57, 0.15)', 'rgba(238, 118, 57, 0.1)']"
    :blur="20"
    :wave-opacity="0.6"
    :wave-width="40"
    speed="fast"
    class="absolute inset-0 z-0"
  >
    <section class="hero-section relative z-10">
      <div class="cont hero-container">
        <div class="hero-content">
          <!-- Animated text with gradient -->
          <h1 class="hero-title">
            <span class="title-line fade-in-up" style="animation-delay: 0.2s">
              {{ $i18n.locale === "ar" ? "بناء المستقبل." : "Build the Future." }}
            </span>
            <span
              class="title-line gradient-text fade-in-up"
              style="animation-delay: 0.4s"
            >
              {{ $i18n.locale === "ar" ? "رقميا" : "Digitally" }}
              <span class="sparkle accent-sparkle">✦</span>
            </span>
          </h1>

          <p class="hero-subtext fade-in-up" style="animation-delay: 0.6s">
            {{
              $i18n.locale === "ar"
                ? "نصمم تجارب رقمية فعّالة تُحوّل الأفكار الطموحة إلى نموّ حقيقي. لنصمّم ونطوّر ونُوسّع نجاحك الرقمي - معًا."
                : " We Craft Powerful Digital Experiences That Turn Ambitious Ideas Into Real Growth. Let's Design, Develop, And Scale Your Digital Success—together."
            }}
          </p>

          <div class="hero-buttons fade-in-up" style="animation-delay: 0.8s">
            <button class="btn btn-primary lamp-glow" @click="scrollToServices">
              <span class="btn-content">
                Explore Our Services
                <Icon name="ic:round-arrow-forward" size="20" class="btn-icon" />
              </span>
              <div class="btn-glow"></div>
            </button>
            <button
              class="btn btn-outline lamp-glow-outline"
              @click="scrollToContact"
            >
              <span class="btn-content">
                Let's Talk
                <Icon name="ic:round-chat" size="20" class="btn-icon" />
              </span>
            </button>
          </div>
        </div>

        <div class="hero-graphics">
          <!-- Main Visual -->
          <div class="main-visual fade-in" style="animation-delay: 1.1s">
            <div class="visual-container">
              <div class="rating-badge">
                <span class="star text-accent">★</span>
                <span class="rating-value">4,8</span>
              </div>
              <!-- arrow -->
              <img
                :class="$i18n.locale === 'ar' ? 'ar' : 'en'"
                class="arrow"
                src="/vector-6.svg"
                alt="arrow"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Optional: Add subtle orange glow overlay -->
      <div class="orange-glow"></div>
    </section>
  </UiWavyBackground>
</template>

<script setup>

// Particle styles (optional - you can remove this if not needed anymore)
const particleStyle = (index) => {
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const duration = Math.random() * 10 + 5;
  const delay = Math.random() * 5;

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: Math.random() * 0.3 + 0.1,
  };
};

const scrollToServices = () => {
  const servicesSection = document.querySelector("#services");
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToContact = () => {
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 60px 0;
    min-height: 90vh;
  }
}

/* ===== ENHANCED ORANGE GLOW OVERLAY ===== */
.orange-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(238, 118, 57, 0.15) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  // filter: blur(80px);
  z-index: 1;
  pointer-events: none;
}

/* ===== LAYOUT ===== */
.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 3; /* Above the wavy background */

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
}

.hero-content {
  max-width: 600px;
}

.hero-graphics {
  position: relative;
  min-height: 400px;

  @media (max-width: 992px) {
    min-height: 300px;
  }
}

/* ===== TYPOGRAPHY ===== */
.hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1.5rem;

  .title-line {
    display: block;
    margin-bottom: 0.5rem;
  }
}

.gradient-text {
  background: linear-gradient(
    90deg,
    var(--accent-color) 0%,
    color-mix(in srgb, var(--accent-color) 70%, #fff) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;

  .accent-sparkle {
    display: inline-block;
    margin-left: 8px;
  }
}

@keyframes sparkleSpin {
  0%,
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 0.8;
  }
}

.hero-subtext {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 90%;

  @media (max-width: 992px) {
    max-width: 100%;
    font-size: 1.1rem;
  }
}

/* ===== BUTTONS ===== */
.hero-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.btn {
  position: relative;
  padding: 16px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  font-family: inherit;
  overflow: hidden;

  .btn-content {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 2;
  }

  .btn-icon {
    transition: transform 0.3s ease;
  }

  &:hover .btn-icon {
    transform: translateX(4px);
  }
}

.btn-primary {
  background: var(--accent-color);
  color: white;

  .btn-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-3px);

    .btn-glow {
      transform: translateX(100%);
    }
  }
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--accent-color);
  color: var(--text-color);

  &:hover {
    background: rgba(238, 118, 57, 0.1);
    transform: translateY(-3px);
  }
}

/* ===== GRAPHICS ===== */
.main-visual {
  position: relative;
  z-index: 2;
}

.visual-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 300px;
  }
  
  .rating-badge {
    position: absolute;
    top: 0;
    color: var(--accent-color);
    background-color: var(--bg-color);
    padding: 6px 12px;
    border-radius: 6px;
    z-index: 3;
  }
  
  .arrow.ar {
    transform: scaleX(-1);
  }
}

/* ===== ANIMATIONS ===== */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Dark mode adjustments */
[data-theme="dark"] {
  .hero-section {
    background: none; /* Remove gradient background since WavyBackground handles it */
  }
}

/* Ensure content is properly layered */
:deep(#canvas) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>