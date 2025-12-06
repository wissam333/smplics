<template>
  <!-- 
    The core column element using standard Bootstrap classes.
    It defaults to col-12 (full width on extra-small) and col-sm-6 (half width from small breakpoint up),
    replicating the original 'vc_col-sm-6' behavior.
  -->
  <div 
    class="wpb-grid-column" 
    :class="[bootstrapClasses]"
  >
    <!-- Inner container to replicate 'vc_column_container' spacing/padding -->
    <div class="vc-column-container">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Define props to make the component highly reusable
const props = defineProps({
  // Defines the Bootstrap column classes to control responsiveness and width.
  // Defaults to the WPBakery 'vc_col-sm-6' equivalent: col-12 (mobile) col-sm-6 (small+).
  bootstrapClasses: {
    type: String,
    default: 'col-12 col-sm-6', 
  },
});

/* Usage Note:
  This component should be used inside a standard Bootstrap row (class="row").
  The horizontal spacing/gutters are handled by Bootstrap's row.
*/
</script>

<style lang="scss" scoped>
// Define SCSS variables if needed (e.g., theme colors, transitions)
$column-padding-y: 15px;
$transition-speed: 0.3s;

.wpb-grid-column {
  /* This class itself is a Bootstrap column (e.g., col-sm-6), 
     which handles responsive width and horizontal gutters set by the parent row. */
}

/* Replicating the 'vc_column_container' padding often seen in visual builders */
.vc-column-container {
  // Apply vertical padding specific to this component's content area
  padding-top: $column-padding-y;
  padding-bottom: $column-padding-y;
  
  /* Optional: Add decorative styles for better visualization/UX */
  transition: all $transition-speed ease;
  height: 100%; /* Ensure container fills the column height */
}

/* Ensure images and content stretch correctly within the column */
.vc-column-container img {
    max-width: 100%;
    height: auto;
    display: block;
}
</style>