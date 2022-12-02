<template>
  <div :class="$style.wrapper" ref="wrapperRef">
    <transition-group name="fade-list" :class="$style.list">
      <div v-for="(item, index) in items" :class="$style.popupWrap" :key="index">
        <div :class="$style.popup">
          <div :class="$style.text">{{ item }}</div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { watch, ref } from 'vue';

export default {
  name: 'PopupMessage',
  components: {},
  props: {
    items: Array,
  },
  setup(props) {
    const wrapperRef = ref(null)

    watch(props.items, () => {
      setTimeout(() => {
        wrapperRef.value.scrollTop = wrapperRef.value.scrollHeight
      }, 0);
    })

    return {
      wrapperRef,
    };
  },
};
</script>
<style lang="scss" module>
.wrapper {
  -webkit-overflow-scrolling: touch;
  pointer-events: auto;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 5;

  &::-webkit-scrollbar {
    display: none;
  }
}

.popupWrap {
  margin-bottom: rem(10);
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  border-radius: rem(20);
  overflow: hidden;
  &:last-child {
    border-radius: rem(20) rem(20) rem(20) 0;
  }
}

.popup {
  width: rem(280);
  padding: rem(15);
  background: #fff;
}

.text {
  font-weight: 500;
  font-size: rem(14);
  line-height: rem(19);
  color: #000;
}
</style>
