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
  name: 'App-Photo-Settings',
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
        title: 'Камера',
        value: true
      },
      {
        title: 'Микрофон',
        value: false
      },
      {
        title: 'Память',
        value: true
      },
      {
        title: 'Местоположение',
        value: false
      }
    ])
    const back = () => {
      emit('back', 'AppPhoto', 'router-view-back')
    }
    return {
      back,
      settings
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
