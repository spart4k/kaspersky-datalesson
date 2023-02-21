<template>
  <div :class="$style.cast">
    <Phone v-if="phoneStatus !== 'droped'"/>
    <Panel/>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Phone from '../../Phone/default'
import Panel from '@/components/@ui/Panel/default'
import { useStore } from '@/store';

export default {
  name: 'Cast',
  components: {
    Phone,
    Panel
  },
  props: {
  },
  setup(props) {
    const store = useStore();
    const stage = computed(() => {
      return store.state.stage
    })
    const phoneStatus = computed(() => {
      return store.state.phoneStatus
    })
    return {
      stage,
      phoneStatus
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
