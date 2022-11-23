import axios from 'axios'

const instance = axios.create()

// session_id
// score: int (1-3)
// attempts_num: int
// time_spent: int
// additional_info: json array
// eslint-disable-next-line no-unused-vars
const saveResults = (data) => {
  // instance.post('https://xn--h1adlhdnlo2c.xn--p1ai/trainer/webhook', data)
  const form = document.createElement('form')
  form.method = 'post'
  form.action = 'https://xn--h1adlhdnlo2c.xn--p1ai/trainer/webhook'
  // form.action = 'https://new-1.datalesson.ru/certificate/neural-networks-and-communications/'
  form.style.visibility = 'hidden'
  form.style.position = 'absolute'

  Object
    .keys(data)
    .forEach((key) => {
      const value = data[key]
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    })

  document.body.appendChild(form)
  form.submit()
}

// eslint-disable-next-line no-unused-vars
const saveResultsBackground = data => instance.post('https://xn--h1adlhdnlo2c.xn--p1ai/trainer/webhook', data)

const saveDataMixin = () => ({
  data() {
    return {
      timer: null,
      timeSpent: 0,
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.timeSpent += 1
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
      this.saveDataAsync({})
    },
    saveDataAsync({ score = 3 }) {
      saveResultsBackground({
        score,
        session_id: this.$store.state.session,
        time_spent: this.timeSpent,
      })
    },
    saveFirst() {
      return axios.post('https://xn--h1adlhdnlo2c.xn--p1ai/trainer/markFirstTask', { session_id: this.$store.state.session, firstTask: 1 })
    },
    saveData({ score = 3 }) {
      saveResults({
        session_id: this.$store.state.session,
        time_spent: this.timeSpent,
        score,
      })
    },
    pushToHub() {
      this.$router.push({ path: '/hub', query: this.$route.query })
    },
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
})

export default saveDataMixin()
