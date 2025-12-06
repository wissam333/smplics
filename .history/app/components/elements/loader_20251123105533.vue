<template>
  <div>
    <ClientOnly>
      <div class="triathlon-loader">
        <div
          id="preloader"
          :class="data.show || useGlobalLoader().value ? 'show' : 'hide'"
        >
          <div id="preloaders" class="loader-content">
            
            <div class="logo-container">
              <svg
                viewBox="0 0 600 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="nerva-logo-anim"
              >
                <defs>
                  <linearGradient id="mainBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#1e5799" />
                    <stop offset="50%" stop-color="#2989d8" />
                    <stop offset="51%" stop-color="#207cca" />
                    <stop offset="100%" stop-color="#7db9e8" />
                  </linearGradient>

                  <linearGradient id="darkBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0b2848" />
                    <stop offset="100%" stop-color="#1e5799" />
                  </linearGradient>

                  <linearGradient id="flameOrange" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ff7e00" />
                    <stop offset="100%" stop-color="#ffcc00" />
                  </linearGradient>

                  <filter id="softGlow" height="300%" width="300%" x="-75%" y="-75%">
                    <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
                    <feGaussianBlur in="thicken" stdDeviation="5" result="blurred" />
                    <feFlood flood-color="#4299e1" result="glowColor" />
                    <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
                    <feMerge>
                      <feMergeNode in="softGlow_colored"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <path id="ribbonShape" 
                        d="M 380 40 
                           C 360 60, 320 120, 260 160 
                           C 200 200, 120 230, 80 180 
                           C 50 140, 90 90, 160 120 
                           C 220 150, 280 200, 350 230 
                           C 450 270, 540 200, 520 140 
                           C 500 80, 420 80, 350 120
                           C 290 150, 260 180, 230 160" 
                  />
                </defs>

                <g class="ribbon-container">
                   <use href="#ribbonShape" class="draw-line shadow-layer" />
                   
                   <use href="#ribbonShape" class="draw-line body-layer" />
                   
                   <use href="#ribbonShape" transform="translate(-3, -3)" class="draw-line highlight-layer" />
                </g>

                <g class="text-container" transform="translate(40, 280)">
                  
                  <path class="text-line blue-txt" d="M20 90 L20 10 L80 90 L80 10" />
                  
                  <path class="text-line blue-txt" d="M110 90 L110 10 L160 10 M110 50 L150 50 M110 90 L160 90" />
                  
                  <path class="text-line blue-txt" d="M190 90 L190 10 L230 10 C 260 10, 260 50, 230 50 L190 50 M230 50 L260 90" />
                  
                  <g class="v-shape">
                    <path class="text-line orange-txt" d="M290 10 L320 90" />
                    <path class="text-line orange-txt swoosh" d="M320 90 C 350 50, 420 20, 450 30 Q 400 50, 380 70" />
                  </g>

                  <path class="text-line blue-txt" d="M400 90 L430 10 L460 90 M410 65 L450 65" />
                  
                </g>
              </svg>
            </div>

            <div class="progress-container">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: data.percent + '%' }"
                ></div>
              </div>
              <div class="progress-text">
                LOADING SYSTEM...
              </div>
            </div>

          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const props = defineProps({
  throttle: { type: Number, default: 200 },
  duration: { type: Number, default: 3500 }, // Duration
});

const data = reactive({
  percent: 0,
  show: false,
});

let _timer = null;
let _throttle = null;

const clear = () => {
  _timer && clearInterval(_timer);
  _throttle && clearTimeout(_throttle);
  _timer = null;
};

const start = () => {
  clear();
  data.percent = 0;
  if (props.throttle) {
    _throttle = setTimeout(startTimer, props.throttle);
  } else {
    startTimer();
  }
};

const startTimer = () => {
  data.show = true;
  // Calculate increment based on duration to reach 100% smoothly
  const intervalTime = 50;
  const steps = props.duration / intervalTime;
  const increment = 100 / steps;
  
  _timer = setInterval(() => {
    if (data.percent < 100) {
      data.percent = Math.min(100, data.percent + increment);
    }
  }, intervalTime);
};

const finish = () => {
  data.percent = 100;
  setTimeout(() => {
    data.show = false;
  }, 800);
};

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", start);
nuxtApp.hook("page:finish", finish);

onBeforeUnmount(clear);
</script>

<style lang="scss" scoped>
.triathlon-loader {
  // Define Palette
  $bg-dark: #0f172a; // Deep slate blue background
  $neon-blue: #38bdf8;
  $neon-orange: #fb923c;

  #preloader {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100vh;
    z-index: 99999;
    // Elegant radial background
    background: radial-gradient(circle at 50% 50%, #1e293b, #0f172a);
    display: flex; justify-content: center; align-items: center;
    transition: all 0.8s ease-in-out;
    transform: translateY(-100%);

    &.show { transform: translateY(0%); transition: none; }
    &.hide { transform: translateY(-100%); }
  }

  .loader-content {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    width: 100%; max-width: 700px;
  }

  /* =================================
     SVG DRAWING STYLES
  ================================= */
  .logo-container {
    width: 100%;
    max-width: 550px;
    margin-bottom: 2rem;

    svg {
      width: 100%;
      height: auto;
      overflow: visible; // Allows the glow to spill out
    }
  }

  /* --- SHARED DRAW ANIMATION --- */
  .draw-line, .text-line {
    fill: none; /* KEY: DO NOT FILL */
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    will-change: stroke-dashoffset;
  }

  /* --- RIBBON LAYERS (The 3D Trick) --- */
  
  // 1. Shadow Layer (The "Back")
  .shadow-layer {
    stroke: url(#darkBlue);
    stroke-width: 28px; /* Wider than body */
    opacity: 0.5;
    animation: drawStroke 3s cubic-bezier(0.5, 0, 0.5, 1) forwards;
  }

  // 2. Body Layer (The Main Color)
  .body-layer {
    stroke: url(#mainBlue);
    stroke-width: 20px;
    filter: url(#softGlow); // Adds that neon glow
    animation: drawStroke 3s cubic-bezier(0.5, 0, 0.5, 1) forwards;
    animation-delay: 0.1s; /* Slight delay creates visual trail */
  }

  // 3. Highlight Layer (The "Glossy Ridge")
  .highlight-layer {
    stroke: rgba(255, 255, 255, 0.7);
    stroke-width: 3px; /* Thin sharp line */
    opacity: 0.8;
    animation: drawStroke 3s cubic-bezier(0.5, 0, 0.5, 1) forwards;
    animation-delay: 0.2s;
  }


  /* --- TEXT DRAWING --- */
  .blue-txt {
    stroke: #63b3ed; // Light blue
    stroke-width: 4px;
    animation: drawStroke 2s ease-out forwards;
    animation-delay: 2.2s; // Starts after ribbon is mostly done
  }

  .orange-txt {
    stroke: url(#flameOrange);
    stroke-width: 6px;
    filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.6));
    animation: drawStroke 2s ease-out forwards;
    animation-delay: 2.5s;
  }
  
  // Make the Swoosh thicker
  .swoosh {
    stroke-width: 8px;
    stroke-linecap: square; 
  }

  /* --- KEYFRAMES --- */
  @keyframes drawStroke {
    to {
      stroke-dashoffset: 0;
    }
  }


  /* --- PROGRESS BAR UI --- */
  .progress-container {
    width: 300px;
    text-align: center;

    .progress-bar {
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 10px;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, $neon-blue, $neon-orange);
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
        transition: width 0.1s linear;
      }
    }

    .progress-text {
      color: #94a3b8;
      font-family: 'Courier New', Courier, monospace; // Techy font
      font-size: 0.75rem;
      letter-spacing: 2px;
    }
  }
}
</style>