<template>
  <!-- 
    This component demonstrates how to use the LayoutGridColumn in a standard Bootstrap 5 row.
    The 'row g-4' classes handle the responsive layout and gutters between columns.
  -->
  <div class="vc-row-container row g-4 my-5 mx-auto">
    <!-- Left Column (Uses default: col-12 col-sm-6) -->
    <LayoutGridColumn>
      <div class="content-box bg-light p-4 rounded shadow-sm h-100">
        <h3 class="h5 fw-bold text-primary mb-3">Content Block A (50%)</h3>
        <p class="text-secondary">
          This content occupies the left half of the row on small screens and
          larger, using the default 'col-12 col-sm-6' structure, replicating
          'vc_col-sm-6'. The height utility (h-100) ensures content boxes align
          visually.
        </p>
      </div>
    </LayoutGridColumn>

    <!-- Right Column (Uses default: col-12 col-sm-6) -->
    <LayoutGridColumn>
      <div class="content-box bg-light p-4 rounded shadow-sm h-100">
        <h3 class="h5 fw-bold text-primary mb-3">Content Block B (50%)</h3>
        <p class="text-secondary">
          This block completes the row. The layout is fully responsive, stacking
          vertically on mobile and becoming side-by-side from the small
          breakpoint (sm).
        </p>
      </div>
    </LayoutGridColumn>

    <!-- Example of a custom width (33.3% width on medium screens and up) -->
    <!-- We use col-12 col-md-4 for this 1/3 structure -->
    <LayoutGridColumn bootstrap-classes="col-12 col-md-4">
      <div class="content-box bg-info-subtle p-4 rounded shadow-sm h-100">
        <h3 class="h5 fw-bold text-info mb-3">Custom Width (1/3)</h3>
        <p class="text-info-emphasis">
          This block demonstrates overriding the default width by passing
          'col-12 col-md-4' to the 'bootstrap-classes' prop.
        </p>
      </div>
    </LayoutGridColumn>

    <!-- Example of a custom width (33.3% width on medium screens and up) -->
    <LayoutGridColumn bootstrap-classes="col-12 col-md-4">
      <div class="content-box bg-warning-subtle p-4 rounded shadow-sm h-100">
        <h3 class="h5 fw-bold text-warning mb-3">Custom Width (1/3)</h3>
        <p class="text-warning-emphasis">
          Here is the second 1/3 column, using standard Bootstrap utility
          classes for decoration.
        </p>
      </div>
    </LayoutGridColumn>

    <!-- Example of a custom width (33.3% width on medium screens and up) -->
    <LayoutGridColumn bootstrap-classes="col-12 col-md-4">
      <div class="content-box bg-success-subtle p-4 rounded shadow-sm h-100">
        <h3 class="h5 fw-bold text-success mb-3">Custom Width (1/3)</h3>
        <p class="text-success-emphasis">
          And the final 1/3 column, completing a responsive three-column
          section.
        </p>
      </div>
    </LayoutGridColumn>
  </div>
</template>

<script setup>
// This is just a container component, no specific logic needed here.
</script>

<style lang="scss" scoped>
/* Scoped styles for the example usage */
// Use SCSS to easily target and style the row container if needed
.vc-row-container {
  // Note: The Bootstrap .container class usually sets the max-width and padding.
  // We are adding specific padding here for demonstration purposes.
  max-width: 1200px;
  padding-left: 15px;
  padding-right: 15px;
}

// Custom styles for the content boxes to enhance UX/decoration
.content-box {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
  }
}
</style>
