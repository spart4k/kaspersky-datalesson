<template>
  <div :class="[$style.app]">
    <Header @back="back">
      <div :class="$style.header">
        <p>
          Настройки
        </p>
      </div>
    </Header>
    <div :class="$style.content">
      <SettingToggle v-for="(item, index) in settings" :toggle="item" :key="index"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Header from '../../header'
import SettingToggle from '../../settings/toggle'

export default {
  name: 'Phone-App',
  components: {
    Header,
    SettingToggle
  },
  props: {
  },
  setup(props, ctx) {
    const { emit } = ctx
    const settings = ref([
      {
        title: 'СМС–рассылка',
        value: true
      },
      {
        title: 'Местоположение',
        value: true
      },
      {
        title: 'Память',
        value: true
      },
      {
        title: 'Список вызовов',
        value: true
      }
    ])
    const back = () => {
      emit('back', 'AppWallpaper', 'router-view-back')
    }
    return {
      back,
      settings
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
