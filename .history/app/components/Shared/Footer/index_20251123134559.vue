<template>
  <footer class="main-footer">
    <div class="newsletter-section">
      <div class="container">
        <SharedFooterNewsLetter />
      </div>
    </div>

    <div class="content-section">
      <div class="container">
        <div class="footer-grid" :class="{ ar: $i18n.locale === 'ar' }">
          <div class="grid-item logo-area">
            <SharedFooterLogo />
          </div>

          <div class="grid-item links-area">
            <SharedFooterLinks />
          </div>

          <div class="grid-item contact-area">
            <SharedFooterContactInfo />
          </div>
        </div>
      </div>
    </div>

    <SharedFooterCopyRight  />
  </footer>
</template>

<style lang="scss" scoped>
$dark-bg: #2b292a;

.main-footer {
  background-color: $dark-bg;
  color: #fff;
  position: relative;
  border-top: 3px solid $main;
  overflow: hidden;
}

.newsletter-section {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 0;
}

.content-section {
  padding: 60px 0;

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr; // Custom widths for better balance
    gap: 40px;
    align-items: start;

    // Tablet View
    @media (max-width: 991px) {
      grid-template-columns: 1fr 1fr; // 2 Columns

      .logo-area {
        grid-column: span 2; // Logo takes full width on tablet
        display: flex;
        justify-content: center;
        text-align: center;
      }
    }

    // Mobile View
    @media (max-width: 768px) {
      grid-template-columns: 1fr; // Stack everything
      gap: 50px;
      text-align: center;

      .logo-area {
        grid-column: span 1;
      }
    }
  }
}
</style>
