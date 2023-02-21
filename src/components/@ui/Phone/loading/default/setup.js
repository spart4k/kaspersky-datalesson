import { ref, onMounted } from 'vue';

export default {
  name: 'Phone-Loader',
  components: {
  },
  props: {
  },
  setup(props, ctx) {
    console.log(ctx)
    console.log('init')
    const { emit } = ctx
    const openApp = (name, transitionMode) => {
      console.log(name)
      emit('openApp', name, transitionMode)
    }
    return {
      openApp
    };
  },
};
