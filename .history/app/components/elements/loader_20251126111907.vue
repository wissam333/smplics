<template>
  <div>
    <ClientOnly>
      <div class="triathlon-loader">
        <div
          id="preloader"
          :class="data.show || useGlobalLoader().value ? 'show' : 'hide'"
        >
          <div id="preloaders" class="loader-content">
            <!-- Logo with pulse animation -->
            <div class="logo-container">
              <img
                id="logoLoader"
                src="/logo/logo.png"
                class="logo-pulse"
                alt="Logo"
                width="350"
                height="350"
              />
            </div>

            <!-- Progress indicator -->
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
  throttle: {
    type: Number,
    default: 200,
  },
  duration: {
    type: Number,
    default: 2000,
  },
  height: {
    type: Number,
    default: 3,
  },
});

// Building data for the animated skyline
const buildings = [
  { windows: 8, height: 120 },
  { windows: 12, height: 160 },
  { windows: 6, height: 100 },
  { windows: 10, height: 140 },
  { windows: 14, height: 180 },
  { windows: 9, height: 130 },
  { windows: 7, height: 110 },
];

// Options & Data
const data = reactive({
  percent: 0,
  show: false,
  canSucceed: true,
});

let messageInterval = null;
let _timer = null;
let _throttle = null;
let _cut;

// Functions
const clear = () => {
  _timer && clearInterval(_timer);
  _throttle && clearTimeout(_throttle);
  messageInterval && clearInterval(messageInterval);
  _timer = null;
};

const start = () => {
  clear();
  data.percent = 0;
  data.canSucceed = true;

  if (props.throttle) {
    _throttle = setTimeout(startTimer, props.throttle);
  } else {
    startTimer();
  }
};

const set = (num) => {
  data.show = true;
  data.canSucceed = true;
  data.percent = Math.min(100, Math.max(0, Math.floor(num)));
};

const increase = (num) => {
  data.percent = Math.min(100, Math.floor(data.percent + num));
};

const decrease = (num) => {
  data.percent = Math.max(0, Math.floor(data.percent - num));
};

const pause = () => clearInterval(_timer);
const resume = () => startTimer();

const finish = () => {
  data.percent = 100;
  // Clear message interval when finishing
  messageInterval && clearInterval(messageInterval);
  hide();
};

const hide = () => {
  clear();
  setTimeout(() => {
    data.show = false;
  }, 500);
};

const onLeaveComplete = () => {
  data.percent = 0;
};

const startTimer = () => {
  data.show = true;
  _cut = 10000 / Math.floor(props.duration);
  _timer = setInterval(() => {
    increase(_cut);
  }, 100);
};

// Hooks
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", start);
nuxtApp.hook("page:finish", finish);

onBeforeUnmount(() => clear);
</script>
<style lang="scss" scoped>
/* Alternative: Slide and scale reveal effect */
:global(.content-revealed) {
  & main {
    position: relative;
    overflow: hidden;
  }

  & main::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #e1d4bf, #ffffff);
    z-index: 9998;
    animation: slideOut 1s cubic-bezier(0.77, 0, 0.18, 1) forwards;
  }

  & main > * {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* Stagger the animations */
  & main > *:nth-child(1) { animation-delay: 0.3s; }
  & main > *:nth-child(2) { animation-delay: 0.4s; }
  & main > *:nth-child(3) { animation-delay: 0.5s; }
  & main > *:nth-child(4) { animation-delay: 0.6s; }
  & main > *:nth-child(5) { animation-delay: 0.7s; }
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
