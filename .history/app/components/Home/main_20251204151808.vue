<template>
  <section class="hero-section">
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>

    <div class="cont hero-container">
      <div class="hero-content">
        <h1 class="hero-title fade-in-up" style="animation-delay: 0.2s">
          Build the Future.
          <span class="nowrap"
            >Digitally <span class="sparkle text-accent">✦</span></span
          >
        </h1>
        <p class="hero-subtext fade-in-up" style="animation-delay: 0.4s">
          We Craft Powerful Digital Experiences That Turn Ambitious Ideas Into
          Real Growth. Let's Design, Develop, And Scale Your Digital
          Success—together.
        </p>

        <div class="hero-buttons fade-in-up" style="animation-delay: 0.6s">
          <button class="btn btn-primary lamp-glow">
            Explore Our Services
          </button>
          <button class="btn btn-outline lamp-glow-outline">Let's Talk</button>
        </div>
      </div>

      <div class="hero-graphics fade-in" style="animation-delay: 0.8s">
        <div class="rating-badge">
          <span class="star text-accent">★</span>
          <span class="rating-value">4,8</span>
        </div>

        <svg
          class="growth-arrow"
          viewBox="0 0 200 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="arrow-path"
            d="M10 120 C 50 80, 80 140, 120 80 S 160 20, 180 40"
            stroke="var(--accent-color)"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="arrow-head"
            d="M160 30 L 180 40 L 190 10"
            stroke="var(--accent-color)"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden; /* Important to contain blurred background */
  padding: 50px 0;
}

/* --- 1. Wavy Blurry Orange Background Animation --- */
.bg-glow {
  position: absolute;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--accent-color) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(120px); /* High blur for soft effect */
  opacity: 0.4; /* Subtle coloring */
  z-index: -1;
  will-change: transform;
}

.glow-1 {
  top: -10%;
  right: -10%;
  animation: moveWave1 20s ease-in-out infinite alternate;
}

.glow-2 {
  bottom: -20%;
  left: 10%;
  background: radial-gradient(
    circle,
    var(--accent-color) 0%,
    rgba(0, 0, 0, 0) 60%
  );
  animation: moveWave2 25s ease-in-out infinite alternate-reverse;
  opacity: 0.3;
}

@keyframes moveWave1 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-30%, 20%) scale(1.2);
  }
  100% {
    transform: translate(20%, -10%) scale(0.9);
  }
}

@keyframes moveWave2 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20%, -30%) scale(1.1);
  }
  100% {
    transform: translate(-20%, 20%) scale(0.9);
  }
}

/* --- Layout --- */
.hero-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
}

.hero-content {
  flex: 1;
  max-width: 600px;
  z-index: 2;
}

.hero-graphics {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  min-height: 300px;
  z-index: 2;

  @media (max-width: 992px) {
    align-items: center;
    margin-top: 50px;
    width: 100%;
  }
}

/* --- Typography --- */
.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  .sparkle {
    display: inline-block;
    font-size: 0.8em;
    vertical-align: top;
    animation: pulse 3s infinite ease-in-out;
  }

  .nowrap {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.hero-subtext {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 3rem;
  max-width: 90%;
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
}

/* --- Buttons & Lamp Glow --- */
.hero-buttons {
  display: flex;
  gap: 20px;
  @media (max-width: 992px) {
    justify-content: center;
  }
}

.btn {
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background-color: var(--accent-color);
  color: var(--text-color);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid var(--accent-color);
  color: var(--text-color);
}

/* The "Lamp" Glow Effects */
.lamp-glow {
  /* Multi-layered shadow for intense glow */
  box-shadow: 0 0 15px rgba(238, 118, 57, 0.4), 0 0 30px rgba(238, 118, 57, 0.2),
    inset 0 0 10px rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px rgba(238, 118, 57, 0.6),
      0 0 50px rgba(238, 118, 57, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.2);
  }
}

.lamp-glow-outline {
  /* Subtler glow for outline button */
  box-shadow: 0 0 10px rgba(238, 118, 57, 0.2),
    inset 0 0 5px rgba(238, 118, 57, 0.1);

  &:hover {
    background-color: rgba(238, 118, 57, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(238, 118, 57, 0.4),
      inset 0 0 10px rgba(238, 118, 57, 0.2);
  }
}

/* --- Right Side Graphics --- */
.rating-badge {
  position: absolute;
  top: 0;
  right: 10%;
  background-color: var(--card-bg);
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-weight: bold;
}

.growth-arrow {
  width: 300px;
  height: auto;
  /* Rotate slightly to match image angle */
  transform: rotate(-5deg);

  /* Ensure strokes use theme variable */
  path {
    stroke: var(--accent-color);
  }
}

/* --- 2. SVG Drawing Animation --- */
/*
   How this works:
   stroke-dasharray defines the pattern of dashes and gaps. Setting it to a huge number makes one giant dash.
   stroke-dashoffset offsets where that giant dash starts.
   We start with the offset equal to the array length (hiding the stroke), then animate offset to 0 (revealing it).
*/
.arrow-path,
.arrow-head {
  /* Estimated length of the paths. Adjust if the drawing ends too soon or finishes abruptly */
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawArrow 2.5s ease-out forwards;
  animation-delay: 1s; /* Wait for other elements to load */
}

@keyframes drawArrow {
  to {
    stroke-dashoffset: 0;
  }
}

/* --- 3. General Entrance Animations --- */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
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

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
    filter: blur(1px);
  }
}
</style>
