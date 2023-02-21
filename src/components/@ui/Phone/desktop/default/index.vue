<template>
  <div :class="$style.desktop">
    <div :class="$style.desktopWrap">
      <div :class="$style.metaInfo">
        <div :class="$style.time">
          {{ time }}
        </div>
        <div :class="$style.weather">
          <svg :class="$style.weatherIcon" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.71662" cy="7.71662" r="7.71662" fill="#FFC90A"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8559 24.0001H5.91826H5.75477V23.9979C2.56179 23.9113 0 21.2957 0 18.0819C0 15.0265 2.31523 12.512 5.28699 12.1969C6.39796 8.98052 9.45236 6.67041 13.0463 6.67041C15.9513 6.67041 18.5037 8.17965 19.9623 10.4568C20.2563 10.418 20.5563 10.3979 20.861 10.3979C24.6172 10.3979 27.6621 13.4429 27.6621 17.199C27.6621 20.8235 24.827 23.7857 21.2534 23.989V24.0001H20.8662C20.8645 24.0001 20.8627 24.0001 20.861 24.0001C20.8593 24.0001 20.8576 24.0001 20.8559 24.0001Z" fill="#FAFAFA"/>
          </svg>
          <p :class="$style.weatherNumber">
            +15°C
          </p>
        </div>
      </div>
      <div :class="$style.contentWrap">
        <Search :class="$style.search"/>
        <VueSlickCarousel :class="$style.slickWrap" :initialSlide="0" :swipeToSlide="true" :slidesToShow="1" :speed="300" :arrows="false" :dots="true">
          <div v-for="(item, index) in appList" :key="index" :class="$style.content">
            <div :class="$style.apps">
              <div v-for="(app, index) in item" :key="index" @click="openApp(app.app, app.transition)" :class="[$style.wrapApp, $style.enabled]">
                <img :src="app.img" alt="">
                <div v-show="app.lighting" :class="[$style.voice, $style.one]"></div>
                <div v-show="app.lighting" :class="[$style.voice, $style.two]"></div>
                <div v-show="app.lighting" :class="[$style.voice, $style.third]"></div>
              </div>
              <!--<img @click="openApp('AppWallpaper', 'open-app')" src="@/assets/img/phone/desktop/circle.png" alt="">
              <img @click="openApp('AppPhoto', 'open-app')" src="@/assets/img/phone/desktop/photo.png" alt="">-->
            </div>
          </div>
          <!--<div :class="$style.content">
            <div :class="$style.apps">
              <img @click="openApp('AppBox', 'open-app')" src="@/assets/img/phone/desktop/box.png" alt="">
              <img @click="openApp('AppWallpaper', 'open-app')" src="@/assets/img/phone/desktop/circle.png" alt="">
              <img @click="openApp('AppPhoto', 'open-app')" src="@/assets/img/phone/desktop/photo.png" alt="">
            </div>
          </div>
          <div :class="$style.content">
            <div :class="$style.apps">
              <img src="@/assets/img/phone/desktop/settings.png" alt="">
            </div>
          </div>
          <div :class="$style.content">
          </div>-->
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" module src="./style.scss"></style>
