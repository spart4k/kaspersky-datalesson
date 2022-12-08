<template>
  <div :class="[$style.main, isOpened && $style.opened]" ref="mainRef">
    <div
      :class="[isMobile && $style.outer, isOpened && $style.opened]"
      @click.self="$emit('toggle')"
    ></div>
    <div :class="[$style.wrapper, !isOpened && $style.hidden]">
      <transition-group name="fade-list" :class="$style.list">
        <div v-for="(item, index) in items" :class="[$style.popupWrap, 'message']" :key="index">
          <div :class="$style.popup">
            <div :class="$style.text">{{ item }}</div>
          </div>
        </div>
      </transition-group>
    </div>
    <div v-if="isMobile && !isOpened" :class="[$style.pushMsg, pushMsg && $style.animating]">
      {{ pushMsg }}
    </div>
  </div>
</template>

<script>
import { watch, ref, onMounted, computed } from 'vue';
import useMobile from '@/hooks/useMobile';

export default {
  name: 'PopupMessage',
  components: {},
  props: {
    items: Array,
    isOpened: Boolean,
  },
  setup(props) {
    const mainRef = ref(null);
    const wrapperRef = ref(null);
    const pushMsg = ref(null);

    let timeout = null;

    const isMobile = useMobile();

    watch(props.items, () => {
      pushMsg.value = props.items[props.items.length - 1];
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        pushMsg.value = null;
      }, 3000);
      if (!isMobile.value) {
        setTimeout(() => {
          mainRef.value.scrollTop = mainRef.value.scrollHeight;
        }, 0);
      }
    });

    const isOpened = computed(() => (props.isOpened ? true : false));

    watch(isOpened, () => {
      // if (isOpened.value) {
      //   document.body.classList.add('fixed')
      // } else {
      //   document.body.classList.remove('fixed')
      // }
      if (isMobile.value) {
        setTimeout(() => {
          const bottomElem = document.querySelector('.message:last-child')
          bottomElem.scrollIntoView()
        }, 0);
        pushMsg.value = null;
        timeout && !isOpened && clearTimeout(timeout);
      }
    });

    onMounted(() => {
      document.body.classList.add('fixed');
    });

    return {
      mainRef,
      isMobile,
      pushMsg,
      isOpened,
    };
  },
};
</script>

<style lang="scss" module src="./PopupMessage.scss"></style>
