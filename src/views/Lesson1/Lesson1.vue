<template>
  <v-loader v-if="!level"></v-loader>
  <div v-else :class="$style.wrapper">
    <transition name="fade" mode="out-in">
      <part1 v-if="stage === 1" @next="next"></part1>
      <!-- <part2 v-if="stage === 2" @prev="prev" @next="next"></part2> -->
      <part3 v-if="stage === 2" @next="next"></part3>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import part1 from './parts/part1';
// import part2 from './parts/part2';
import part3 from './parts/part3';
import { useStore } from '@/store';

export default {
  name: 'lesson1',
  components: {
    part1,
    // part2,
    part3,
  },
  setup() {
    const stage = ref(1);

    const store = useStore();
    const level = computed(() => store.state.level);

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
      level
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
