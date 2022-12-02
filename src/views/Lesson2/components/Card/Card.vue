<template>
  <div :class="[$style.wrapper, $props.isDisabled && $style.disabled, $props.isActive && $style.active, $props.isWrong && $style.wrong, $props.isNotSelected && $style.notSelected]" @click="$emit('click')">
    <div :class="$style.cardImgWrapper">
      <img :src="`/assets/img/lesson2/card${index}.svg`" alt="" />
    </div>
    <p :class="$style.cardText">
      {{titles[index - 1]}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {},
  props: {
    index: Number,
    isDisabled: Boolean,
    isActive: Boolean,
    isWrong: Boolean,
    isNotSelected: Boolean,
  },
  setup(props) {
    const { index } = props

    const titles = ['Спутники', 'Домашние метеостанции', 'Метеорадары', 'Метеозонды', 'Барометры\n в телефонах', 'Метеостанции']

    return {
      titles,
      index,
    };
  },
};
</script>

<style lang="scss" module>
@keyframes wrongAnimation {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(-6.93deg);
  }

  50% {
    transform: rotate(0);
  }

  75% {
    transform: rotate(6.93deg);
  }

  100% {
transform: rotate(0);
  }
}

.wrapper {
  width: rem(221);
  height: rem(221);
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05), 0px 5px 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: rem(5) rem(15) rem(20);
  color: #000;
  cursor: pointer;
  transition: all .2s cubic-bezier(0.25, 0.1, 0.25, 1);
  user-select: none;
  &:not(.active):hover {
    transform: scale(0.98);
  }
  &.active {
    z-index: 9999;
  }
}

.disabled {
  pointer-events: none;
}

.wrong {
  border: 3px solid red !important;
  color: red !important;
  animation-name: wrongAnimation;
  animation-duration: .3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.notSelected {
  opacity: 0.5;
}

.active {
  transform: scale(0.9);
  border: 2.70136px solid #BF54F2;
}

.cardImgWrapper {
  height: rem(152);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardText {
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-size: rem(16);
  line-height: rem(22);
  color: inherit;
}


</style>
