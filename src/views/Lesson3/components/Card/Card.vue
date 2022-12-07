<template>
  <div
    :class="$style.wrapper"
    :style="{ zIndex: 100 - index }"
  >
    <div :class="$style.cardImgWrapper" >
      <img :src="`/assets/img/lesson3/card${index}.png`" alt="" />
    </div>
    <p :class="$style.cardText">
      {{ titles[index - 1] }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {},
  props: {
    index: Number,
  },
  setup(props) {
    const { index } = props;

    const titles = [
      'Количество осадков за последние 12 часов',
      'Текущее расстояние от Земли до Марса',
      'Влажность воздуха',
      'Уровень облачности',
      'Скорость и направление ветра',
      'Температура воздуха',
      'Атмосферное давление в разных точках страны',
    ];

    return {
      titles,
      index,
    };
  },
};
</script>

<style lang="scss" module>
.wrapper {
  width: rem(249);
  height: rem(249);
  background: #ffffff;
  border-radius: rem(22);
  padding: rem(25) rem(25) rem(30);
  color: #000;
  user-select: none;
  transform: rotate(-9deg);
}

.cardImgWrapper {
  height: rem(152);
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
}

.cardText {
  text-align: center;
  margin: 0 auto;
  font-weight: 700;
  font-size: rem(15);
  line-height: rem(22);
  color: inherit;
}
</style>
