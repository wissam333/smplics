<template>
  <section class="hero-section">
    <!-- Enhanced Wavy Blur Background -->
    <div class="wave-bg-container">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
      <div class="particles-container">
        <div
          v-for="i in 20"
          :key="i"
          class="particle"
          :style="particleStyle(i)"
        ></div>
      </div>
      <div class="orange-glow"></div>
    </div>

    <div class="cont hero-container">
      <div class="hero-content">
        <!-- Animated text with gradient -->
        <h1 class="hero-title">
          <span class="title-line fade-in-up" style="animation-delay: 0.2s">
            Build the Future.
          </span>
          <span
            class="title-line gradient-text fade-in-up"
            style="animation-delay: 0.4s"
          >
            Digitally <span class="sparkle accent-sparkle">✦</span>
          </span>
        </h1>

        <p class="hero-subtext fade-in-up" style="animation-delay: 0.6s">
          We Craft Powerful Digital Experiences That Turn Ambitious Ideas Into
          Real Growth. Let's Design, Develop, And Scale Your Digital
          Success—together.
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
            <!-- arrow -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Particle styles
const particleStyle = (index) => {
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const duration = Math.random() * 10 + 10;
  const delay = Math.random() * 1;

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
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--bg-color) 20%,
    color-mix(in srgb, var(--bg-color) 90%, #000) 100%
  );
  padding: 80px 0;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 60px 0;
  }
}

/* ===== ENHANCED WAVY BLURRY BACKGROUND ===== */
.wave-bg-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.wave {
  position: absolute;
  border-radius: 43% 57% 70% 30% / 40% 40% 60% 60%;
  background: linear-gradient(
    45deg,
    rgba(238, 118, 57, 0.15) 0%,
    rgba(238, 118, 57, 0.05) 100%
  );
  filter: blur(40px);
  animation: waveMove 20s infinite linear;
  opacity: 0.6;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(238, 118, 57, 0.1) 0%,
      transparent 100%
    );
    border-radius: inherit;
  }
}

.wave-1 {
  width: 500px;
  height: 500px;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
  animation-duration: 25s;
}

.wave-2 {
  width: 600px;
  height: 600px;
  bottom: -150px;
  left: -100px;
  background: linear-gradient(
    135deg,
    rgba(238, 118, 57, 0.1) 0%,
    rgba(238, 118, 57, 0.03) 100%
  );
  animation-delay: -5s;
  animation-duration: 30s;
}

.wave-3 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 10%;
  background: linear-gradient(
    225deg,
    rgba(238, 118, 57, 0.08) 0%,
    rgba(238, 118, 57, 0.02) 100%
  );
  animation-delay: -10s;
  animation-duration: 35s;
}

@keyframes waveMove {
  0% {
    transform: translate(0, 0) rotate(0deg);
    border-radius: 43% 57% 70% 30% / 40% 40% 60% 60%;
  }
  25% {
    transform: translate(30px, 50px) rotate(90deg);
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    transform: translate(0, 100px) rotate(180deg);
    border-radius: 30% 70% 60% 40% / 50% 60% 40% 50%;
  }
  75% {
    transform: translate(-30px, 50px) rotate(270deg);
    border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
    border-radius: 43% 57% 70% 30% / 40% 40% 60% 60%;
  }
}

.particles-container {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  background: var(--accent-color);
  border-radius: 50%;
  animation: floatParticle infinite linear;

  @keyframes floatParticle {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-20px) rotate(90deg);
    }
    50% {
      transform: translateY(-40px) rotate(180deg);
    }
    75% {
      transform: translateY(-20px) rotate(270deg);
    }
  }
}

.orange-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(238, 118, 57, 0.1) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  filter: blur(60px);
}

/* ===== LAYOUT ===== */
.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;

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
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
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
    animation: sparkleSpin 3s infinite ease-in-out;
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
  font-size: 1.2rem;
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
  padding: 18px 36px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
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
    box-shadow: 0 10px 30px rgba(238, 118, 57, 0.4),
      0 5px 15px rgba(238, 118, 57, 0.2);

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
    box-shadow: 0 10px 30px rgba(238, 118, 57, 0.2);
  }
}

/* ===== STATS ===== */
.hero-stats {
  display: flex;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 20px;
  }
}

.stat {
  text-align: center;

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .stars {
    display: flex;
    gap: 2px;
    justify-content: center;
    margin-bottom: 4px;

    .star {
      color: var(--accent-color);
      font-size: 1rem;
    }
  }
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    display: none;
  }
}

.accent-text {
  color: var(--accent-color);
}

/* ===== GRAPHICS ===== */
.floating-elements {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 992px) {
    position: relative;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 30px;
  }
}

.floating-element {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: floatElement 6s ease-in-out infinite;

  .element-icon {
    background: rgba(238, 118, 57, 0.1);
    padding: 8px;
    border-radius: 10px;
    color: var(--accent-color);
  }

  span {
    font-weight: 500;
    font-size: 0.9rem;
  }
}

.element-1 {
  animation-delay: 0s;
}
.element-2 {
  animation-delay: -2s;
}
.element-3 {
  animation-delay: -4s;
}

@keyframes floatElement {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

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
}

.glowing-orb {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(238, 118, 57, 0.3) 0%,
    rgba(238, 118, 57, 0.1) 40%,
    transparent 70%
  );
  filter: blur(20px);
  animation: orbPulse 4s ease-in-out infinite;

  .orb-inner {
    position: absolute;
    inset: 20px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(238, 118, 57, 0.4) 0%,
      transparent 70%
    );
    filter: blur(10px);
  }

  .orb-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid rgba(238, 118, 57, 0.2);
    animation: orbPulseRing 3s ease-in-out infinite;
  }
}

@keyframes orbPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes orbPulseRing {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.growth-arrow {
  width: 100%;
  height: auto;
  max-width: 400px;
  transform: rotate(-10deg);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));

  .arrow-path,
  .arrow-head {
    stroke-dasharray: 1500;
    stroke-dashoffset: 1500;
    animation: drawArrow 3s ease-out forwards;
    animation-delay: 1s;
  }

  .data-point {
    opacity: 0;
    animation: fadeInPoints 0.5s ease forwards;
    animation-delay: 2s;

    &:nth-child(2) {
      animation-delay: 2.2s;
    }

    &:nth-child(3) {
      animation-delay: 2.4s;
    }
  }
}

@keyframes drawArrow {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeInPoints {
  to {
    opacity: 1;
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
    background: linear-gradient(
      135deg,
      var(--bg-color) 0%,
      color-mix(in srgb, var(--bg-color) 80%, #000) 100%
    );
  }

  .floating-element {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
