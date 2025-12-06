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
                viewBox="0 0 600 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="nerva-3d-draw"
              >
                <defs>
                  <linearGradient id="blueBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#004e92" />
                    <stop offset="50%" stop-color="#000428" />
                    <stop offset="100%" stop-color="#004e92" />
                  </linearGradient>
                   <linearGradient id="blueMidGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stop-color="#2b6cb0" />
                    <stop offset="100%" stop-color="#56ccf2" />
                  </linearGradient>
                   <linearGradient id="orangeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                     <stop offset="0%" stop-color="#f2994a" />
                    <stop offset="100%" stop-color="#f6ad55" />
                  </linearGradient>

                  <path id="ribbonPathData" d="M 450 40 C 420 70, 380 110, 340 150 C 300 190, 260 230, 180 230 C 100 230, 80 160, 130 130 C 180 100, 260 190, 330 230 C 400 270, 480 230, 480 160 C 480 90, 400 90, 330 130 C 280 160, 230 190, 180 160" />
                </defs>

                <g class="ribbon-group">
                   <use href="#ribbonPathData" class="draw-path ribbon-base" />
                   <use href="#ribbonPathData" class="draw-path ribbon-mid" />
                   <use href="#ribbonPathData" class="draw-path ribbon-highlight" />
                </g>

                <g class="text-group" transform="translate(60, 250)">
                  <path class="draw-path text-blue" d="M20 80 L20 0 L70 80 L70 0" />
                  <path class="draw-path text-blue" d="M100 80 L100 0 L150 0 M100 40 L140 40 M100 80 L150 80" />
                  <path class="draw-path text-blue" d="M180 80 L180 0 L220 0 C 250 0, 250 40, 220 40 L180 40 M220 40 L250 80" />
                  
                  <g class="v-group">
                      <path class="draw-path text-orange-base" d="M280 0 L310 80 L340 0" />
                      <path class="draw-path text-orange-mid" d="M280 0 L310 80 L340 0" />
                      <path class="draw-path text-orange-swoosh" d="M340 60 Q 380 60, 420 40 Q 380 50, 360 65" />
                  </g>

                  <path class="draw-path text-blue" d="M370 80 L400 0 L430 80 M380 55 L420 55" />
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
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
// --- SAME SCRIPT AS BEFORE ---
const props = defineProps({
  throttle: { type: Number, default: 200 },
  duration: { type: Number, default: 3000 }, // Increased duration slightly for smoother draw
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
  // Calibrate progress bar to match animation duration roughly
  const _cut = 100 / (props.duration / 100); 
  _timer = setInterval(() => {
    data.percent = Math.min(100, data.percent + _cut);
  }, 100);
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
  // Using darker background to make the 3D strokes pop
  $bg-grad-start: #1a1a2e;
  $bg-grad-end: #16213e;
  $blue-neon: #56ccf2;
  $orange-neon: #f2994a;

  #preloader {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100vh;
    z-index: 99999;
    // Darker, sleeker background gradient
    background: radial-gradient(circle at center, $bg-grad-end, $bg-grad-start);
    display: flex; justify-content: center; align-items: center;
    transition: all 0.8s cubic-bezier(0.55, 0.09, 0.76, 0.76);
    transform: translateY(-100%);
    overflow: hidden;

    &.show { transform: translateY(0%); transition: none; }
    &.hide { transform: translateY(-100%); }
  }

  .loader-content {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    width: 100%; max-width: 700px; padding: 2rem;
  }

  /* =========================================
     3D DRAWING ANIMATION CSS
  ========================================= */
  .logo-container {
    width: 100%;
    max-width: 600px;
    margin-bottom: 3rem;
    
    svg {
      width: 100%; height: auto;
      // A subtle overall glow drop shadow
      filter: drop-shadow(0px 0px 20px rgba(44, 130, 201, 0.3));
    }
  }

  // Base class for all drawing paths
  .draw-path {
    fill: none; // ENSURE NO FILL
    stroke-linecap: round;
    stroke-linejoin: round;
    // Huge dasharray to cover the whole length
    stroke-dasharray: 3000; 
    stroke-dashoffset: 3000;
    // The animation configuration
    animation: drawStroke 3.5s ease-in-out forwards;
  }

  /* --- Ribbon Layers (The 3D Effect) --- */
  
  // Layer 1: The dark base (creates depth/shadow edges)
  .ribbon-base {
    stroke: #000428; // Very dark blue/black
    stroke-width: 32px;
    opacity: 0.6;
  }

  // Layer 2: The main colored body
  .ribbon-mid {
    stroke: url(#blueMidGrad);
    stroke-width: 22px;
    // Slight delay so the shadow leads slightly
    animation-delay: 0.1s; 
  }

  // Layer 3: The glossy highlight
  .ribbon-highlight {
    stroke: rgba(255, 255, 255, 0.8);
    stroke-width: 4px;
    // Crucial: offset the highlight slightly up and left to create 3D illusion
    transform: translate(-4px, -4px); 
    opacity: 0.7;
     // Highlight draws last
    animation-delay: 0.25s;
  }


  /* --- Text Styles --- */
  .text-blue {
    stroke: #56ccf2;
    stroke-width: 5px;
    filter: drop-shadow(0 0 5px #2b6cb0);
    animation-delay: 1.5s; // Start text later
  }

  .text-orange-base {
    stroke: #d35400;
    stroke-width: 8px;
    animation-delay: 1.8s;
  }
   .text-orange-mid {
    stroke: url(#orangeGrad);
    stroke-width: 4px;
     animation-delay: 1.9s;
  }
  .text-orange-swoosh {
      stroke: url(#orangeGrad);
      stroke-width: 6px;
      animation-delay: 2.2s;
       filter: drop-shadow(0 0 8px #f2994a);
  }


  // The Core Drawing Keyframe
  @keyframes drawStroke {
    to {
      stroke-dashoffset: 0;
    }
  }


  /* PROGRESS BAR */
  .progress-container {
    width: min(300px, 80vw);
    text-align: center;
    .progress-bar {
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      overflow: hidden;
      .progress-fill {
        height: 100%;
        // Gradient matching the neon look
        background: linear-gradient(90deg, $blue-neon, $orange-neon);
        border-radius: 10px;
        transition: width 0.1s linear;
        box-shadow: 0 0 15px rgba(86, 204, 242, 0.7);
      }
    }
  }
}
</style>