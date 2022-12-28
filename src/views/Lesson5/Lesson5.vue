<template>
  <div :class="$style.wrapper">
    <transition name="fade" mode="out-in">
      <part1 v-if="stage === 1" @next="next"></part1>
      <!-- <part2 v-if="stage === 2" @prev="prev" @next="next"></part2> -->
      <part3 v-if="stage === 2" @next="$emit('next-lesson')"></part3>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';
import part1 from './parts/part1';
// import part2 from './parts/part2';
import part3 from './parts/part3';

export default {
  name: 'lesson2',
  components: {
    part1,
    // part2,
    part3,
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
      part1,
      // part2,
      part3,
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
