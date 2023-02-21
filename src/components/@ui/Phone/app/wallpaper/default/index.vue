<template>
  <div :class="[$style.app]">
    <Header :class="$style.header" @back="back">
      <div>
        <p>
          Wallpaper Game Pack
        </p>
      </div>
    </Header>
    <div :class="$style.content">
      <div :class="$style.wallpapers">
        <div v-for="(item, index) in wallPapers" :key="index" :class="$style.wallpaperItem">
          <img :src="item.url" alt="">
        </div>
      </div>
      <v-btn @click="openSettings" :class="$style.settings" black>
        Настройки приложения
      </v-btn>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Header from '../../header'

export default {
  name: 'Phone-App-Wallpaper',
  components: {
    Header
  },
  props: {
  },
  setup(props, ctx) {
    const { emit } = ctx
    const back = () => {
      emit('back', 'Desktop', 'close-app')
    }
    const openSettings = () => {
      emit('openApp', 'WallpaperSettings', 'router-view' )
    }
    const wallPapers = ref([
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 133.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 134.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 135.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 136.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 137.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 138.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 139.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 140.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 144.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 133.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 134.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 135.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 136.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 137.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 138.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 139.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 140.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 144.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 144.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 133.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 134.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 135.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 136.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 137.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 138.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 139.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 140.png')
      },
      {
        url: require('@/assets/img/phone/wallpaper/backgrounds/Rectangle 144.png')
      },
    ])
    return {
      back,
      openSettings,
      wallPapers
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
