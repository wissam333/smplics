<!-- components/shared/Navbar/ContactInfo.vue -->
<template>
  <div class="cont contact-info-wrapper">
    <div class="d-flex justify-content-between align-items-center wrapper">
      <!-- Contact Info -->
      <div class="d-flex contact-info">
        <div class="email d-flex align-items-center">
          <Icon
            name="ic:round-email"
            size="18"
            class="me-2"
          />
          <span class="mx-2">info@smplics.com</span>
        </div>
        <div class="phone d-flex align-items-center ms-4">
          <Icon
            name="ic:round-phone"
            size="18"
            class="me-2"
          />
          <span class="mx-2">+(971) 58584-0433</span>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="socials d-flex">
        <a href="#" class="social-icon mx-1" style="--delay: 0.1s">
          <Icon name="mdi:twitter" size="20" />
        </a>
        <a href="#" class="social-icon mx-1" style="--delay: 0.2s">
          <Icon name="mdi:linkedin" size="20" />
        </a>
        <a href="#" class="social-icon mx-1" style="--delay: 0.3s">
          <Icon name="mdi:facebook" size="20" />
        </a>
        <a href="#" class="social-icon mx-1" style="--delay: 0.4s">
          <Icon name="mdi:instagram" size="20" />
        </a>
        <a href="#" class="social-icon" style="--delay: 0.5s">
          <Icon name="mdi:youtube" size="20" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style lang="scss" scoped>
.contact-info-wrapper {
  padding: 0.5rem 0;
  background-color: var(--bg-color);
}

.contact-info {
  .email,
  .phone {
    color: var(--text-color);
    transition: color 0.3s ease;
    font-size: 0.8rem;

    &:hover {
      color: var(--accent-color);

      .bounce-icon {
        animation: bounce 0.6s ease;
      }
    }
  }
}

.bounce-icon {
  display: inline-block;
  animation: bounce 2s infinite;
  animation-delay: var(--delay, 0s);
}

.socials {
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: var(--text-color);
    transition: all 0.3s ease;
    animation: bounce 2s infinite;
    animation-delay: var(--delay, 0s);
    border-radius: 50%;

    &:hover {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
      color: var(--bg-color);
      transform: translateY(-2px) scale(1.1);
      animation-play-state: paused;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
}

// Bounce animation with CSS custom property for delay
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  15% {
    transform: translateY(-4px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  30% {
    transform: translateY(0);
  }
  45% {
    transform: translateY(-3px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  60% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-1px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  90% {
    transform: translateY(0);
  }
}

// Alternative bounce animation (more subtle)
@keyframes gentle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

// Apply the bounce animation to all icons with staggered delays
.social-icon:nth-child(1) {
  --delay: 0.1s;
}
.social-icon:nth-child(2) {
  --delay: 0.3s;
}
.social-icon:nth-child(3) {
  --delay: 0.5s;
}
.social-icon:nth-child(4) {
  --delay: 0.7s;
}
.social-icon:nth-child(5) {
  --delay: 0.9s;
}

// Email and phone icons also get bounce
.email .icon {
  --delay: 0s;
}
.phone .icon {
  --delay: 0.2s;
}

// Responsive adjustments
@media (max-width: 991px) {
  .wrapper {
    flex-direction: column;
  }
  .contact-info {
    justify-content: space-around !important;
  }
}
@media (max-width: 768px) {
  .contact-info-wrapper {
    padding: 0.75rem 0;
  }

  .d-flex {
    align-items: flex-start !important;
  }

  .contact-info {
    width: 100%;

    .phone {
      margin-left: 0 !important;
    }
  }

  .socials {
    width: 100%;
    justify-content: center;
    padding-top: 16px;
    .social-icon {
      margin: 0 0.25rem !important;
      animation: gentle-bounce 2s infinite;
      animation-delay: var(--delay, 0s);

      &:nth-child(1) {
        --delay: 0s;
      }
      &:nth-child(2) {
        --delay: 0.2s;
      }
      &:nth-child(3) {
        --delay: 0.4s;
      }
      &:nth-child(4) {
        --delay: 0.6s;
      }
      &:nth-child(5) {
        --delay: 0.8s;
      }
    }
  }

  // On mobile, use simpler bounce for better performance
  @keyframes mobile-bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .social-icon {
    animation: mobile-bounce 3s infinite !important;
  }

  .bounce-icon {
    animation: mobile-bounce 3s infinite !important;
  }
}

// RTL support for Arabic
.bodyAR {
  .contact-info {
    .email,
    .phone {
      .icon {
        margin-left: 0.5rem;
        margin-right: 0;
      }
    }
  }

  .socials {
    .social-icon {
      margin-left: 0.5rem !important;
      margin-right: 0 !important;

      &:last-child {
        margin-left: 0 !important;
      }
    }
  }
}

// Reduce motion preference
@media (prefers-reduced-motion: reduce) {
  .bounce-icon,
  .social-icon {
    animation: none !important;
  }
}
</style>
