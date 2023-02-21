<template>
  <div :class="[$style.photo]">
    <Header single :class="$style.header" @back="back">
    </Header>
    <div :class="$style.content">
      <img src="@/assets/img/phone/photo/people.png" alt="">
      <!--<v-btn @click="openSettings" :class="$style.settings" black>
        Настройки приложения
      </v-btn>-->
      <div :class="$style.panel">
        <div :class="$style.wrap">
          <div :class="$style.gallery"></div>
          <div :class="$style.mainTap">
            <div :class="$style.border"></div>
          </div>
          <div @click="openSettings" :class="[$style.settings, canOpenSettings && $style.enabled]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12.1302V7.86986H17.4877C17.3218 7.30403 17.0928 6.75851 16.8049 6.24385L18.5772 4.47159L15.5611 1.46346L13.7888 3.23572H13.7884C13.2745 2.945 12.729 2.71307 12.1624 2.54467V0H7.86981V2.50397C7.3036 2.6731 6.75845 2.90467 6.24379 3.19503L4.47152 1.42276L1.46338 4.43089L3.19504 6.17881C2.90468 6.69347 2.67312 7.2386 2.50398 7.80482H0V12.0652H2.50398C2.67239 12.6314 2.90432 13.1769 3.19504 13.6912L1.42277 15.4634L4.43091 18.4796L6.17884 16.805C6.69351 17.0928 7.23901 17.3218 7.80486 17.4877V20H12.0652V17.4877C12.6311 17.3222 13.1766 17.0931 13.6913 16.805L15.4635 18.5772L18.4797 15.5611L16.7074 13.7888V13.7885C16.9956 13.2742 17.2246 12.7287 17.3905 12.1625L20 12.1302ZM10.0004 13.9352C8.95698 13.9352 7.95591 13.5203 7.21807 12.7825C6.48019 12.0446 6.06535 11.0436 6.06535 10.0001C6.06535 8.95669 6.4802 7.95562 7.21807 7.21779C7.95595 6.47991 8.95698 6.06508 10.0004 6.06508C11.0439 6.06508 12.0449 6.47993 12.7828 7.21779C13.5207 7.95566 13.9355 8.95669 13.9355 10.0001C13.9355 11.0436 13.5206 12.0446 12.7828 12.7825C12.0449 13.5203 11.0439 13.9352 10.0004 13.9352Z" fill="white"/>
            </svg>
            <div v-show="canOpenSettings" :class="[$style.voice, $style.one]"></div>
            <div v-show="canOpenSettings" :class="[$style.voice, $style.two]"></div>
            <div v-show="canOpenSettings" :class="[$style.voice, $style.third]"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';

import Header from '../../header'

export default {
  name: 'Phone-App-Photo',
  components: {
    Header
  },
  props: {
  },
  setup(props, ctx) {
    const store = useStore();
    const { emit } = ctx
    const level = computed(() => {
      return store.state.level
    })
    const stage = computed(() => {
      return store.state.stage
    })
    const back = () => {
      if (level.value === 1 && (stage.value === 10 || stage.value === 11) ) return
      emit('back', 'Desktop', 'close-app')
    }
    const nextStage = () => {
      store.commit('changeStage', 'increase')
    };
    const canOpenSettings = computed(() => {
      if (level.value === 1 && stage.value === 11) {
        return true
      }
    })
    const openSettings = () => {
      if (canOpenSettings.value) {
        nextStage()
        emit('openApp', 'PhotoSettings', 'router-view' )
      }
    }
    return {
      back,
      openSettings,
      canOpenSettings,
      level,
      stage
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
