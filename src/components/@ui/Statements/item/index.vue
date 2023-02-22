<template>
  <div @click="chooseStatement" :class="[$style.statement, $props.statement.selected && $style.selected]">
    {{ $props.statement.title }}
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';
export default {
  name: 'Statements-Item',
  components: {

  },
  props: {
    statement: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const store = useStore();
    const turnOnDemo = computed(() => {
      if (store.state.phoneStatus !== 'droped') {
        return true
      }
    })
    const chooseStatement = () => {
      emit('chooseStatement')
    }
    return {
      turnOnDemo,
      chooseStatement
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
