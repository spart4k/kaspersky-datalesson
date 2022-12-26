<template>
  <div :class="$style.wrapper">
    <v-loader v-if="isLoading"></v-loader>
    <transition name="fade" mode="out-in">
      <part1 v-if="stage === 1" @next="next"></part1>
      <part2 v-if="stage === 2" @prev="prev" @next="next"></part2>
      <part3 v-if="stage === 3" @next="next"></part3>
      <part4 v-if="stage === 4" @next="finishApp"></part4>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';
import part1 from './parts/part1';
import part2 from './parts/part2';
import part3 from './parts/part3';
import part4 from './parts/part4';
import webhook from '@/services/webhook'

export default {
  name: 'lesson6',
  components: {
    part1,
    part2,
    part3,
    part4,
  },
  setup() {
    const stage = ref(1);
    const isLoading = ref(false);

    const next = () => {
      stage.value += 1;
    };

    const prev = () => {
      stage.value -= 1;
    };

    const finishApp = async () => {
      isLoading.value = true;
      const res = await webhook();
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
      window.location.replace(res.data.link);
    }

    return {
      stage,
      prev,
      next,
      part1,
      part2,
      part3,
      part4,
      finishApp,
      isLoading,
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
