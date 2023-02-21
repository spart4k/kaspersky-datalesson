<template>
  <div ref="speakerItem" :class="[$style.item, speaker.messages.length && $style.enabled]">
    <img :class="$style.image" :src="$props.speaker.img" alt="">
    <div v-show="speaker.messages.length" :class="[$style.voice, $style.one]"></div>
    <div v-show="speaker.messages.length" :class="[$style.voice, $style.two]"></div>
    <div v-show="speaker.messages.length" :class="[$style.voice, $style.third]"></div>
    <Chat :max-height="maxHeight" :messages="speaker.messages"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import useMobile from '@/hooks/useMobile';
import Chat from '../chat/default'
import debounce from 'debounce'

export default {
  name: 'SpeakerItem',
  components: {
    Chat
  },
  props: {
    counter: Number,
    type: Number,
    speaker: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const speakerItem = ref(null)
    const isMobile = useMobile();
    const maxHeight = ref(null)
    const getBounding = () => {
      console.log('get')
      maxHeight.value = speakerItem.value.getBoundingClientRect().y + speakerItem.value.getBoundingClientRect().height
    }
    onMounted(() => {
      getBounding()
      window.addEventListener('resize', debounce(() => getBounding()), 300)
    })
    return {
      isMobile,
      speakerItem,
      maxHeight
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
