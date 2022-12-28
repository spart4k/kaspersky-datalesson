<template>
  <div :class="$style.wrapper">
    <v-loader v-if="isLoading"></v-loader>
    <transition name="fade" mode="out-in">
      <trainer :key="stage" v-if="stage === 1" :part="stage" @next="next"></trainer>
      <trainer :key="stage" v-if="stage === 2" :part="stage" @next="next"></trainer>
      <trainer :key="stage" v-if="stage === 3" :part="stage" @next="next"></trainer>
      <trainer :key="stage" v-if="stage === 4" :part="stage" @next="next"></trainer>
      <trainer :key="stage" v-if="stage === 5" :part="stage" @next="finishBonus"></trainer>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import trainer from './components/Trainer';
import { useStore } from '@/store';
import { BASE_URL } from '@/utils/constants'

export default {
  name: 'Bonus',
  components: {
    trainer,
  },
  setup() {
    const stage = ref(1);
    const isLoading = ref(false);

    const store = useStore();
    const session = computed(() => store.state.session);

    const next = () => {
      stage.value += 1;
    };

    const prev = () => {
      stage.value -= 1;
    };

    const finishBonus = () => {
      isLoading.value = true;
      window.location.replace(`${BASE_URL}/lessons/pogoda/certificate?session_id=${session.value}`);
    }

    return {
      stage,
      prev,
      next,
      trainer,
      finishBonus,
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
