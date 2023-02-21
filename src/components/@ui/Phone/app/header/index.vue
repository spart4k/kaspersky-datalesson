<template>
  <div @click="$props.single ? back : ''" :class="[$style.header, $props.single && $style.single]">
    <svg @click="back" :class="$style.back" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L1 9L9 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <slot/>
  </div>
</template>

<script>
import {} from 'vue';

export default {
  name: 'AppHead`',
  components: {

  },
  props: {
    single: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const back = () => {
      emit('back')
    }
    return {
      back
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
