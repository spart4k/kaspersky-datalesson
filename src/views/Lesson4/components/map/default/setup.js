import { ref, onMounted, watch, toRefs, computed } from 'vue';

export default {
  name: 'map-default',
  components: {
  },
  props: {
    stage: {
      type: Number,
      default: null
    },
    squere: {
      type: Number,
      default: 4
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const isShowRain = ref(false)
    const firstClicked = ref(false)
    const checking = (box) => {
      console.log(props.stage)
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
      console.log(grid.value)
      console.log(grid.value.every(el => el.checked === true))
      if (grid.value.every(el => el.checked)) {
        console.log('every true')
        emit('allChecked')
        if (props.stage === 2) {
          console.log()
          grid.value[1].lighting = true
          grid.value[3].lighting = true
          showRain()
        } else if (props.stage === 5) {
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
    const boxSize = ref(null)
    const showRain = () => {
      isShowRain.value = true
      console.log('show rain')
    }
    const grid = ref([])
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
      console.log(grid.value)
     }
    }
    const firstClick = () => {
      emit('firstClicked')
    }
    onMounted(() => {
      drawBoxes()
    })
    console.log(squereNum.value)
    watch(squereNum, () => {
      isShowRain.value = false
      console.log('change box')
      drawBoxes()
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
      firstClicked
    }
  },
}
