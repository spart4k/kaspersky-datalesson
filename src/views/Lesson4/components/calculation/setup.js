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
    seconds: {
      type: Number,
      default: 1800
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
    const startTimer = computed(() => {
      console.log('start timer')
      let seconds = props.seconds
      var timestamp = seconds * 1000
      let time = new Date(+timestamp - 14400 * 1000)
      let secondsTime = time.getSeconds()
      let minutes = time.getMinutes()
      let hour = time.getHours()
      console.log()
      if (secondsTime.toString().length === 1) {
        secondsTime = '0'+secondsTime
      }
      if (minutes.toString().length === 1) {
        minutes = '0'+minutes
      }
      if (hour.toString().length === 1) {
        hour = '0'+hour
      }
      let hoursAndMinutes = time.getHours() + ':' + time.getMinutes() + time.getSeconds();
      console.log(hour, minutes, secondsTime)
      return `${hour}:${minutes}:${secondsTime}`
      console.log(time)
      console.log(timestamp)
      console.log(props.seconds)
        // if (seconds <= 9) {
        //   seconds = '0' + seconds
        // }
        // if (seconds >= 60) {
          // console.log('minute')
          // seconds = '00'
          // console.log(seconds)
          // minutes = seconds/60
          // seconds = '00'
          // minutes++
          // console.log(minutes)
          // if (minutes <= 9) {
          //   minutes = '0' + minutes
          // }
          // if (minutes >= 60) {
          //   minutes = '00'
          //   hour++
          // if (hour <= 9) {
          //   hour = '0' + hour
          // }
          // if (hour === 60) {
          //   hour = '00'
          // }
          // }
        // }
        // timerValue.value.hour = hour
        // timerValue.value.seconds = seconds
        // timerValue.value.minutes = minutes
        // if (hour === 24) {
        //   hour = '00'
        //   clearTimerValue()
        // }
    })
    // startTimer()
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
