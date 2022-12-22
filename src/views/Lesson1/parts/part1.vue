<template>
  <div
    :class="[
      $style.wrapper,
      level === '1' && $style.level1,
      level === '2' && $style.level2,
      level === '3' && $style.level3,
    ]"
  >
    <div :class="$style.btnWrapper">
      <v-btn v-if="!isMobile" sm :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
      <v-btn v-if="isMobile" lg :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';
import useMobile from '@/hooks/useMobile';

export default {
  name: 'part1',
  components: {},
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
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  &.level1 {
    background-image: url('/assets/comics/level1/1_4-1.png');
  }
  &.level2 {
    background-image: url('/assets/comics/level2/5_8-1.png');
  }
  &.level3 {
    background-image: url('/assets/comics/level3/9_11-1.png');
  }
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
