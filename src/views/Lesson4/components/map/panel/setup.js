import { ref, onMounted, watch, toRefs, computed } from 'vue';
import useMobile from '@/hooks/useMobile';
export default {
  name: 'map-panel',
  props: {
    isShowPanel: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const isMobile = useMobile();
    const isShowPanelValue = toRefs(props).isShowPanel
    const weatherOptionsClone = ref([
      {
        label: 'Температура воздуха',
        value: true,
        disable: true
      },
      {
        label: 'Атмосферное давление',
        value: true,
        disable: true
      },
      {
        label: 'Влажность воздуха',
        value: true,
        disable: true
      },
      {
        label: 'Скорость и направление ветра',
        value: true,
        disable: true
      },
      {
        label: 'Кол-во осадков за 12 часов',
        value: true,
        disable: true
      },
      {
        label: 'Общее количество облачности',
        value: false
      },
      {
        label: 'Высота облаков',
        value: false
      },
      {
        label: 'Интенсивность солнечного света',
        value: false
      },
      {
        label: 'Температура почвы',
        value: false
      },
      {
        label: 'Тип осадков',
        value: false
      }
    ])
    const weatherOptions = ref([
      {
        label: 'Температура воздуха',
        value: true,
        disable: true
      },
      {
        label: 'Атмосферное давление',
        value: true,
        disable: true
      },
      {
        label: 'Влажность воздуха',
        value: true,
        disable: true
      },
      {
        label: 'Скорость и направление ветра',
        value: true,
        disable: true
      },
      {
        label: 'Кол-во осадков за 12 часов',
        value: true,
        disable: true
      },
      {
        label: 'Общее количество облачности',
        value: false
      },
      {
        label: 'Высота облаков',
        value: false
      },
      {
        label: 'Интенсивность солнечного света',
        value: false
      },
      {
        label: 'Температура почвы',
        value: false
      },
      {
        label: 'Тип осадков',
        value: false
      }
    ])
    const answerCount = computed(() => {
      let count = null
      weatherOptions.value.forEach((item) => {
        if (item.value) count++
      })
      if (!isMobile.value) emit('changeCount', count)
      return count
    })
    const applyOptions = () => {
      let count = null
      weatherOptions.value.forEach((item) => {
        if (item.value) count++
      })
      if (isMobile.value) emit('changeCount', count)
      emit('closePanel')
    }
    const closePanel = () => {
      // weatherOptions.value.forEach((item, index) => {
      //   if (index < 5) item.value = true
      //   else {
      //     item.value = false
      //   }
      // })
      weatherOptions.value.forEach((item, index) => {
        item.value = weatherOptionsClone.value[index].value
      })
      emit('closePanel')
    }
    onMounted(() => {
    })
    watch(isShowPanelValue, (curValue) => {
      if (curValue) {
        weatherOptionsClone.value.forEach((item, index) => {
          item.value = weatherOptions.value[index].value
        })
      }
    })
    return {
      weatherOptions,
      answerCount,
      isMobile,
      applyOptions,
      closePanel,
      isShowPanelValue,
      weatherOptionsClone
    }
  },
}
