<template>
  <div :class="$style.speakers">
    <SpeakerItem v-for="(item, index) in $props.speakersList" :speaker="item" :key="index"></SpeakerItem>
  </div>
</template>

<script>
import { watch, computed } from 'vue';
import SpeakerItem from '../item'
import useMobile from '@/hooks/useMobile';

export default {
  name: 'Speaker',
  components: {
    SpeakerItem
  },
  props: {
    counter: Number,
    type: Number,
    speakersList: {
      type: Array,
      default: () => []
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
