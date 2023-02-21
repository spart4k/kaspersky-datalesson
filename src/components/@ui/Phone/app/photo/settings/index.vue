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
import { ref, computed } from 'vue';
import { useStore } from '@/store';

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
    const store = useStore();
    const { emit } = ctx
    const level = computed(() => {
      return store.state.level
    })
    const stage = computed(() => {
      return store.state.stage
    })
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
      if (level.value === 1 && stage.value === 12 ) return
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
