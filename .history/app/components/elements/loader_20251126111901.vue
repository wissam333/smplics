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