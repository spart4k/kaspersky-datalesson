<template>
  <div :class="$style.message">
    <p>
      {{ $props.message.text }}
    </p>
    <v-btn v-if="$props.message.btn" :class="$style.btn" black>
      Продолжить
    </v-btn>
  </div>
</template>

<script>
import { computed } from 'vue';
import useMobile from '@/hooks/useMobile';

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
    const isMobile = useMobile();

    return {
      isMobile,
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
