<template>
  <div :class="$style.wrapper">
    <slot />
    <dummy />
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'
import dummy from '../MobilePortraitDummy/MobilePortraitDummy'

export default {
  name: 'DefaultLayout',
  components: { dummy },
  setup() {
    const scaleFactorX = ref(null)

    const updateFactors = () => {
      const { clientWidth } = document.body
      scaleFactorX.value = 16 * clientWidth / 1280
      if (scaleFactorX.value > 16) scaleFactorX.value = 16
      document.documentElement.style.fontSize = `${scaleFactorX.value}px`
    }

    onMounted(() => {
      updateFactors()
      window.addEventListener('resize', updateFactors)
    })

    onUnmounted(() => window.removeEventListener('resize', updateFactors))
  },
}
</script>
<style lang="scss" module>
@import './DefaultLayout.scss';
</style>
