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
  name: 'Phone-App',
  components: {
    Header,
    SettingToggle
  },
  props: {
  },
  setup(props, ctx) {
    const store = useStore();
    const { emit } = ctx
    const settings = ref([
      {
        title: 'Местоположение',
        value: false
      },
      {
        title: 'Интернет-соединение',
        value: true
      },
      {
        title: 'Память',
        value: false
      },
      {
        title: 'Уведомления',
        value: true
      }
    ])
    const level = computed(() => {
      return store.state.level
    })
    const stage = computed(() => {
      return store.state.stage
    })
    const back = () => {
      if (level.value === 1 && stage.value === 8 ) return
      emit('back', 'AppBox', 'router-view-back')
    }
    return {
      back,
      settings,
      level,
      stage
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
