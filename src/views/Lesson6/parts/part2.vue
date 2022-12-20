<template>
  <div :class="[$style.wrapper, level === '1' && $style.level1, level === '2' && $style.level2, level === '3' && $style.level3]">
    <div :class="$style.btnWrapper">
      <v-btn md :class="$style.btn" @click="$emit('prev')">Назад</v-btn>
      <v-btn lg :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';

export default {
  name: 'part2',
  components: {},
  setup() {
    const store = useStore();
    const level = computed(() => store.state.level);

    return {
      level,
    };
  },
};
</script>

<style lang="scss" module>
.wrapper {
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  &.level1 {
    background-image: url('/assets/comics/level1/1_4-7.png');
  }
  &.level2 {
    background-image: url('/assets/comics/level2/5_8-7.png');
  }
  &.level3 {
    background-image: url('/assets/comics/level3/9_11-7.png');
  }
}

.btnWrapper {
  width: rem(540);
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: rem(51);
  left: 50%;
  transform: translateX(-50%);
  @media screen and (max-width: 450px) {
    flex-direction: column;
    align-items: center;
    > button {
      width: rem(280);
      &:not(:last-child) {
        margin-bottom: rem(20);
        border: 1px solid #ccc;
      }
    }
  }
}
</style>
