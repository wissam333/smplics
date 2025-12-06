<template>
  <div>
    <ClientOnly>
      <div class="triathlon-loader">
        <div
          id="preloader"
          :class="!data.show || !useGlobalLoader().value ? 'show' : 'hide'"
        >
          <div id="preloaders" class="loader-content">
            
            <div class="logo-container">
              <svg
                viewBox="0 0 600 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="nerva-logo-svg"
              >
                <defs>
                  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#2b6cb0" />
                    <stop offset="50%" stop-color="#4299e1" />
                    <stop offset="100%" stop-color="#2b6cb0" />
                  </linearGradient>
                  <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ed8936" />
                    <stop offset="100%" stop-color="#f6ad55" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <path
                  class="logo-path blue-part"
                  d="M450 50 
                     C 420 80, 380 120, 350 150 
                     C 320 180, 280 220, 200 220 
                     C 120 220, 100 150, 150 120 
                     C 200 90, 280 180, 350 220 
                     C 420 260, 500 220, 500 150 
                     C 500 80, 420 80, 350 120
                     C 300 150, 250 180, 200 150"
                  stroke="url(#blueGrad)"
                  stroke-width="15"
                  stroke-linecap="round"
                  fill="none"
                />

                <g class="text-group" transform="translate(50, 280)">
                  <path class="logo-path blue-text" d="M20 100 L20 0 L80 100 L80 0" />
                  <path class="logo-path blue-text" d="M110 100 L110 0 L170 0 M110 50 L160 50 M110 100 L170 100" />
                  <path class="logo-path blue-text" d="M200 100 L200 0 L240 0 C 270 0, 270 50, 240 50 L200 50 M240 50 L270 100" />
                  
                  <path class="logo-path orange-text" d="M300 0 L330 100 L360 0" />
                  <path class="logo-path orange-text" d="M360 80 Q 420 80, 460 50 Q 400 70, 380 85" stroke-width="8" />

                  <path class="logo-path blue-text" d="M390 100 L420 0 L450 100 M400 70 L440 70" />
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
                {{ Math.min(100, Math.floor(data.percent)) }}%
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
  duration: { type: Number, default: 2000 },
});

// Options & Data
const data = reactive({
  percent: 0,
  show: false,
});

let _timer = null;
let _throttle = null;

// Functions
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
  const _cut = 10000 / Math.floor(props.duration);
  _timer = setInterval(() => {
    data.percent = Math.min(100, Math.floor(data.percent + _cut));
  }, 100);
};

const finish = () => {
  data.percent = 100;
  setTimeout(() => {
    data.show = false;
  }, 1000);
};

// Hooks
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", start);
nuxtApp.hook("page:finish", finish);

onBeforeUnmount(clear);
</script>

<style lang="scss" scoped>
.triathlon-loader {
  $light: #f5f1ee;
  $blue-primary: #56ccf2; // Adjusted to match your logo blue
  $blue-dark: #2f80ed;
  $orange-accent: #f2994a;
  $main: #2f80ed;
  $second: #f2994a;

  #preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99999;
    // Clean gradient background
    background: radial-gradient(circle at center, #ffffff, #e6e9f0);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.8s cubic-bezier(0.55, 0.09, 0.76, 0.76);
    transform: translateY(-100%);
    overflow: hidden;

    &.show {
      transform: translateY(0%);
      transition: none;
    }
    &.hide {
      transform: translateY(-100%);
    }
  }

  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    padding: 2rem;
  }

  /* LOGO ANIMATION CSS */
  .logo-container {
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
    
    svg {
      width: 100%;
      height: auto;
      filter: drop-shadow(0px 10px 20px rgba(44, 130, 201, 0.2));
    }
  }

  // The Base Class for all lines
  .logo-path {
    fill: transparent; /* Start with transparent fill */
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    // Very large dasharray to simulate drawing
    stroke-dasharray: 2000; 
    stroke-dashoffset: 2000;
    // The Animation
    animation: dash 2.5s cubic-bezier(0.65, 0, 0.45, 1) forwards, 
               fillIn 0.8s ease-in-out 2.2s forwards;
  }

  // Specific Styles for Blue Parts
  .blue-part {
    stroke: url(#blueGrad);
    stroke-width: 25px; // Thicker for the ribbon
    filter: url(#glow);
  }

  .blue-text {
    stroke: $blue-dark;
    stroke-width: 4px;
  }

  // Specific Styles for Orange Parts
  .orange-text {
    stroke: url(#orangeGrad);
    stroke-width: 4px;
    animation-delay: 0.5s, 2.5s; // Draw orange slightly later
  }

  // Keyframes
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fillIn {
    from {
      fill-opacity: 0;
    }
    to {
      fill-opacity: 1;
      // For the ribbon, we might want to fill with a gradient
      fill: url(#blueGrad); 
    }
  }
  
  // Target specific fills for text after animation
  .blue-text {
    animation-name: dash, fillInBlue;
  }
  .orange-text {
    animation-name: dash, fillInOrange;
  }

  @keyframes fillInBlue {
    to { fill: $blue-dark; fill-opacity: 1; }
  }
  
  @keyframes fillInOrange {
    to { fill: $orange-accent; fill-opacity: 1; }
  }

  /* PROGRESS BAR STYLES */
  .progress-container {
    width: min(400px, 90vw);
    text-align: center;
    .progress-bar {
      height: 4px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.75rem;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, $main 0%, $second 100%);
        border-radius: 4px;
        transition: width 0.2s ease;
        box-shadow: 0 0 10px rgba(47, 128, 237, 0.3);
      }
    }

    .progress-text {
      color: #888;
      font-family: sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
}
</style>