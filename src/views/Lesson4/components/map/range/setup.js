import { ref, onMounted, watch, toRefs, computed } from 'vue';
import VueSlider from 'vue-slider-component'
import '@/styles/_range.scss'
export default {
  name: 'map-default',
  components: {
    VueSlider,
    // VueRangeSlider
  },
  props: {
  },
  setup(props, ctx) {
    const { emit } = ctx
    const rangeValue = ref('2x2')
    const rangeData = ref(['2x2', '3x3', '9x9', '18x18'])
    const rangeKm = computed(() => {
      let text = ''
      switch (rangeValue.value) {
        case '2x2':
          text = '27x27 км'
          break;
        case '3x3':
          text = '9x9 км'
          break;
        case '9x9':
          text = '6x6 км'
          break;
        case '18x18':
          text = '3x3 км'
          break;
        default:
          break;
      }
      return text
    })
    watch(rangeValue, () => {
      console.log(rangeValue.value)
      emit('changeSquere')
    })
    return {
      rangeValue,
      rangeData,
      rangeKm
    }
  },
}
