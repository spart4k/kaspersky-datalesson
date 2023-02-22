<template>
  <div :class="$style.wrapper">
    <slot />
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store';

export default {
  name: 'DefaultLayout',
  setup() {
    const store = useStore();
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
      var datetime = null
      setInterval(() => {
        currentdate.setSeconds(currentdate.getSeconds() + 1);
        let hours = currentdate.getHours();
        let minutes = currentdate.getMinutes();
        if (hours.toString().length === 1) {
          hours = '0'+hours
        }
        console.log(minutes.toString().length)
        if (minutes.toString().length === 1) {
          minutes = '0'+minutes
        }
        datetime = hours + ':' + minutes
        console.log(minutes)
        console.log(datetime)
        store.commit('setTime', datetime)
      }, 1000)
    })

    onUnmounted(() => window.removeEventListener('resize', updateFactors))
  },
}
</script>
<style lang="scss" module>
@import './DefaultLayout.scss';
</style>
