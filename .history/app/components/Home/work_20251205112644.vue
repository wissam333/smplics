<template>
  <section
    class="our-work-section relative overflow-hidden"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <div class="bg-glow center-glow"></div>
    <div class="bg-glow top-glow"></div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="text-center mb-12 max-w-4xl mx-auto">
        <span class="label fade-in" style="--delay: 0.1s">
          {{ $t("our_work_label", "Our Work") }}
        </span>

        <h2 class="section-title fade-in" style="--delay: 0.2s">
          {{ $t("our_work_title", "Real results. Clean execution") }}
          <Icon name="ph:sparkle-fill" class="accent-sparkle" />
        </h2>

        <p class="description-text fade-in" style="--delay: 0.3s">
          {{
            $t(
              "our_work_desc",
              "We Craft Digital Products That Solve Real Problems And Drive Growth. From Smart Interfaces To Powerful Platforms — Our Work Speaks For Itself."
            )
          }}
        </p>
      </div>

      <div class="illustration-container fade-in" style="--delay: 0.4s">
        <img
          :src="useIsDark().value ? '/frame.svg' : '/frame-w.svg'"
          alt="Digital products showcased on laptops and mobile"
          class="devices-image"
        />
      </div>

      <div class="cta-container text-center fade-in" style="--delay: 0.5s">
        <NuxtLink to="/contact" class="cta-btn">
          {{ $t("lets_talk", "Let's Talk") }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const isDark = useIsDark();
</script>

<style lang="scss" scoped>
.our-work-section {
  position: relative;
  padding: 120px 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: center;

  /* Typography matches previous component for consistency */
  .label {
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
    margin-bottom: 1.5rem;
    line-height: 1.2;

    .accent-sparkle {
      color: var(--accent-color);
      vertical-align: top;
      font-size: 0.6em;
      animation: sparkle 3s infinite ease-in-out;
    }

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .description-text {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.8;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 500;
  }
}

/* --- Image Container --- */
.illustration-container {
  margin: 4rem auto;
  max-width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;

  .devices-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    /* Optional: Adds a subtle drop shadow to the whole illustration cluster if desired */
    // filter: drop-shadow(0 20px 40px rgba(0,0,0,0.2));
  }
}

/* --- CTA Button --- */
.cta-container {
  margin-top: 3rem;
}

.cta-btn {
  display: inline-block;
  padding: 0.5rem 2.5rem;
  background-color: var(--accent-color);
  color: #fff; /* Always white text on the orange button */
  border-radius: 50px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(238, 118, 57, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(238, 118, 57, 0.5);
  }

  &:active {
    transform: translateY(-1px);
  }
}

/* --- Animations & Glow --- */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--delay);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.center-glow {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
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

.bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(#ee7639, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.top-glow {
  top: -300px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
