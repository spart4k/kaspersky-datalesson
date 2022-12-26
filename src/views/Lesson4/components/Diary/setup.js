import { ref,watch, onMounted, reactive } from 'vue';

export default {
  name: 'diary',
  components: {
  },
  props: {
    stage: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const isOpen = ref(false)
    const form = ref([
      {
        title: 'Кол-во осадков',
        postfix: 'мм',
        answer: 7,
        class: 'osadki',
        state: 'writing',
        value: ''
      },
      {
        title: 'Температура',
        postfix: '°С',
        answer: 7,
        class: 'temp',
        state: 'writing',
        value: ''
      },
      {
        title: 'Скорость ветра',
        postfix: 'м/с',
        answer: 7,
        class: 'veter',
        state: 'writing',
        value: ''
      },
      {
        title: 'Влажность',
        postfix: '%',
        answer: 7,
        class: 'vlaga',
        state: 'writing',
        value: ''
      },
      {
        title: 'Атм. давление',
        postfix: 'мм рт. cт.',
        answer: 7,
        class: 'davl',
        state: 'writing',
        value: ''
      },
    ])
    const open = () => {
      if (!isOpen.value) isOpen.value = true
    }
    const hide = () => {
      isOpen.value = false
    }
    form.value.forEach((item) => {
      watch(() => item.value, (currentValue, oldValue) => {
        if (+currentValue === item.answer) {
          item.state = 'success'
        }
      });
    })
    onMounted(() => {
    })
    // watch(() => form.value[0].value, (currentValue, oldValue) => {
    //   },
    //   { deep: true }
    // );
    return {
      open,
      hide,
      isOpen,
      form
    }
  },
}
