<template>
  <div :class="$style.portraitDummy">
    <div :class="[$style.portraitDummy__text, $style.text]">
      <img :class="$style.text__img" src="./portrait_dummy.svg">
      <span :class="$style.text__title">Привет!</span>
      <span :class="$style.text__description">Нужно повернуть телефон в горизональное положение</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobilePortraitDummy',
}
</script>

<style lang="scss" module>
  @import './MobilePortraitDummy.scss';
</style>
