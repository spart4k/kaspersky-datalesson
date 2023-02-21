<template>
  <div :class="[$style.box]">
    <Header @back="back">
      <div :class="$style.header">
        <img src="@/assets/img/phone/box/box.png" alt="">
        <p>
          Новости Бокса
        </p>
      </div>
    </Header>
    <div :class="$style.content">
      <div :class="$style.news">
        <div :class="$style.newsItem">
          <img src="@/assets/img/phone/box/anthony.png" alt="">
          <p :class="$style.description">
            Возвращение Энтони Джошуа обещает новые сюрпризы
          </p>
        </div>
        <div v-for="(item, index) in 10" :key="index" :class="$style.newsItem">
          <img src="@/assets/img/phone/box/hands.png" alt="">
          <p :class="$style.description">
            Экс-абсолютный чемпион лёгкого веса австралиец Джордж Камбосос-младший (20-2, 10 КО) восстанавливается после потери всех титулов
          </p>
        </div>
      </div>
      <v-btn @click="openSettings" :class="$style.settings" black>
        Настройки приложения
      </v-btn>
    </div>
  </div>
</template>

<script>
import {} from 'vue';
import Header from '../../header'
export default {
  name: 'Phone-App',
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
      emit('openApp', 'boxSettings', 'router-view')
    }
    return {
      back,
      openSettings
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
