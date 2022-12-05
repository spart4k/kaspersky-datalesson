<template>
  <div
    :class="[
      $style.wrapper,
      $props.isDisabled && $style.disabled,
      $props.isActive && $style.active,
      $props.isWrong && $style.wrong,
      $props.isNotSelected && $style.notSelected,
    ]"
    @click="$emit('click')"
  >
    <div :class="$style.cardImgWrapper">
      <img :src="`/assets/img/lesson2/card${index}.svg`" alt="" />
    </div>
    <p :class="$style.cardText">
      {{ titles[index - 1] }}
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
    const { index } = props;

    const titles = [
      'Спутники',
      'Домашние метеостанции',
      'Метеорадары',
      'Метеозонды',
      'Барометры\n в телефонах',
      'Метеостанции',
    ];

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
  box-shadow: 0px rem(2) rem(3) rgba(0, 0, 0, 0.05), 0px rem(5) rem(20) rgba(0, 0, 0, 0.15);
  border-radius: rem(20);
  padding: rem(5) rem(15) rem(20);
  color: #000;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  user-select: none;
  &:not(.active):hover {
    transform: scale(0.98);
  }
  &.active {
    z-index: 9999;
  }

  &:nth-child(1) img {
    width: rem(115);
    height: rem(84);
  }
  &:nth-child(2) img {
    width: rem(33);
    height: rem(76);
  }
  &:nth-child(3) img {
    width: rem(120);
    height: rem(120);
  }
  &:nth-child(4) img {
    width: rem(85);
    height: rem(136);
  }
  &:nth-child(5) img {
    width: rem(119);
    height: rem(119);
  }
  &:nth-child(6) img {
    width: rem(74);
    height: rem(120);
  }
  @media screen and (max-width: 450px) {
    width: 48%;
    height: rem(142);
    padding: rem(10);
    position: relative;
    & img {
      max-height: 100%;
    }
  }
}

.disabled {
  pointer-events: none;
}

.wrong {
  border: 3px solid red !important;
  color: red !important;
  animation-name: wrongAnimation;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.notSelected {
  opacity: 0.5;
}

.active {
  transform: scale(0.9);
  border: 2.70136px solid #bf54f2;
}

.cardImgWrapper {
  height: rem(152);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 450px) {
    height: rem(70);
  }
}

.cardText {
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-size: rem(16);
  line-height: rem(22);
  color: inherit;
  @media screen and (max-width: 450px) {
    font-size: rem(14);
    line-height: rem(19);
    position: absolute;
    bottom: rem(15);
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  }
}
</style>
