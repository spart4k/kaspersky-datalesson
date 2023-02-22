<template>
  <div :class="$style.message">
    <p>
      {{ $props.message.text }}
    </p>
    <v-btn v-if="$props.message.btn" @click="clickBtn" :class="$style.btn" black>
      {{ $props.message.btn.text }}
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
    const clickBtn = () => {
      console.log(props.message.btn)
      if (props.message.btn.type === 'next') nextStage()
    }
    const nextStage = () => {
      //stage.value += 1;
      store.commit('changeStage', 'increase')
    };
    return {
      isMobile,
      nextStage,
      clickBtn
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
