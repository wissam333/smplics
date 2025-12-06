<template>
  <div class="cont">
    <div class="d-flex justify-content-between align-items-center">
      <!-- Contact Info -->
      <div class="d-flex contact-info">
        <div class="email d-flex align-items-center">
          <Icon name="ic:round-email" size="20" class="me-2" />
          <span>info@smplics.com</span>
        </div>
        <div class="phone d-flex align-items-center ms-4">
          <Icon name="ic:round-phone" size="20" class="me-2" />
          <span>+(971) 58584-0433</span>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="socials d-flex">
        <a href="#" class="social-icon me-3">
          <Icon name="mdi:twitter" size="24" />
        </a>
        <a href="#" class="social-icon me-3">
          <Icon name="mdi:linkedin" size="24" />
        </a>
        <a href="#" class="social-icon me-3">
          <Icon name="mdi:facebook" size="24" />
        </a>
        <a href="#" class="social-icon me-3">
          <Icon name="mdi:instagram" size="24" />
        </a>
        <a href="#" class="social-icon">
          <Icon name="mdi:youtube" size="24" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cont {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.contact-info {
  .email,
  .phone {
    color: var(--text-color);
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-color);
    }
  }
}

.socials {
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    color: var(--text-color);
    background-color: var(--card-bg);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
      color: var(--bg-color);
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .contact-info {
    margin-bottom: 1rem;

    .phone {
      margin-left: 0 !important;
      margin-top: 0.5rem;
    }
  }

  .socials {
    width: 100%;
    justify-content: space-between;

    .social-icon {
      margin: 0 !important;
      width: 36px;
      height: 36px;

      .icon {
        width: 18px;
        height: 18px;
      }
    }
  }
}

// RTL support for Arabic
.bodyAR & {
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
      margin-left: 0.75rem !important;
      margin-right: 0 !important;

      &:last-child {
        margin-left: 0 !important;
      }
    }
  }
}
</style>
