<template>
  <div :class="$style.wrapper" @click.self="$emit('toggle')">
    <div v-if="isMobile && digit > 0" :class="$style.digit">{{ digit }}</div>
  </div>
</template>

<script>
import { watch, computed } from 'vue';
import useMobile from '@/hooks/useMobile';

export default {
  name: 'Speaker',
  components: {},
  props: {
    counter: Number,
  },
  setup(props) {
    const isMobile = useMobile();

    const digit = computed(() => props.counter);

    return {
      isMobile,
      digit,
    };
  },
};
</script>

<style lang="scss" module src="./Speaker.scss"></style>
