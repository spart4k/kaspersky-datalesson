<template>
  <div :class="$style.wrapper">
    <slot />
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'DefaultLayout',
  setup() {
    const scaleFactorX = ref(null)

    const updateFactors = (mode) => {
      const { clientWidth } = document.body
      scaleFactorX.value = 16 * clientWidth / 1280
      if (clientWidth <= 450) scaleFactorX.value = 16
      if (clientWidth >= 1600) {
        scaleFactorX.value = 16 * 1600 / 1280
      }
      document.documentElement.style.fontSize = `${scaleFactorX.value}px`
    }

    onMounted(() => {
      updateFactors(null)
      window.addEventListener('resize', () => updateFactors('resize'))
      var currentdate = new Date();
      var datetime =
                      currentdate.getHours() + ":"
                      + currentdate.getMinutes() + ":"
                      + currentdate.getSeconds();
      console.log(datetime)
    })

    onUnmounted(() => window.removeEventListener('resize', updateFactors))
  },
}
</script>
<style lang="scss" module>
@import './DefaultLayout.scss';
</style>
