<template>
  <div :class="$style.wrapper">
    <div :class="$style.left">
      <p :class="$style.text">
        Посмотри, какие существуют профессии для работы с современным прогнозом погоды:
      </p>
      <div :class="$style.list">
        <div
          v-for="(item, index) in data"
          :class="$style.item"
          :key="index"
          @click="() => open(item)"
        >
          <div :class="$style.icon" :style="{ backgroundImage: `url(${item.icon})` }"></div>
          <div :class="$style.title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <v-btn :class="$style.btn" sm @click="() => $emit('next')">Далее</v-btn>
    <div :class="[$style.popup, opened && $style.opened]" @click.self="close">
      <div :class="$style.inner" v-if="selected">
        <div :class="$style.popupContent">
          <div :class="$style.icon" :style="{ backgroundImage: `url(${selected.icon})` }"></div>
          <h2 :class="$style.popupTitle">{{ selected.title }}</h2>
          <p :class="$style.popupText">{{ selected.text }}</p>
          <div :class="$style.button">
            <v-btn @click="close" sm>Понятно</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import data from './data';

export default {
  name: 'professions',
  data: () => ({
    data,
    opened: false,
    selected: null,
  }),
  methods: {
    open(item) {
      this.opened = true;
      this.selected = item;
    },
    close() {
      this.opened = false;
    },
  },
};
</script>
<style lang="scss" module>
.wrapper {
  padding: rem(20);
  overflow: auto;
  height: 100%;
  position: relative;
  background-color: $lesson6bgColor;
  -webkit-overflow-scrolling: touch;
  color: #232323;
  &::after {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url('./assets/bg.png');
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100vh;
  }

  .btn {
    position: fixed;
    min-width: rem(172);
    z-index: 9;
    bottom: rem(30);
    right: rem(30);
    @media screen and (max-width: 450px) {
      right: rem(15);
      bottom: rem(20);
    }
  }
}

.left {
  position: relative;
  z-index: 5;
  width: rem(915);
  padding: rem(10);
  margin-top: 0;
  margin-left: rem(10);

  @media screen and (max-width: 450px) {
    width: 100%;
    margin: 0;
    margin-bottom: rem(100);
  }

  h2 {
    font-size: rem(24);
    line-height: 1.375;
    margin: 0;
    margin-bottom: rem(5);
  }

  p {
    font-size: rem(24);
    line-height: 1.375;
    margin: 0;
    @media screen and (max-width: 450px) {
      font-size: rem(20);
    }
  }
}

.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 rem(-20);
  margin-top: rem(10);
}

.item {
  width: rem(270);
  height: rem(230);
  margin: rem(10);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform-origin: center;
  padding: rem(20);
  background: #fff;
  box-shadow: 0px 0px rem(8) rgba(0, 0, 0, 0.15);
  border-radius: rem(20);

  &:hover {
    transform: scale(1.05);
  }

  .title {
    margin-top: rem(8);
    font-weight: 700;
    font-size: rem(16);
    line-height: rem(22);
  }

  @media screen and (max-width: 450px) {
    width: 100%;
  }
}

.icon {
  width: rem(120);
  height: rem(120);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(#000, 0.45);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: rem(484);
  padding: rem(30);
  padding-bottom: rem(60);
  background: #fff;
  border-radius: rem(15);
  transform: translate(-50%, -50%) translateY(rem(50));
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  @media screen and (max-width: 450px) {
    width: 90%;
    padding-bottom: rem(30);
    
  }
}

.popupContent {
  max-height: 80vh;
  overflow-y: auto;
}

.opened {
  opacity: 1;
  pointer-events: auto;

  .inner {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.button {
  margin-top: rem(60);
  display: flex;
  justify-content: center;
  @media screen and (max-width: 450px) {
    margin-top: rem(30);
  }
}

.text {
  max-width: rem(550);
  margin-bottom: rem(20) !important;
  font-weight: 400;
  font-size: rem(24);
  line-height: rem(33);
}

.popupTitle {
  font-weight: 700;
  font-size: rem(24);
  line-height: rem(33);
  margin-top: rem(25);
  margin-bottom: rem(10);
}

.popupText {
  font-weight: 400;
  font-size: rem(18);
  line-height: rem(25);
  margin: 0;
  @media screen and (max-width: 450px) {
    font-size: rem(17) !important;
  }
}
</style>
