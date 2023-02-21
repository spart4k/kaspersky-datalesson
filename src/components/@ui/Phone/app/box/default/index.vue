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
import { computed } from 'vue';
import Header from '../../header'
import { useStore } from '@/store';

export default {
  name: 'Phone-App',
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
      if (level.value === 1 && (stage.value === 6 || stage.value === 7) ) return
      emit('back', 'Desktop', 'close-app')
    }
    const nextStage = () => {
      store.commit('changeStage', 'increase')
    };
    const openSettings = () => {
      if (level.value === 1 && stage.value === 7) {
        nextStage()
        emit('openApp', 'boxSettings', 'router-view')
      }
    }
    return {
      back,
      openSettings,
      level,
      stage
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
