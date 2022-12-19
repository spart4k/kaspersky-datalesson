<template>
  <tr
    :class="[
      $style.row,
      $props.isClickable && $style.clickable,
      $props.isSelected && $style.selected,
      $props.isWrong && $style.wrong,
      $props.isCorrect && $style.correct,
      level === '3' && $style.level3,
    ]"
    @click="$emit('click')"
  >
    <template v-if="level === '3'">
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? level3ImgDataStage6[index - 1][0].slice(0, -4)
                : level3ImgData[index - 1][0].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? level3ImgDataStage6[index - 1][0] : level3ImgData[index - 1][0]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? level3ImgDataStage6[index - 1][1].slice(0, -4)
                : level3ImgData[index - 1][1].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? level3ImgDataStage6[index - 1][1] : level3ImgData[index - 1][1]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? level3ImgDataStage6[index - 1][2].slice(0, -4)
                : level3ImgData[index - 1][2].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? level3ImgDataStage6[index - 1][2] : level3ImgData[index - 1][2]
          }`"
          alt=""
        />
      </td>
      <td
        :class="[
          $style.cell,
          $props.stage < 2 && $style.hidden,
          $props.stage === 6 && $style.scaled,
        ]"
      >
        <img
          :class="
            $style[
              $props.stage > 5
                ? level3ImgDataStage6[index - 1][3].slice(0, -4)
                : level3ImgData[index - 1][3].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? level3ImgDataStage6[index - 1][3] : level3ImgData[index - 1][3]
          }`"
          alt=""
        />
      </td>
    </template>
    <template v-else>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6[index - 1][0].slice(0, -4)
                : imgData[index - 1][0].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6[index - 1][0] : imgData[index - 1][0]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6[index - 1][1].slice(0, -4)
                : imgData[index - 1][1].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6[index - 1][1] : imgData[index - 1][1]
          }`"
          alt=""
        />
      </td>
      <td
        :class="[
          $style.cell,
          $props.stage < 2 && $style.hidden,
          $props.stage === 6 && $style.scaled,
        ]"
      >
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6[index - 1][2].slice(0, -4)
                : imgData[index - 1][2].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6[index - 1][2] : imgData[index - 1][2]
          }`"
          alt=""
        />
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
    isCorrect: Boolean,
  },
  setup(props) {
    const store = useStore();
    const level = computed(() => store.state.level);

    const { index, stage } = props;

    const imgData = [
      ['wind1.png', 'hot.png', 'hot.png'],
      ['wind3.png', 'cold.png', 'hot.png'],
      ['wind1.png', 'cold.png', 'cold.png'],
      ['wind3.png', 'hot.png', 'cold.png'],
    ];

    const imgDataStage6 = [
      ['wind3.png', 'cold.png', 'hot.png'],
      ['wind1.png', 'cold.png', ''],
      ['wind3.png', 'hot.png', 'cold.png'],
      ['wind1.png', 'hot.png', ''],
    ];

    const level3ImgData = [
      ['wind1.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind3.png', 'sun.png', 'cold.png', 'hot.png'],
      ['wind1.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind3.png', 'rain.png', 'cold.png', 'cold.png'],
      ['wind1.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind3.png', 'sun.png', 'cold.png', 'hot.png'],
      ['wind1.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind3.png', 'rain.png', 'hot.png', 'hot.png'],
    ];

    const level3ImgDataStage6 = [
      ['wind3.png', 'rain.png', 'cold.png', ''],
      ['wind1.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind3.png', 'sun.png', 'hot.png', 'cold.png'],
      ['wind1.png', 'sun.png', 'hot.png', ''],
    ];

    return {
      level,
      level3ImgData,
      level3ImgDataStage6,
      index,
      stage,
      imgData,
      imgDataStage6,
    };
  },
};
</script>

<style lang="scss" module>
.row {
  width: 100%;
  height: rem(40);
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  pointer-events: none;
  &.clickable {
    pointer-events: all;
  }
  &.clickable:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
  &:not(.level3) .cell {
    &:nth-child(1) {
      padding-left: rem(40);
    }
    &:nth-child(2) {
      text-align: center;
    }
    &:nth-child(3) {
      text-align: center;
      transform: scale(1);
      transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  }
  &.level3 .cell {
    &:nth-child(1) {
      padding-left: rem(40);
    }
    &:nth-child(2) {
      text-align: center;
    }
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: center;
      transform: scale(1);
      transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  }
}

.wind1 {
  width: rem(13);
  height: rem(10.4);
}

.wind3 {
  width: rem(27);
  height: rem(24);
}

.hot {
  width: rem(17);
  height: rem(27);
}

.cold {
  width: rem(18);
  height: rem(27);
}

.rain {
  width: rem(18);
  height: rem(18);
}

.sun {
  width: rem(18);
  height: rem(18);
}

.hidden {
  opacity: 0;
}

.scaled {
  transition: transform 2s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: scale(0) !important;
}

.row.selected {
  background-color: #def0fa;
  &:hover {
    background-color: #def0fa;
  }
}

.wrong {
  background-color: #ff5353 !important;
  &:hover {
    background-color: #ff5353 !important;
  }
}

.row.correct {
  background-color: #D5F7DD;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    transform: translateY(100%);
    left: rem(14);
    width: rem(17);
    height: rem(12);
    background-image: url('../assets/correct.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  &:hover {
    background-color: #ffdede;
  }
}
</style>
