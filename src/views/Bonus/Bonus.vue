<template>
  <div :class="$style.wrapper">
    <transition name="fade" mode="out-in">
      <trainer :key="stage" v-if="stage === 1" :part="stage" @next="next"></trainer>
      <trainer :key="stage" v-if="stage === 2" :part="stage" @next="next"></trainer>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';
import trainer from './components/Trainer';

export default {
  name: 'Bonus',
  components: {
    trainer,
  },
  setup() {
    const stage = ref(1);

    const next = () => {
      stage.value += 1;
    };

    const prev = () => {
      stage.value -= 1;
    };

    return {
      stage,
      prev,
      next,
      trainer,
    };
  },
};
</script>

<style lang="scss" module>
.wrapper {
  min-height: 100%;
  overflow: hidden;
}
</style>
