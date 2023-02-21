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
      <SettingToggle v-for="(item, index) in settings" @changeToggle="changeToggle(index, $event)" :toggle="item" :key="index"/>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
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
    const level = computed(() => {
      return store.state.level
    })
    const stage = computed(() => {
      return store.state.stage
    })
    const changeToggle = (index, value) => {
      console.log(index,value)
      if (level.value === 1 && stage.value !== 17 ) return
      settings.value[index].value = value
    }
    const back = () => {
      if (level.value === 1 && (stage.value === 16 || stage.value === 17) ) return
      emit('back', 'AppWallpaper', 'router-view-back')
    }
    const nextStage = () => {
      store.commit('changeStage', 'increase')
    }
    watch(settings, (cur) => {
      console.log(cur)
      if (cur.every((item) => !item.value)) {
        console.log('off')
        nextStage()
      }
    }, { deep: true })
    return {
      back,
      settings,
      changeToggle,
      nextStage
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
