<template>
  <div :class="$style.cast">
    <div :class="[$style.wrap, showStatements && $style.isStatements]">
      <Statements v-if="showStatements"/>
      <Phone v-if="phoneStatus !== 'droped'"/>
    </div>
    <Panel/>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Phone from '../../Phone/default'
import Statements from '../../Statements/default'
import Panel from '@/components/@ui/Panel/default'
import { useStore } from '@/store';

export default {
  name: 'Cast',
  components: {
    Phone,
    Panel,
    Statements
  },
  props: {
  },
  setup(props) {
    const store = useStore();
    const showStatements = computed(() => {
      if (lesson.value === 2) {
        return true
      }
    })
    const lesson = computed(() => {
      return store.state.currentLesson
    })
    const level = computed(() => {
      return store.state.level
    })
    const stage = computed(() => {
      return store.state.stage
    })
    const phoneStatus = computed(() => {
      return store.state.phoneStatus
    })
    return {
      stage,
      phoneStatus,
      level,
      lesson,
      showStatements
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
