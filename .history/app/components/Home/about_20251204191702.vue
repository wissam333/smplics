<template>
  <section
    class="about-section relative overflow-hidden"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <div class="bg-glow top-glow"></div>
    <div class="bg-glow bottom-glow"></div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="max-w-4xl mx-auto text-center mb-16">
        <span class="label fade-in" style="--delay: 0.1s">About Us</span>

        <h2 class="hero-title fade-in" style="--delay: 0.2s">
          Simple. Smart. Impactful
          <Icon name="ph:sparkle-fill" class="accent-sparkle" />
        </h2>

        <div class="description-text fade-in" style="--delay: 0.3s">
          <p>
            At Smplics, We Turn Complex Digital Challenges Into Elegant,
            Powerful Solutions. We're Not Just A Team Of Designers And
            Developers — We're Strategic Thinkers, Builders, And Creators Who
            Believe That Great Work Starts With Clarity And Ends With Measurable
            Impact. From Startups To Enterprises, We Partner With Brands That
            Want More Than Just A "pretty" Product. We Design Digital
            Experiences That Look Sharp, Run Fast, And Deliver Results.
          </p>

          <div class="mt-6 font-semibold">
            <p>We Don't Overcomplicate.</p>
            <p>We Don't Overpromise.</p>
            <p class="highlight-text mt-2">
              We Just Make It Work — Beautifully.
            </p>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card fade-in"
          :style="{ '--delay': `${0.4 + index * 0.1}s` }"
        >
          <div class="stat-content">
            <h3 class="stat-value">{{ stat.value }}</h3>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
          <div class="card-border"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const isDark = useIsDark(); // Assumes you have this composable from previous context

const stats = [
  { value: "15+", label: "Websites build" },
  { value: "90%", label: "Client satisfaction" },
  { value: "15+", label: "Team members" },
  { value: "20+", label: "Amazing clients" },
];
</script>

<style lang="scss" scoped>
/* --- Variables --- */
$accent: #ee7639;
$dark-bg: #181815;
$dark-card: #1e1e1b;
$light-bg: #ffffff;
$light-card: #f3f4f6;

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
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }

    .description-text {
      color: #4a4a4a;
    }
  }
}

/* --- Typography --- */
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
    color: $accent; // Or keep white with an underline
    font-weight: 700;
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
    grid-template-columns: 1fr;
  }
}

.stat-card {
  position: relative;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;

  /* The Content */
  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: $accent;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 600;
    opacity: 0.9;
  }

  /* Hover Effects */
  &:hover {
    transform: translateY(-10px);

    .card-border {
      opacity: 1;
    }
  }
}

/* Subtle Gradient Border on Hover */
.card-border {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px; /* Border width */
  background: linear-gradient(
    to bottom right,
    transparent,
    $accent,
    transparent
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
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
