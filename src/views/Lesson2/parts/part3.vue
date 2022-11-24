<template>
  <div :class="$style.wrapper">
    <img :class="$style.stars" src="../assets/stars1.svg" alt="" />
    <img :class="$style.codd" src="../assets/cod_1.png" alt="" />
    <div :class="$style.cardWrapper">
      <Card>
        <div :class="$style.cardImgWrapper">
          <img src="../assets/card1.png" alt="" />
        </div>
        <p :class="$style.cardText">Спутники</p>
      </Card>
      <Card>
        <div :class="$style.cardImgWrapper">
          <img src="../assets/card2.png" alt="" />
        </div>
        <p :class="$style.cardText">Домашние метеостанции</p>
      </Card>
      <Card>
        <div :class="$style.cardImgWrapper">
          <img src="../assets/card3.png" alt="" />
        </div>
        <p :class="$style.cardText">Метеорадары</p>
      </Card>
      <Card>
        <div :class="$style.cardImgWrapper">
          <img src="../assets/card4.png" alt="" />
        </div>
        <p :class="$style.cardText">Метеозонды</p>
      </Card>
      <Card>
        <div :class="$style.cardImgWrapper">
          <img src="../assets/card5.png" alt="" />
        </div>
        <p :class="$style.cardText">Барометры<br /> в телефонах</p>
      </Card>
      <Card>
        <div :class="$style.cardImgWrapper">
          <img src="../assets/card6.png" alt="" />
        </div>
        <p :class="$style.cardText">Метеостанции</p>
      </Card>
    </div>
    <v-modal v-if="isModalActive" :isActive="isModalActive" :toggleActive="closeModal">
      <div :class="$style.modalInner">
        <img src="../assets/prof.png" alt="" />
        <p :class="$style.modalText">
          Центр обработки данных, сокращённо – ЦОД. Туда поступают данные с множества источников из
          разных точек планеты.
        </p>
        <p :class="$style.modalText">
          Давай научимся отличать источники, необходимые для прогноза, от тех, которые в прогнозе не
          требуются.
        </p>
        <v-btn lg @click="closeModal">Начать</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import Card from '../components/Card/Card.vue';

export default {
  name: 'part3',
  components: {
    Card,
  },
  setup() {
    const isModalActive = ref(true);

    const closeModal = () => {
      isModalActive.value = false;
    };

    return {
      isModalActive,
      closeModal,
    };
  },
};
</script>

<style lang="scss" module>
.wrapper {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: $lesson2bgColor;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -10%;
    width: 75.4rem;
    height: 100%;
    background-image: url('../assets/bg.svg');
    background-size: 146% 146%;
    background-position: -12% 43%;
    background-repeat: no-repeat;
  }
}

.modalInner {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modalText {
  font-size: 1.6rem;
  line-height: 2.2rem;
  text-align: center;
}

.stars {
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  z-index: 10;
  width: 32rem;
  height: 9.6rem;
}

.codd {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  z-index: 10;
  width: 18.9rem;
  height: 21.9rem;
}

.cardWrapper {
  width: 72.3rem;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 8rem;
  margin-top: 2.6rem;
}

.cardImgWrapper {
  height: 15.2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardText {
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: #000;
}
</style>
