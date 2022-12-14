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
    const isOpen = ref(true)
    const form = ref([
      {
        title: 'Кол-во осадков',
        postfix: 'мм',
        answer: 14,
        class: 'osadki',
        state: 'writing',
        value: ''
      },
      {
        title: 'Температура',
        postfix: '°С',
        answer: 15,
        class: 'temp',
        state: 'writing',
        value: ''
      },
      {
        title: 'Скорость ветра',
        postfix: 'м/с',
        answer: 1.5,
        class: 'veter',
        state: 'writing',
        value: ''
      },
      {
        title: 'Влажность',
        postfix: '%',
        answer: 92,
        class: 'vlaga',
        state: 'writing',
        value: ''
      },
      {
        title: 'Атм. давление',
        postfix: 'гПа',
        answer: 35,
        class: 'davl',
        state: 'writing',
        value: ''
      },
    ])
    const open = () => {
      if (!isOpen.value) isOpen.value = true
    }
    const hide = () => {
      console.log(isOpen.value)
      isOpen.value = false
    }
    form.value.forEach((item) => {
      watch(() => item.value, (currentValue, oldValue) => {
        console.log(currentValue);
        if (+currentValue === item.answer) {
          item.state = 'success'
        }
        console.log(item)
      });
    })
    onMounted(() => {
    })
    // watch(() => form.value[0].value, (currentValue, oldValue) => {
    //   console.log(currentValue);
    //   console.log(oldValue);
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
