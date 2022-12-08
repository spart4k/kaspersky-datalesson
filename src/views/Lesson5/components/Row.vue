<template>
  <tr :class="[$style.row, $props.isClickable && $style.clickable, $props.isSelected && $style.selected, $props.isWrong && $style.wrong]" @click="$emit('click')">
    <template v-if="level === '1'">
      <td :class="$style.cell">
        <img :class="$style[level1ImgData[index - 1][0].slice(0, -4)]" :src="`/assets/img/lesson5/${level1ImgData[index - 1][0]}`" alt="" />
      </td>
      <td :class="$style.cell">
        <img :class="$style[level1ImgData[index - 1][1].slice(0, -4)]" :src="`/assets/img/lesson5/${level1ImgData[index - 1][1]}`" alt="" />
      </td>
      <td :class="[$style.cell, $props.stage < 2 && $style.hidden]">
        <img :class="$style[level1ImgData[index - 1][2].slice(0, -4)]" :src="`/assets/img/lesson5/${level1ImgData[index - 1][2]}`" alt="" />
      </td>
    </template>
  </tr>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from '@/store';

export default {
  name: 'Row',
  props: {
    index: Number,
    stage: Number,
    isSelected: Boolean,
    isClickable: Boolean,
    isWrong: Boolean,
  },
  setup(props) {
    const store = useStore();
    const level = computed(() => store.state.level);

    const { index, stage } = props

    const level1ImgData = [
      ['wind1.png', 'hot.png', 'hot.png'],
      ['wind3.png', 'cold.png', 'hot.png'],
      ['wind1.png', 'cold.png', 'cold.png'],
      ['wind3.png', 'hot.png', 'hot.png'],
    ];

    return {
      level,
      level1ImgData,
      index,
      stage,
    };
  },
};
</script>

<style lang="scss" module>
.row {
  width: 100%;
  height: rem(40);
  transition: background-color .3s cubic-bezier(0.25, 0.1, 0.25, 1);
  pointer-events: none;
  &.clickable {
    pointer-events: all;
  }
  &.clickable:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
}

.cell {
  &:nth-child(1) {
    padding-left: rem(40);
  }
  &:nth-child(2) {
    text-align: center;
  }
  &:nth-child(3) {
    text-align: center;
    transition: opacity .3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
}

.wind1 {
  width: rem(13);
  height: rem(10.4);
  mix-blend-mode: multiply;
}

.wind3 {
  width: rem(27);
  height: rem(24);
  mix-blend-mode: multiply;
}

.hot {
  width: rem(17);
  height: rem(27);
  mix-blend-mode: multiply;
}

.cold {
  width: rem(18);
  height: rem(27);
  mix-blend-mode: multiply;
}

.hidden {
  opacity: 0;
}

.row.selected {
  background-color: #DEF0FA;
  &:hover {
    background-color: #DEF0FA;
  }
}

.wrong {
  background-color: #ff5353 !important;
  &:hover {
    background-color: #ff5353 !important;
  }
}
</style>
