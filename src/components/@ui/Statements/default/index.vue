<template>
  <div :class="$style.statements">
    <div :class="$style.label">
      Что позволило зловреду проникнуть на телефон?
    </div>
    <div :class="$style.list">
      <Statement @chooseStatement="chooseStatement(index, item)" v-for="(item, index) in statements" :statement="item" :key="index"/>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import Statement from '../item'
export default {
  name: 'Statements',
  components: {
    Statement
  },
  props: {
  },
  setup(props) {
    const store = useStore();
    const statements = ref([
      {
        title: 'Отсутствие антивируса',
        valid: true,
        selected: false
      },
      {
        title: 'Низкий уровень заряда',
        valid: true,
        selected: false
      },
      {
        title: 'Возможность установки приложений из внешних источников',
        valid: true,
        selected: false
      },
      {
        title: 'Реклама в соц. сетях',
        valid: true,
        selected: false
      },
      {
        title: 'Отсутствие новых обновлений ОС',
        valid: true,
        selected: false
      },
      {
        title: 'Скачивание App со стороннего ресурса',
        valid: true,
        selected: false
      }
    ])
    const turnOnDemo = computed(() => {
      if (store.state.phoneStatus !== 'droped') {
        return true
      }
    })
    const chooseStatement = (index, item) => {
      console.log(index, item)
      statements.value[index].selected = !item.selected
    }
    return {
      turnOnDemo,
      statements,
      chooseStatement
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
