import { ref, onMounted, watch, toRefs, computed } from 'vue';
import mapRange from '../range'
import mapPanel from '../panel'
import mapGrade from '../grade'
import timer from '../../timer'
// import 'vue-range-component/dist/vue-range-slider.css'
// import VueRangeSlider from 'vue-range-component'
import VueSlider from 'vue-slider-component'
import useMobile from '@/hooks/useMobile';
import '@/styles/_range.scss'
// import 'vue-slider-component/theme/antd.css'
export default {
  name: 'map-default',
  components: {
    mapRange,
    VueSlider,
    mapPanel,
    mapGrade,
    timer
    // VueRangeSlider
  },
  props: {
    stage: {
      type: Number,
      default: null
    },
    squere: {
      type: Number,
      default: 4
    },
    level: {
      type: String,
      default: ''
    },
    isPaused: Boolean
  },
  setup(props, ctx) {
    const { emit } = ctx
    const isShowRain = ref(false)
    const firstClicked = ref(false)
    const rangeValue = ref(20)
    const smallMap = ref(true)
    const isMobile = useMobile();
    const isShowPanel = ref(false)
    const isShowGrade = ref(true)
    const isShowDoubleMap = ref(false)
    const timer = ref(null)
    const isShowRainDouble = ref(false)
    const checking = (box) => {
      if (props.level !== '1') return
      if (props.stage !== 2 && props.stage !== 5) return
      if (!firstClicked.value) firstClick()
      if (box.checked) {
        box.checked = false
      } else {
        box.checked = true
      }
      function isBigEnough(element, index, array) {
        return element >= 10;
      }
      if (grid.value.every(el => el.checked)) {
        emit('allChecked')
        if (props.stage === 2) {
          grid.value[1].lighting = true
          grid.value[3].lighting = true
        } else if (props.stage === 5 && props.level !== '1') {
          let array = [
            grid.value[1],
            grid.value[2],
            grid.value[3],
            grid.value[6],
            grid.value[7],
            grid.value[10],
            grid.value[11]
          ]
          array.forEach((item) => {
            item.lighting = true
          })
          showRain()
        }
      }
      
    }
    const squereNum = toRefs(props).squere
    const stageNum = toRefs(props).stage
    const boxSize = ref(null)
    const showRain = () => {
      isShowRain.value = true
    }
    const grid = ref([])
    const level = computed(() => {
      return 2
    })
    const drawBoxes = () => {
      const squere = props.squere
      grid.value = []
      for (var i = 0; i < squere; i++) {
        let box = {
          id: i,
          checked: false,
          lighting: false
        }
      grid.value.push(box)
      boxSize.value = 100/Math.sqrt(squere) + '%'
     }
    }
    const firstClick = () => {
      firstClicked.value = true
      emit('firstClicked')
    }
    const clearFirstClicked = () => {
      firstClicked.value = false
    }
    const changeSquere = (param) => {
      emit('changeSquereValue', param)
    }
    const changeCount = (val) => {
      emit('changeCountValue', val)
    }
    onMounted(() => {
      drawBoxes()
    })
    const check = (item) => {
      emit('checkPattern', item)
    }
    const showRainDouble = () => {
      isShowRainDouble.value = true
    }
    watch(squereNum, () => {
      isShowRain.value = false
      drawBoxes()
    })
    watch(stageNum, () => {
      if (stageNum.value === 4) {
        showRain()
        showRainDouble()
      }
    })

    const isPausedProp = computed(() => props.isPaused)

    watch(isPausedProp, () => {
      if (!isPausedProp.value) {
        let array = [
          grid.value[1],
          grid.value[2],
          grid.value[3],
          grid.value[6],
          grid.value[7],
          grid.value[10],
          grid.value[11]
        ]
        array.forEach((item) => {
          item.lighting = true
        })
        showRain()
      }
    })
    return {
      checking,
      grid,
      boxSize,
      showRain,
      isShowRain,
      drawBoxes,
      squereNum,
      firstClick,
      firstClicked,
      clearFirstClicked,
      rangeValue,
      changeSquere,
      level,
      smallMap,
      mapGrade,
      changeCount,
      check,
      isShowPanel,
      isShowGrade,
      isMobile,
      stageNum,
      isShowRainDouble,
      isShowDoubleMap,
      timer
    }
  },
}
