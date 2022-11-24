<template>
  <div :class="$style.wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" module>
.wrapper {
  width: 22.1rem;
  height: 22.1rem;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05), 0px 5px 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 0.5rem 1.5rem 2rem;
}
</style>
