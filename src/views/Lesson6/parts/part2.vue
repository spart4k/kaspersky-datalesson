<template>
  <div :class="[$style.wrapper, level === '1' && $style.level1, level === '2' && $style.level2, level === '3' && $style.level3]">
    <inner-image-zoom
      :src="
        level === '1'
          ? '/assets/comics/level1/1_4-7.png'
          : level === '2'
          ? '/assets/comics/level2/5_8-7.png'
          : '/assets/comics/level3/9_11-7.png'
      "
      className="comics"
      :zoomScale="isMobile ? 0.3 : 1"
      :hideCloseButton="true"
      :hideHint="true"
    />
    <template v-if="!isMobile">
      <v-btn sm :class="$style.btn" @click="$emit('prev')">Назад</v-btn>
      <v-btn sm :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
    </template>
    <template v-if="isMobile">
      <div :class="$style.btnWrapper">
        <v-btn md :class="$style.btn" @click="$emit('prev')">Назад</v-btn>
        <v-btn lg :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
      </div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';
import useMobile from '@/hooks/useMobile';
import InnerImageZoom from 'vue-inner-image-zoom';

export default {
  name: 'part2',
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
  @media screen and (min-width: 451px) { 
    & button:nth-child(2) {
      background-color: #fff;
      border: 1px solid #ccc;
      color: #000;
      left: rem(20);
      bottom: rem(20);
      position: fixed;
    }
    & button:nth-child(3) {
      background-color: #ffcc00;
      color: #000;
      right: rem(20);
      bottom: rem(20);
      position: fixed;
    }
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
    bottom: rem(75);
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

.btn {
  height: rem(45) !important;
}
</style>
