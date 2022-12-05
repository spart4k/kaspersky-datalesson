<template>
  <div :class="$style.main">
    <div
      :class="[isMobile && $style.outer, isOpened && $style.opened]"
      @click.self="$emit('toggle')"
    >
      <div v-if="!isMobile || (isMobile && isOpened)" :class="$style.wrapper" ref="wrapperRef">
        <transition-group name="fade-list" :class="$style.list">
          <div v-for="(item, index) in items" :class="$style.popupWrap" :key="index">
            <div :class="$style.popup">
              <div :class="$style.text">{{ item }}</div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div
      v-if="isMobile && !isOpened && pushMsg"
      :class="[$style.pushMsg, pushMsg && $style.animating]"
    >
      {{ pushMsg }}
    </div>
  </div>
</template>

<script>
import { watch, ref, onMounted, computed } from 'vue';

export default {
  name: 'PopupMessage',
  components: {},
  props: {
    items: Array,
    isOpened: Boolean,
  },
  setup(props) {
    const wrapperRef = ref(null);
    const clientWidth = ref(null);
    const pushMsg = ref(null);

    let timeout = null;

    watch(props.items, () => {
      pushMsg.value = props.items[props.items.length - 1];
      if (!timeout) {
        timeout = setTimeout(() => {
          pushMsg.value = null;
        }, 5000);
      }
      if (!isMobile) {
        setTimeout(() => {
          wrapperRef.value.scrollTop = wrapperRef.value.scrollHeight;
        }, 0);
      }
    });

    const isMobile = computed(() => (clientWidth.value <= 450 ? true : false));

    const isOpened = computed(() => (props.isOpened ? true : false));

    watch(isOpened, () => {
      pushMsg.value = null;
      // timeout && !isOpened && clearTimeout(timeout);
    });

    const onResize = () => {
      clientWidth.value = document.body.clientWidth;
    };

    onMounted(() => {
      onResize();
      window.addEventListener('resize', onResize);
    });

    return {
      wrapperRef,
      isMobile,
      pushMsg,
      isOpened,
    };
  },
};
</script>
<style lang="scss" module>
.main {
  pointer-events: none;
  & .outer {
    pointer-events: all;
  }
}

.outer {
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &.opened {
    @media screen and (max-width: 450px) {
      opacity: 1;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(12.5px);
      position: fixed;
      pointer-events: all;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}

.wrapper {
  -webkit-overflow-scrolling: touch;
  pointer-events: auto;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 99;

  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 450px) {
    position: absolute;
    bottom: rem(102);
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
  @media screen and (max-width: 450px) {
    width: 94%;
    position: relative;
    left: 3%;
  }
}

.popup {
  width: rem(280);
  padding: rem(15);
  background: #fff;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
}

.text {
  font-weight: 500;
  font-size: rem(14);
  line-height: rem(19);
  color: #000;
}

@keyframes pushAnimation {
  0% {
    transform: translateX(-50%) translateY(-200%);
  }

  10% {
    transform: translateX(-50%) translateY(0);
  }

  90% {
    transform: translateX(-50%) translateY(0);
  }

  100% {
    transform: translateX(-50%) translateY(-200%);
  }
}

.pushMsg {
  width: 80%;
  position: fixed;
  top: rem(20);
  left: 50%;
  transform: translateX(-50%) translateY(-200%);
  background-color: #fff;
  border-radius: rem(10);
  box-shadow: 0px rem(2) rem(3) rgba(0, 0, 0, 0.05), 0px rem(5) rem(20) rgba(0, 0, 0, 0.15);
  z-index: 9999;
  padding: rem(10) rem(15);
  font-size: rem(14);
  animation: none;
  &.animating {
    animation-name: pushAnimation;
    animation-duration: 5s;
    animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  }
}
</style>
