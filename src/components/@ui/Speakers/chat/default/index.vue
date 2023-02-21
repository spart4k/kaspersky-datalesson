<template>
  <div ref="chatWrap" :style="{ 'max-height': $props.maxHeight + 'px' }" :class="$style.chat">
    <transition-group name="testanim" tag="div" :class="$style.list">
      <message v-for="(item, index) in $props.messages" :message="item" :key="index"/>
    </transition-group>
  </div>
</template>

<script>
import { computed, ref, toRefs, watch, onMounted, getCurrentInstance } from 'vue';
import useMobile from '@/hooks/useMobile';
import message from '../message'

export default {
  name: 'SpeakerChat',
  components: {
    message
  },
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: Number,
      default: null
    }
  },
  setup(props, { attrs, parent }) {
    const isMobile = useMobile();
    const chatWrap = ref(null)
    const messages = toRefs(props.messages)
    onMounted(() => {
    })
    return {
      isMobile,
      chatWrap,
      messages
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
