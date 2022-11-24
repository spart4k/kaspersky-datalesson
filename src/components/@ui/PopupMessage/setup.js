import {
  ref, watch, onMounted, onBeforeUnmount,
} from 'vue'

import Item from './components/item'

// import currentIndex from '../popupFile/z-index'


export default {
  name: 'PopupMessage',
  components: {
    Item,
  },
  props: {
    items: Array,
    task: Array,
    lengthDisabled: Number,
  },
  setup(props) {
    const container = ref(null)
    const showTask = ref(false)

    const scrollToBottom = () => {
      container.value.scrollTo(0, 999999999999)
    }

    watch(() => props.items, () => {
      if (!container.value) return
      setTimeout(() => scrollToBottom(), 0)
    })

    // const zIndex = ref(currentIndex.zIndex + 1)

    // const updateZIndex = () => {
    //   currentIndex.zIndex += 1
    //   zIndex.value = currentIndex.zIndex
    // }

    onMounted(() => {
      window.addEventListener('resize', scrollToBottom)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', scrollToBottom)
    })

    const handleHover = (flag) => {
      showTask.value = flag && props.items.length === 0
    }

    return {
      container,
      showTask,
      handleHover,
      // zIndex,
      // updateZIndex,
    }
  },
}
