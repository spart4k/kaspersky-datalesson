<template>
  <div :class="$style.wrapper">
    <transition name="fade" mode="out-in">
      <part1 v-if="false" @next="next"></part1>
      <!-- <part2 v-if="stage === 2" @prev="prev" @next="next"></part2> -->
      <part3 v-if="true" @nextLesson="$emit('next-lesson')"></part3>
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
    const store = useStore();
    const stage = computed(() => {
      return store.state.stage
    })
    console.log(store)
    const next = () => {
      //stage.value += 1;
      store.commit('changeStage', 'increase')
    };
    const prev = () => {
      //stage.value -= 1;
      store.commit('changeStage', 'decrease')
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
  padding: rem(35) rem(30);
  //overflow: hidden;
  background-image: url('../../assets/img/meta.png');
  background-size: cover;
  background-position: 0% 0%;
  background-repeat: no-repeat;
}
</style>
