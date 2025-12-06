<!-- components/shared/Navbar/ContactInfo.vue -->
<template>
  <div class="cont contact-info-wrapper">
    <div class="d-flex justify-content-between align-items-center">
      <!-- Contact Info -->
      <div class="d-flex contact-info">
        <div class="email d-flex align-items-center">
          <Icon name="ic:round-email" size="18" class="me-2" />
          <span class="mx-2">info@smplics.com</span>
        </div>
        <div class="phone d-flex align-items-center ms-4">
          <Icon name="ic:round-phone" size="18" class="me-2" />
          <span class="mx-2">+(971) 58584-0433</span>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="socials d-flex">
        <a href="#" class="social-icon me-2">
          <Icon name="mdi:twitter" size="20" />
        </a>
        <a href="#" class="social-icon me-2">
          <Icon name="mdi:linkedin" size="20" />
        </a>
        <a href="#" class="social-icon me-2">
          <Icon name="mdi:facebook" size="20" />
        </a>
        <a href="#" class="social-icon me-2">
          <Icon name="mdi:instagram" size="20" />
        </a>
        <a href="#" class="social-icon">
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
    }
  }
}

.socials {
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--text-color);
    background-color: var(--card-bg);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
      color: var(--bg-color);
      transform: translateY(-1px);
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .contact-info-wrapper {
    padding: 0.75rem 0;
  }

  .d-flex {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 0.5rem;
  }

  .contact-info {
    width: 100%;
    justify-content: space-between;

    .phone {
      margin-left: 0 !important;
    }
  }

  .socials {
    width: 100%;
    justify-content: center;

    .social-icon {
      margin: 0 0.25rem !important;
    }
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
</style>
