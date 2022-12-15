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
  border-radius: rem(12);
  cursor: pointer;
  border: none;
  transition: all .15s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    transform: scale(0.98);
  }
  &:active {
    transform: scale(0.96);
  }
}

.sm {
  padding: rem(15) rem(25);
  height: rem(52);
  background-color: #986ce7;
  color: #fff;
  font-weight: 700;
  font-size: rem(16);
  line-height: rem(22);
}

.md {
  background-color: #fff;
  height: rem(60);
  width: rem(200);
  font-weight: 700;
  font-size: rem(18);
  line-height: rem(25);
  color: #000;
}

.lg {
  background-color: #ffcc00;
  width: rem(320);
  height: rem(60);
  font-weight: 700;
  font-size: rem(18);
  line-height: rem(25);
  color: #000;
  @media screen and (max-width: 450px) {
    width: rem(260);
  }
}
</style>
