<template>
  <div :class="$style.message">
    <p>
      {{ $props.message.text }}
    </p>
    <v-btn v-if="$props.message.btn" @click="nextStage" :class="$style.btn" black>
      Продолжить
    </v-btn>
  </div>
</template>

<script>
import { computed } from 'vue';
import useMobile from '@/hooks/useMobile';
import { useStore } from '@/store';

export default {
  name: 'SpeakerChatMessage',
  components: {},
  props: {
    isBtn: {
      type: Boolean,
      default: true
    },
    message: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const store = useStore();
    const isMobile = useMobile();
    const nextStage = () => {
      //stage.value += 1;
      store.commit('changeStage', 'increase')
    };
    return {
      isMobile,
      nextStage
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
