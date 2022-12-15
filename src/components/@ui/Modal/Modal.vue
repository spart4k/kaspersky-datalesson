<template>
  <portal to="popup">
    <transition name="fade" appear>
      <div
        :class="$style.overlay"
        v-if="$props.isActive"
        @click.self="$props.toggleActive || null"
      ></div>
    </transition>
    <transition name="pop" appear>
      <div :class="$style.modal" role="dialog" v-if="$props.isActive">
        <slot />
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
.overlay {
  content: '';
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: #000;
  opacity: 0.5;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: rem(480);
  height: fit-content;
  background-color: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05), 0px 5px 20px rgba(0, 0, 0, 0.15);
  border-radius: rem(20);
  z-index: 10000;
  @media screen and (max-width: 450px) {
    width: 82%;
  }
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>