<template>
  <div :class="$style.wrapper">
    <slot />
    <dummy />
  </div>
</template>
<script>
import dummy from '../MobilePortraitDummy/MobilePortraitDummy'

export default {
  name: 'DefaultLayout',
  components: { dummy },
}
</script>
<style lang="scss" module>
@import './DefaultLayout.scss';
</style>
