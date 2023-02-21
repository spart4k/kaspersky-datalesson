<template>
  <div :class="[
    $style.core,
  ]">
      <!--screen === 'Loading' && $style.loading,
      screen === 'Desktop' && $style.desktop,
      (screen === 'App' || screen === 'AppPhoto') && $style.appPhoto,
      screen === 'photoSettings' && $style.app,
      screen === 'AppWallpaper' && $style.app,
      screen === 'wallpaperSettings' && $style.app-->
    <div :class="$style.coreWrap">
      <div v-if="screen !== 'Loading'" :class="$style.header">
        <div :class="$style.left">
          <svg v-if="true" :class="$style.network" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M-1.31134e-07 10L0 7L2 7L2 10L-1.31134e-07 10Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 10L3 6L5 6L5 10L3 10Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 10L6 4L8 4L8 10L6 10Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 10L9 2L11 2L11 10L9 10Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10L12 -8.74228e-08L14 0L14 10L12 10Z" fill="black"/>
          </svg>
          <p :class="$style.networkNumber">5G</p>
          <p :class="$style.oclock">{{ time }}</p>
        </div>
        <div :class="$style.right">
          <svg :class="$style.volume" width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.68977 0L2.55444 2.38776H0V7.61202H2.55444L6.68999 10L6.68977 0ZM11.2143 7.27194L9.80725 5.86479L8.4001 7.27194C8.08951 7.58253 7.22469 6.71763 7.53529 6.40712L8.94244 4.99998L7.53529 3.59292C7.22469 3.28232 8.08959 2.41751 8.4001 2.72819L9.80725 4.13525L11.2143 2.72819C11.5249 2.41751 12.3897 3.28241 12.079 3.59292L10.672 4.99998L12.079 6.40712C12.3898 6.71772 11.5249 7.58262 11.2143 7.27194Z" fill="black"/>
          </svg>
          <div :class="$style.battery">
            <p :class="$style.number">
              32%
            </p>
            <svg :class="$style.batteryIcon" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6 2V0H2V2H0V13H8V2H6Z" fill="black"/>
              <rect y="7" width="8" height="6" fill="black"/>
            </svg>
          </div>
        </div>
      </div>

      <div :class="$style.appWrap">
        <div :class="$style.transitionWrap">
          <transition :name="transitionMode">
            <component :class="$style.app" @openApp="openApp" @boxSettings="boxSettings" @back="back" :is="screen"></component>
          </transition>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from '@/store';


import Desktop from '../desktop/default'
import Loading from '../loading/default'
import AppBox from '../app/box/default'
import boxSettings from '../app/box/settings'

import AppPhoto from '../app/photo/default'
import PhotoSettings from '../app/photo/settings'

import AppWallpaper from '../app/wallpaper/default'
import WallpaperSettings from '../app/wallpaper/settings'

export default {
  name: 'Phone-Core',
  components: {
    Desktop,
    AppBox,
    boxSettings,
    AppPhoto,
    PhotoSettings,
    AppWallpaper,
    WallpaperSettings,
    Loading
  },
  props: {
  },
  setup(props) {
    const store = useStore();
    const stage = computed(() => {
      return store.state.stage
    })
    const time = computed(() => {
      return store.state.time
    })
    const screen = ref('Desktop')
    const transitionMode = ref('')
    const openApp = (name, transition) => {
      console.log(name, transition)
      transitionMode.value = transition
      screen.value = name
    }
    const back = (name, transition) => {
      transitionMode.value = transition
      screen.value = name
    }
    const phoneStatus = computed(() => {
      return store.state.phoneStatus
    })
    const boxSettings = () => {
      console.log('settings')
    }
    onMounted(() => {
      if (phoneStatus.value === 'loading') {
        screen.value = 'Loading'
        console.log(screen.value)
      }
      if (phoneStatus.value === 'loaded') screen.value = 'Desktop'
    })
    watch(() => store.state.phoneStatus, (current, old) => {
      if (current === 'loading') screen.value = 'Loading'
      if (current === 'loaded') screen.value = 'Desktop'
    })
    return {
      screen,
      openApp,
      back,
      transitionMode,
      boxSettings,
      stage,
      phoneStatus,
      time
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
