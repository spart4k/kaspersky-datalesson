<template>
  <div :class="$style.wrap">
    <p :class="$style.label">
      {{ $props.toggle.title }}
    </p>
    <div @click="changeState" :class="[$style.toggle, $props.toggle.value && $style.checked]">
      <div :class="$style.thumb"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'App-Setting-Toggle',
  components: {

  },
  props: {
    toggle: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const state = ref(false)
    const { emit } = ctx
    const changeState = () => {
      //return
      //state.value = !state.value
      console.log(!props.toggle.value)
      emit('changeToggle', !props.toggle.value)
    }
    return {
      state,
      changeState
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
