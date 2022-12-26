import { computed } from 'vue';

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
    const startTimer = computed(() => {
      let seconds = props.seconds
      // let time = new Date(+timestamp - 14400 * 1000)
      let time = new Date('July 1, 1999, 00:00:00')
      time.setSeconds(time.getSeconds() + seconds);
      let secondsTime = time.getSeconds()
      let minutes = time.getMinutes()
      let hour = time.getHours()
      if (secondsTime.toString().length === 1) {
        secondsTime = '0'+secondsTime
      }
      if (minutes.toString().length === 1) {
        minutes = '0'+minutes
      }
      if (hour.toString().length === 1) {
        hour = '0'+hour
      }
      return `${hour}:${minutes}:${secondsTime}`
    })
    return {
      startTimer,
    }
  },
}
