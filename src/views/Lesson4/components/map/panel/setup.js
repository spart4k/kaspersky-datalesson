import { ref, onMounted, watch, toRefs, computed } from 'vue';
export default {
  name: 'map-panel',
  setup(props, ctx) {
    const { emit } = ctx
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
      console.log(count)
      emit('changeCount', count)
      
      return count
    })
    return {
      weatherOptions,
      answerCount
    }
  },
}
