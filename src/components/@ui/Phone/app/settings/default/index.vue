<template>
  <div :class="$style.setting">
    <p>
      Камера
    </p>
    <div :class="$style.toggle">
      <div :class="$style.thumb"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'App-Setting',
  components: {

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
