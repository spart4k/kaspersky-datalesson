const MAX_ERRORS = 3
const SCORE_BY_TRAINER = 0.25

const successMixin = {
  methods: {
    runTrainerSuccess({ progress = 25 } = {}) {
      const { errors } = this

      const score = errors !== undefined ? Math.max((MAX_ERRORS - errors) / MAX_ERRORS, 0) * 100 : 100

      // this.$emit('success')
      this.$store.commit('UPDATE_RESULT', score * SCORE_BY_TRAINER)
      this.$store.commit('UPDATE_PROGRESS', progress)
    },
  },
}

export default successMixin
