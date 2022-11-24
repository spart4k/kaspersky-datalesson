import { ref } from 'vue'

export default {
  name: '',
  props: {
    items: undefined,
    item: undefined,
    index: Number,
    lastIndex: Number,
    lengthDisabled: Number,
  },
  setup() {
    const tooltip = ref(false)

    return {
      tooltip,
    }
  },
}
