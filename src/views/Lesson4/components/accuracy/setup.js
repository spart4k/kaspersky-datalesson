import { ref, onMounted, computed } from 'vue';

export default {
  name: 'timer',
  components: {
  },
  props: {
    stage: {
      type: Number,
      default: null
    },
    procents: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const timerValue = ref({
      hour: '00',
      minutes: '00',
      seconds: '00'
    })
    const timerInterval = ref(null)
    const allSeconds = ref(null)
    onMounted(() => {
  
    })
    const procents = computed(() => {
      return props.procents + '%'
    })
    // watch(() => form.value[0].value, (currentValue, oldValue) => {
    //   console.log(currentValue);
    //   console.log(oldValue);
    //   },
    //   { deep: true }
    // );
    return {
      timerValue,
      allSeconds,
      procents
    }
  },
}
