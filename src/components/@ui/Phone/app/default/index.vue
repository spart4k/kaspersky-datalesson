<template>
  <div :class="[$style.app]">
    <Header/>
    Box
  </div>
</template>

<script>
import {} from 'vue';
import Header from '../header'

export default {
  name: 'App-Box',
  components: {
    Header
  },
  props: {
  },
  setup(props) {
    return {

    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
