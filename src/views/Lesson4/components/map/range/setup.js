import { ref, onMounted, watch, toRefs, computed } from 'vue';
import VueSlider from 'vue-slider-component'
import '@/styles/_range.scss'
import useMobile from '@/hooks/useMobile';
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
    const isMobile = useMobile();
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
      let square = null
      switch (rangeValue.value) {
        case '2x2':
          square = 2*2
          break;
        case '3x3':
          square = 3*3
          break;
        case '9x9':
          square = 9*9
          break;
        case '18x18':
          square = 18*18
          break;
        default:
          break;
      }
      console.log(square)
      emit('changeSquere', square)
    })
    return {
      rangeValue,
      rangeData,
      rangeKm,
      isMobile
    }
  },
}
