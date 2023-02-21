<template>
  <div :class="$style.cast">
    <Phone/>
    <Panel/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Phone from '../../Phone/default'
import Panel from '@/components/@ui/Panel/default'
console.log(Panel)
export default {
  name: 'Cast',
  components: {
    Phone,
    Panel
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
