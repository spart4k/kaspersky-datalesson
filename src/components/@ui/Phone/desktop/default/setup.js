import { ref, onMounted, computed } from 'vue';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Search from '../search'
import { useStore } from '@/store';

export default {
  name: 'Phone-Desktop',
  components: {
    VueSlickCarousel,
    Search
  },
  props: {
  },
  setup(props, ctx) {
    const store = useStore();
    console.log(ctx)
    console.log('init')
    const { emit } = ctx
    const nextStage = () => {
      store.commit('changeStage', 'increase')
    };
    const time = computed(() => {
      return store.state.time
    })

    const level = computed(() => {
      return store.state.level
    })
    const stage = computed(() => {
      return store.state.stage
    })
    const openApp = (name, transitionMode) => {
      console.log(name)
      if (level.value === 1 && stage.value === 5 && name === 'AppBox') {
        nextStage()
        emit('openApp', name, transitionMode)
      } else if (level.value === 1 && stage.value === 9 && name === 'AppPhoto') {
        nextStage()
        emit('openApp', name, transitionMode)
      } else if (level.value === 1 && stage.value === 13 && name === 'AppWallpaper') {
        nextStage()
        emit('openApp', name, transitionMode)
      } else {
        return
      }
      console.log(name, transitionMode)
    }
    const appList = computed(() => {
      return store.state.appList
    })
    return {
      openApp,
      appList,
      time,
      level,
      stage
    };
  },
};
