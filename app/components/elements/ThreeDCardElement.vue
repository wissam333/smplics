<template>
  <component
    :is="as"
    ref="refElement"
    class="three-d-element"
  >
    <slot />
  </component>
</template>

<script setup>
import { ref, watch, inject, computed } from 'vue';

const props = defineProps({
  as: { type: String, default: "div" },
  translateX: { type: [Number, String], default: 0 },
  translateY: { type: [Number, String], default: 0 },
  translateZ: { type: [Number, String], default: 0 },
  rotateX: { type: [Number, String], default: 0 },
  rotateY: { type: [Number, String], default: 0 },
  rotateZ: { type: [Number, String], default: 0 },
  transitionDuration: { type: [Number, String], default: 500 }
});

const refElement = ref(null);
const mouseState = inject("use3DCardMouseState");

function handleAnimation(isMouseEntered) {
  if (!refElement.value) return;

  if (isMouseEntered) {
    refElement.value.style.transition = `transform ${props.transitionDuration}ms ease`;
    refElement.value.style.transform = 
      `translateX(${props.translateX}px) 
       translateY(${props.translateY}px) 
       translateZ(${props.translateZ}px) 
       rotateX(${props.rotateX}deg) 
       rotateY(${props.rotateY}deg) 
       rotateZ(${props.rotateZ}deg)`;
  } else {
    refElement.value.style.transition = `transform ${props.transitionDuration}ms ease`;
    refElement.value.style.transform = 
      `translateX(0px) 
       translateY(0px) 
       translateZ(0px) 
       rotateX(0deg) 
       rotateY(0deg) 
       rotateZ(0deg)`;
  }
}

watch(() => mouseState?.isMouseEntered?.value, (newVal) => {
  if (mouseState) {
    handleAnimation(newVal);
  }
}, { immediate: true });
</script>

<style scoped>
.three-d-element {
  transition-property: transform;
  transition-timing-function: ease-in-out;
  will-change: transform;
}
</style>