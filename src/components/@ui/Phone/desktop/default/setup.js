import { ref, onMounted } from 'vue';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Search from '../search'

export default {
  name: 'Phone-Desktop',
  components: {
    VueSlickCarousel,
    Search
  },
  props: {
  },
  setup(props, ctx) {
    console.log(ctx)
    console.log('init')
    const { emit } = ctx
    const openApp = (name, transitionMode) => {
      console.log(name, transitionMode)
      emit('openApp', name, transitionMode)
    }
    return {
      openApp
    };
  },
};
