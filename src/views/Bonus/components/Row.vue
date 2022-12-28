<template>
  <tr
    :class="[
      $style.row,
      $props.isClickable && $style.clickable,
      $props.isSelected && $style.selected,
      $props.isWrong && $style.wrong,
      $props.isCorrect && $style.correct,
      $props.part > 2 && $style.extended,
    ]"
    @click="$emit('click')"
  >
    <template v-if="$props.part === 1">
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part1[index - 1][0].slice(0, -4)
                : imgDataPart1[index - 1][0].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part1[index - 1][0] : imgDataPart1[index - 1][0]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part1[index - 1][1].slice(0, -4)
                : imgDataPart1[index - 1][1].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part1[index - 1][1] : imgDataPart1[index - 1][1]
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
                ? imgDataStage6Part1[index - 1][2].slice(0, -4)
                : imgDataPart1[index - 1][2].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part1[index - 1][2] : imgDataPart1[index - 1][2]
          }`"
          alt=""
        />
      </td>
    </template>
    <template v-if="$props.part === 2">
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part2[index - 1][0].slice(0, -4)
                : imgDataPart2[index - 1][0].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part2[index - 1][0] : imgDataPart2[index - 1][0]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part2[index - 1][1].slice(0, -4)
                : imgDataPart2[index - 1][1].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part2[index - 1][1] : imgDataPart2[index - 1][1]
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
                ? imgDataStage6Part2[index - 1][2].slice(0, -4)
                : imgDataPart2[index - 1][2].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part2[index - 1][2] : imgDataPart2[index - 1][2]
          }`"
          alt=""
        />
      </td>
    </template>
    <template v-if="$props.part === 3">
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part3[index - 1][0].slice(0, -4)
                : imgDataPart3[index - 1][0].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part3[index - 1][0] : imgDataPart3[index - 1][0]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part3[index - 1][1].slice(0, -4)
                : imgDataPart3[index - 1][1].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part3[index - 1][1] : imgDataPart3[index - 1][1]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part3[index - 1][2].slice(0, -4)
                : imgDataPart3[index - 1][2].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part3[index - 1][2] : imgDataPart3[index - 1][2]
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
                ? imgDataStage6Part3[index - 1][3].slice(0, -4)
                : imgDataPart3[index - 1][3].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part3[index - 1][3] : imgDataPart3[index - 1][3]
          }`"
          alt=""
        />
      </td>
    </template>
    <template v-if="$props.part === 4">
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part4[index - 1][0].slice(0, -4)
                : imgDataPart4[index - 1][0].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part4[index - 1][0] : imgDataPart4[index - 1][0]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part4[index - 1][1].slice(0, -4)
                : imgDataPart4[index - 1][1].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part4[index - 1][1] : imgDataPart4[index - 1][1]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part4[index - 1][2].slice(0, -4)
                : imgDataPart4[index - 1][2].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part4[index - 1][2] : imgDataPart4[index - 1][2]
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
                ? imgDataStage6Part4[index - 1][3].slice(0, -4)
                : imgDataPart4[index - 1][3].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part4[index - 1][3] : imgDataPart4[index - 1][3]
          }`"
          alt=""
        />
      </td>
    </template>
    <template v-if="$props.part === 5">
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part5[index - 1][0].slice(0, -4)
                : imgDataPart5[index - 1][0].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part5[index - 1][0] : imgDataPart5[index - 1][0]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part5[index - 1][1].slice(0, -4)
                : imgDataPart5[index - 1][1].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part5[index - 1][1] : imgDataPart5[index - 1][1]
          }`"
          alt=""
        />
      </td>
      <td :class="$style.cell">
        <img
          :class="
            $style[
              $props.stage > 5
                ? imgDataStage6Part5[index - 1][2].slice(0, -4)
                : imgDataPart5[index - 1][2].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part5[index - 1][2] : imgDataPart5[index - 1][2]
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
                ? imgDataStage6Part5[index - 1][3].slice(0, -4)
                : imgDataPart5[index - 1][3].slice(0, -4)
            ]
          "
          :src="`/assets/img/lesson5/${
            $props.stage > 5 ? imgDataStage6Part5[index - 1][3] : imgDataPart5[index - 1][3]
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
    part: Number,
  },
  setup(props) {

    const { index, stage } = props;

    const imgDataPart1 = [
      ['wind-down.png', 'hot.png', 'hot.png'],
      ['wind-left.png', 'cold.png', 'hot.png'],
      ['wind-right.png', 'hot.png', 'hot.png'],
      ['wind-up.png', 'cold.png', 'cold.png'],
      ['wind-right.png', 'cold.png', 'cold.png'],
      ['wind-down.png', 'cold.png', 'cold.png'],
      ['wind-left.png', 'hot.png', 'cold.png'],
      ['wind-up.png', 'hot.png', 'hot.png'],
    ];

    const imgDataStage6Part1 = [
      ['wind-right.png', 'hot.png', ''],
      ['wind-up.png', 'hot.png', ''],
      ['wind-left.png', 'hot.png', 'cold.png'],
      ['wind-right.png', 'cold.png', ''],
      ['wind-left.png', 'cold.png', 'hot.png'],
    ];

    const imgDataPart2 = [
      ['wind-down.png', 'hot.png', 'hot.png'],
      ['wind-left.png', 'cold.png', 'cold.png'],
      ['wind-left.png', 'hot.png', 'hot.png'],
      ['wind-up.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'cold.png', 'cold.png'],
      ['wind-right.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'hot.png', 'hot.png'],
      ['wind-up.png', 'cold.png', 'hot.png'],
      ['wind-right.png', 'cold.png', 'hot.png'],
      ['wind-left.png', 'hot.png', 'hot.png'],
      ['wind-up.png', 'hot.png', 'cold.png'],
      ['wind-right.png', 'cold.png', 'hot.png'],
    ];

    const imgDataStage6Part2 = [
      ['wind-left.png', 'hot.png', ''],
      ['wind-right.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'cold.png', ''],
      ['wind-left.png', 'hot.png', ''],
      ['wind-up.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'hot.png', ''],
    ];

    const imgDataPart3 = [
      ['wind-left.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-up.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind-right.png', 'sun.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-left.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind-right.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-up.png', 'sun.png', 'cold.png', 'cold.png'],
      ['wind-right.png', 'sun.png', 'hot.png', 'cold.png'],
      ['wind-up.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-left.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'sun.png', 'cold.png', 'cold.png'],
      ['wind-right.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-left.png', 'sun.png', 'cold.png', 'cold.png'],
      ['wind-down.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind-up.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'rain.png', 'hot.png', 'cold.png'],
    ];

    const imgDataStage6Part3 = [
      ['wind-left.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-up.png', 'sun.png', 'hot.png', ''],
      ['wind-right.png', 'sun.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'sun.png', 'cold.png', ''],
      ['wind-right.png', 'rain.png', 'hot.png', 'cold.png'],
    ];

    const imgDataPart4 = [
      ['wind-left.png', 'rain.png', 'hot.png', 'hot.png'],
      ['wind-up.png', 'sun.png', 'cold.png', 'hot.png'],
      ['wind-up.png', 'sun.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-right.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind-left.png', 'sun.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-left.png', 'rain.png', 'hot.png', 'hot.png'],
      ['wind-up.png', 'rain.png', 'cold.png', 'cold.png'],
      ['wind-left.png', 'sun.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'sun.png', 'cold.png', 'cold.png'],
      ['wind-right.png', 'rain.png', 'cold.png', 'cold.png'],
    ];

    const imgDataStage6Part4 = [
      ['wind-right.png', 'rain.png', 'hot.png', ''],
      ['wind-down.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-right.png', 'sun.png', 'cold.png', ''],
      ['wind-down.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'sun.png', 'hot.png', ''],
      ['wind-left.png', 'sun.png', 'cold.png', 'hot.png'],
      ['wind-up.png', 'sun.png', 'cold.png', 'hot.png'],
    ];

    const imgDataPart5 = [
      ['wind-left.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-up.png', 'sun.png', 'cold.png', 'cold.png'],
      ['wind-down.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-up.png', 'sun.png', 'hot.png', 'cold.png'],
      ['wind-right.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind-left.png', 'sun.png', 'cold.png', 'cold.png'],
      ['wind-down.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-left.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-up.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-left.png', 'sun.png', 'hot.png', 'hot.png'],
      ['wind-down.png', 'sun.png', 'cold.png', 'cold.png'],
      ['wind-right.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-up.png', 'rain.png', 'hot.png', 'cold.png'],
    ];

    const imgDataStage6Part5 = [
      ['wind-right.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'rain.png', 'hot.png', 'cold.png'],
      ['wind-up.png', 'sun.png', 'hot.png', 'cold.png'],
      ['wind-down.png', 'rain.png', 'cold.png', 'hot.png'],
      ['wind-down.png', 'sun.png', 'hot.png', ''],
      ['wind-left.png', 'sun.png', 'cold.png', ''],
      ['wind-up.png', 'sun.png', 'cold.png', ''],
    ];

    return {
      index,
      stage,
      imgDataPart1,
      imgDataStage6Part1,
      imgDataPart2,
      imgDataStage6Part2,
      imgDataPart3,
      imgDataStage6Part3,
      imgDataPart4,
      imgDataStage6Part4,
      imgDataPart5,
      imgDataStage6Part5,
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
  &:not(.extended) .cell {
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
  &.extended .cell {
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

.wind-left,
.wind-right,
.wind-up,
.wind-down {
  width: rem(28);
  height: rem(28);
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
