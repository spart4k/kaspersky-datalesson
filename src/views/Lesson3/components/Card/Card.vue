<template>
  <div :class="[$style.wrapper, level === '3' && $style.level3]" :style="{ zIndex: 100 - index }">
    <div :class="[$style.cardImgWrapper, level === '3' && $style.level3]">
      <img :src="`/assets/img/lesson3/level${level}/card${index}.png`" alt="" />
    </div>
    <p :class="[$style.cardText, level === '3' && $style.level3]">
      {{ titles[index - 1] }}
    </p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';

export default {
  name: 'Card',
  components: {},
  props: {
    index: Number,
  },
  setup(props) {
    const { index } = props;
    const store = useStore();
    const level = computed(() => store.state.level);

    let titles;

    switch (level.value) {
      case '1':
        titles = [
          'Количество осадков за последние 12 часов',
          'Текущее расстояние от Земли до Марса',
          'Влажность воздуха',
          'Высота полёта птичьих стай',
          'Скорость и направление ветра',
          'Температура воздуха',
        ];
        break;
      case '2':
        titles = [
          'Количество осадков за последние 12 часов',
          'Текущее расстояние от Земли до Марса',
          'Показания домашней метеостанции',
          'Влажность воздуха',
          'Высота полёта птичьих стай',
          'Уровень облачности',
          'Уровень прозрачности воздуха',
          'Скорость и направление ветра',
          'Температура воздуха',
          'Количество инея на окнах',
          'Положение созвездий в ночном небе',
          'Атмосферное давление в разных точках страны',
        ];
        break;
      case '3':
        titles = [
          'Количество осадков за последние 12 часов',
          'Текущее расстояние от Земли до Марса',
          'Показания домашней метеостанции',
          'Влажность воздуха',
          'Высота полёта птичьих стай',
          'Уровень облачности',
          'Уровень прозрачности воздуха',
          'Скорость и направление ветра',
          'Температура воздуха',
          'Количество инея на окнах',
          'Положение созвездий в ночном небе',
          'Атмосферное давление в разных точках страны',
          'Количество ртути в термометре',
          'Среднее давление в покрышках 1000 автомобилей',
          'Коэффициент сопротивления воздуха движению внутри него',
          'Интенсивность солнечного света (солнечная радиация)',
        ];
        break;
      default:
        break;
    }

    return {
      titles,
      index,
      level,
    };
  },
};
</script>

<style lang="scss" module>
.wrapper {
  width: rem(188);
  height: rem(188);
  background: #ffffff;
  border-radius: rem(22);
  padding: rem(15) rem(25) rem(15);
  color: #000;
  user-select: none;
  transform: rotate(-9deg);
  &.level3 {
    padding: rem(7) rem(8);
  }
  @media screen and (max-width: 450px) {
    padding: rem(10);
  }
}

.cardImgWrapper {
  height: rem(110);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: unset;
  margin-bottom: rem(10);
  & img {
    max-width: 100%;
    max-height: 100%;
  }
  @media screen and (min-width: 451px) {
    &.level3 {
      height: rem(95);
      margin-bottom: rem(3);
    }
  }
  @media screen and (max-width: 450px) {
    height: 60%;
  }
}

.cardText {
  text-align: center;
  margin: 0 auto;
  font-weight: 700;
  font-size: rem(11);
  line-height: rem(17);
  color: inherit;
  &.level3 {
    font-size: rem(9.6);
    line-height: rem(13);
  }
  @media screen and (max-width: 450px) {
    font-size: rem(10);
    line-height: rem(15);
    width: 100%;
  }
}
</style>
