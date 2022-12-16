<template>
  <div :class="$style.wrapper">
    <div
      :class="[
        $style.inner,
        currentLesson === 1 && $style.lesson1,
        currentLesson === 2 && $style.lesson2,
        currentLesson === 3 && $style.lesson3,
        currentLesson === 4 && $style.lesson4,
        currentLesson === 5 && $style.lesson5,
        currentLesson === 6 && $style.lesson6,
        currentLesson === 0 && $style.completed,
      ]"
    >
      <template v-for="index in 6">
        <div
          :key="index"
          :class="[
            $style.slot,
            progress[index - 1] === 0 && $style.empty,
            progress[index - 1] === 1 && $style[`silver${index}`],
            progress[index - 1] === 2 && $style[`gold${index}`],
            progress[index - 1] !== 0 && $style.common,
          ]"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';

export default {
  name: 'v-progress',
  setup() {
    const store = useStore();
    const progress = computed(() => store.state.progress);
    const currentLesson = computed(() => store.state.currentLesson);

    return {
      progress,
      currentLesson,
    };
  },
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
  @media screen and (max-width: 450px) {
    width: rem(227);
    height: rem(39);
  }
}

.inner {
  border-radius: rem(30);
  display: flex;
  align-items: center;
  justify-content: center;
  width: rem(317);
  height: rem(48);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #c4c9ff 0%, #bea0f2 100%);
    position: absolute;
    top: 0;
    left: 0;
  }
  &.lesson1::after {
    width: 0;
  }
  &.lesson2::after {
    width: 17.5%;
  }
  &.lesson3::after {
    width: 33.5%;
  }
  &.lesson4::after {
    width: 50%;
  }
  &.lesson5::after {
    width: 67%;
  }
  &.lesson6::after {
    width: 83.5%;
  }
  &.completed::after {
    width: 100%;
  }
  @media screen and (max-width: 450px) {
    width: rem(222);
    height: rem(33);
  }
}

.slot {
  width: rem(41);
  height: rem(16);
  margin: rem(4.5);
  z-index: 10;
  @media screen and (max-width: 450px) {
    width: rem(29);
    height: rem(11);
  }
  &.empty {
    width: rem(44);
    background-image: url('./empty.png');
    background-size: rem(41) rem(16);
    background-repeat: no-repeat;
    background-position: center center;
    margin-top: rem(8);
    @media screen and (max-width: 450px) {
      background-size: 100% 100%;
    }
  }
  &.common {
    width: rem(44);
    height: rem(44);
    margin-bottom: rem(4);
    background-size: rem(44) rem(44);
    @media screen and (max-width: 450px) {
      height: rem(31);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  &.gold1 {
    background-image: url('/assets/img/progress/gold1.png');
  }
  &.silver1 {
    background-image: url('/assets/img/progress/silver1.png');
  }
  &.gold2 {
    background-image: url('/assets/img/progress/gold2.png');
  }
  &.silver2 {
    background-image: url('/assets/img/progress/silver2.png');
  }
  &.gold3 {
    background-image: url('/assets/img/progress/gold3.png');
  }
  &.silver3 {
    background-image: url('/assets/img/progress/silver3.png');
  }
  &.gold4 {
    background-image: url('/assets/img/progress/gold4.png');
  }
  &.silver4 {
    background-image: url('/assets/img/progress/silver4.png');
  }
  &.gold5 {
    background-image: url('/assets/img/progress/gold5.png');
  }
  &.silver5 {
    background-image: url('/assets/img/progress/silver5.png');
  }
  &.gold6 {
    background-image: url('/assets/img/progress/gold6.png');
  }
  &.silver6 {
    background-image: url('/assets/img/progress/silver6.png');
  }
}
</style>
