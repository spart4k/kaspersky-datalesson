<template>
  <button :class="[$style.wrapper, sm && $style.sm, md && $style.md, lg && $style.lg]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'v-btn',
  props: {
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
  },
};
</script>

<style lang="scss" module>
.wrapper {
  border-radius: 1.2rem;
  cursor: pointer;
  border: none;
}

.sm {
  padding: 1.5rem 2.5rem;
  height: 5.2rem;
  background-color: #986ce7;
  color: #fff;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.2rem;
}

.md {
  background-color: #fff;
  height: 6rem;
  width: 20rem;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  color: #000;
}

.lg {
  background-color: #ffcc00;
  width: 32rem;
  height: 6rem;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  color: #000;
}
</style>
