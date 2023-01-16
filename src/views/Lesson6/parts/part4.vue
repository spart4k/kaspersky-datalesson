<template>
  <div :class="[$style.wrapper, level === '1' && $style.level1, level === '2' && $style.level2, level === '3' && $style.level3]">
    <inner-image-zoom
      :src="
        level === '1'
          ? '/assets/comics/level1/1_4-8.png'
          : level === '2'
          ? '/assets/comics/level2/5_8-8.png'
          : '/assets/comics/level3/9_11-8.png'
      "
      className="comics"
      :zoomScale="isMobile ? 0.3 : 1"
      :hideCloseButton="true"
      :hideHint="true"
    />
    <div :class="$style.btnWrapper">
      <v-btn v-if="!isMobile" sm :class="$style.btn" @click="level === '3' ? $emit('next') : $emit('finish')">Продолжить</v-btn>
      <v-btn v-if="isMobile" lg :class="$style.btn" @click="level === '3' ? $emit('next') : $emit('finish')">Продолжить</v-btn>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';
import useMobile from '@/hooks/useMobile';
import InnerImageZoom from 'vue-inner-image-zoom';

export default {
  name: 'part1',
  components: { InnerImageZoom },
  setup() {
    const store = useStore();
    const level = computed(() => store.state.level);

    const isMobile = useMobile();

    return {
      level,
      isMobile,
    };
  },
};
</script>

<style lang="scss" module>
.wrapper {
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnWrapper {
  position: fixed;
  bottom: rem(51);
  left: 50%;
  transform: translateX(-50%);
  @media screen and (min-width: 451px) {
    left: unset;
    transform: unset;
    right: rem(20);
    bottom: rem(20);
    & button {
      background-color: #ffcc00;
      color: #000;
    }
  }
}
</style>
