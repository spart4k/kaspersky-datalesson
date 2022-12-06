<template>
  <div :class="$style.main" ref="wrapperRef">
    <div
      :class="[isMobile && $style.outer, isOpened && $style.opened]"
      @click.self="$emit('toggle')"
    >
      
    </div>
    <div v-if="!isMobile || (isMobile && isOpened)" :class="$style.wrapper" >
        <transition-group name="fade-list" :class="$style.list">
          <div v-for="(item, index) in items" :class="$style.popupWrap" :key="index">
            <div :class="$style.popup">
              <div :class="$style.text">{{ item }}</div>
            </div>
          </div>
        </transition-group>
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
import useMobile from '@/hooks/useMobile';

export default {
  name: 'PopupMessage',
  components: {},
  props: {
    items: Array,
    isOpened: Boolean,
  },
  setup(props) {
    const wrapperRef = ref(null);
    const pushMsg = ref(null);

    let timeout = null;

    const isMobile = useMobile();

    watch(props.items, () => {
      pushMsg.value = props.items[props.items.length - 1];
      if (!timeout) {
        timeout = setTimeout(() => {
          pushMsg.value = null;
        }, 5000);
      }
      if (!isMobile.value) {
        setTimeout(() => {
          wrapperRef.value.scrollTop = wrapperRef.value.scrollHeight;
        }, 0);
      }
    });

    const isOpened = computed(() => (props.isOpened ? true : false));

    watch(isOpened, () => {
      if (isOpened.value) {
        document.body.classList.add('fixed')
      } else {
        document.body.classList.remove('fixed')
      }
      pushMsg.value = null;
      // timeout && !isOpened && clearTimeout(timeout);
    });

    onMounted(() => {
      document.body.classList.add('fixed')
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

<style lang="scss" module src="./PopupMessage.scss"></style>
