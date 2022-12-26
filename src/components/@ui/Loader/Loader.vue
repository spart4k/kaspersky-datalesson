<template>
  <div :class="$style.outer">
    <div :class="$style.inner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-btn',
  props: {
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
  },
};
</script>

<style lang="scss" module>
.outer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.inner {
  display: inline-block;
  position: relative;
  width: rem(80);
  height: rem(80);
  & div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: rem(40) rem(40);
  }
  & div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: rem(7);
    height: rem(7);
    border-radius: 50%;
    background: #fff;
    margin: rem(-4) 0 0 rem(-4);
  }
  & div:nth-child(1) {
    animation-delay: -0.036s;
  }
  & div:nth-child(1):after {
    top: rem(63);
    left: rem(63);
  }
  & div:nth-child(2) {
    animation-delay: -0.072s;
  }
  & div:nth-child(2):after {
    top: rem(68);
    left: rem(56);
  }
  & div:nth-child(3) {
    animation-delay: -0.108s;
  }
  & div:nth-child(3):after {
    top: rem(71);
    left: rem(48);
  }
  & div:nth-child(4) {
    animation-delay: -0.144s;
  }
  & div:nth-child(4):after {
    top: rem(72);
    left: rem(40);
  }
  & div:nth-child(5) {
    animation-delay: -0.18s;
  }
  & div:nth-child(5):after {
    top: rem(71);
    left: rem(32);
  }
  & div:nth-child(6) {
    animation-delay: -0.216s;
  }
  & div:nth-child(6):after {
    top: rem(68);
    left: rem(24);
  }
  & div:nth-child(7) {
    animation-delay: -0.252s;
  }
  & div:nth-child(7):after {
    top: rem(63);
    left: rem(17);
  }
  & div:nth-child(8) {
    animation-delay: -0.288s;
  }
  & div:nth-child(8):after {
    top: rem(56);
    left: rem(12);
  }
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
