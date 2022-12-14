import { ref, onMounted } from 'vue';

export default {
  name: 'timer',
  components: {
  },
  props: {
    stage: {
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
    const startTimer = () => {
      console.log('start timer')
      let seconds = timerValue.value.seconds
      let minutes = timerValue.value.minutes
      let hour = timerValue.value.hour
      timerInterval.value = setInterval(() => {
        seconds++
        allSeconds.value++
        if (seconds <= 9) {
          seconds = '0' + seconds
        }
        if (seconds === 60) {
          seconds = '00'
          minutes++
          if (minutes <= 9) {
            minutes = '0' + minutes
          }
          if (minutes === 60) {
            minutes = '00'
            hour++
          if (hour <= 9) {
            hour = '0' + hour
          }
          if (hour === 60) {
            hour = '00'
            // hour++
          }
          }
        }
        timerValue.value.hour = hour
        timerValue.value.seconds = seconds
        timerValue.value.minutes = minutes
        if (hour === 24) {
          hour = '00'
          clearTimerValue()
        }
      }, 1000)
    }
    const clearTimerValue = () => {
      timerValue.value.hour = '00'
      timerValue.value.seconds = '00'
      timerValue.value.minutes = '00'
    }
    const stopInterval = () => {
      console.log('stop timer')
      console.log(timerInterval.value)
      clearInterval(timerInterval.value)
    }
    // watch(() => form.value[0].value, (currentValue, oldValue) => {
    //   console.log(currentValue);
    //   console.log(oldValue);
    //   },
    //   { deep: true }
    // );
    return {
      timerValue,
      allSeconds,
      startTimer,
      stopInterval,
      clearTimerValue
    }
  },
}
