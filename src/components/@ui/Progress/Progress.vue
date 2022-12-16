<template>
  <div :class="$style.wrapper">
    <template v-for="index in 6">
      <div :key="index" :class="[$style.slot, progress[index - 1] === 0 && $style.empty, progress[index - 1] === 1 && $style[`silver${index}`], progress[index - 1] === 2 && $style[`gold${index}`]]"></div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';

export default {
  name: 'v-progress',
  // props: {
  //   isActive: Boolean,
  //   toggleActive: Function,
  // },
  setup() {
    const store = useStore();
    const progress = computed(() => store.state.progress);

    console.log(progress.value);

    return {
      progress,
    }
  }
};
</script>

<style lang="scss" module>
.wrapper {
  width: rem(325);
  height: rem(56);
  background: #fff;
  box-shadow: 0px rem(2) rem(3) rgba(0, 0, 0, 0.05), 0px rem(5) rem(20) rgba(0, 0, 0, 0.15);
  border-radius: rem(32);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot {
  width: rem(41);
  height: rem(16);
  margin: rem(4.5);
  &.empty {
    background-image: url('./empty.png');
    background-size: rem(41) rem(16);
  }
  &.gold2 {
    width: rem(37);
    background-image: url('/assets/img/progress/gold2.png');
    background-size: 100% 100%;
  }
  &.gold3 {
    background:red;
  }
}
</style>
