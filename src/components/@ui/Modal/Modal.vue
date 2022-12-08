<template>
  <portal to="popup">
    <transition name="fade">
      <div v-if="$props.isActive" :class="$style.wrapper" @click.self="$props.toggleActive || null">
        <div :class="$style.popup">
          <slot />
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  name: 'v-modal',
  props: {
    isActive: Boolean,
    toggleActive: Function,
  },
};
</script>

<style lang="scss" module>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.popup {
  width: rem(480);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05), 0px 5px 20px rgba(0, 0, 0, 0.15);
  border-radius: rem(20);
  @media screen and (max-width: 450px) {
    width: 82%;
  }
}
</style>
