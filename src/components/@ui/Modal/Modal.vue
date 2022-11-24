<template>
  <portal to="popup">
    <transition name="reveal">
      <div v-if="isActive" :class="$style.wrapper" @click.self="toggleActive">
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
  setup(props) {
    const { isActive, toggleActive } = props;

    return {
      isActive,
      toggleActive,
    };
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
}

.popup {
  width: 48rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05), 0px 5px 20px rgba(0, 0, 0, 0.15);
  border-radius: 2rem;
}
</style>
