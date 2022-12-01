<template>
  <div :class="$style.wrapper">
    <img :class="$style.stars" src="../assets/stars1.svg" alt="" />
    <Diary/>
    <img :class="$style.prof" src="../../../assets/img/prof.png" alt="" />
    <div :class="$style.appliances">
      <div :class="$style.precipitation">
        <div :class="$style.wrap">
          <div :class="$style.precipitation">
            <img src="../assets/precipitation.svg" alt="">
          </div>
          <div :class="$style.home">
            <img src="../assets/home.svg" alt="">
          </div>
          <div :class="$style.mill">
            <img src="../assets/mill.svg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.cardWrapper">
    </div>
    <v-popup-msg :items="messages" :task="messages" :class="$style.popupMsg" />
    <!-- <transition name="fade">
      <v-btn v-if="stage === 1" sm :class="$style.btn" @click="onNext">Хорошо</v-btn>
      <v-btn
        v-if="stage === 2 && activeCards.length >= 4 && !isCheckingInProgress"
        sm
        :class="$style.btn"
        @click="checkCards"
        >Проверить</v-btn
      >
    </transition> -->
    <v-modal v-if="stage === 1" :isActive="isModalActive" :toggleActive="closeModal">
      <div :class="$style.modalInner">
        <img src="../../../assets/img/prof.png" alt="" />
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
    <v-modal v-if="stage === 3" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <img :class="$style.achieve" src="../assets/achieve.svg" alt="" />
        <p :class="[$style.modalText, $style.modalTextBottom]">
          Отличная работа! Ты получаешь золотое достижение «Инженер данных»!<br /> Продолжай в том же духе!
        </p>
        <v-btn lg @click="$router.push('/lesson3')">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref } from 'vue';
// import gsap from 'gsap';
// import Card from '../components/Card/Card.vue';
import Diary from '../components/Diary/index.vue';


export default {
  name: 'part3',
  components: {
    Diary,
    // Card,
  },
  setup() {
    const isModalActive = ref(true);
    const stage = ref(1);
    const isCheckingInProgress = ref(false);
    const isSuccess = ref(false);
    const isAnimated = ref(false);
    const messages = ref([
      'Кликай на приборы, чтобы посмотреть на них поближе и зафиксировать их показания.',
    ]);

    const closeModal = () => {
      isModalActive.value = false;
    };

    const onNext = () => {
      stage.value += 1;
    };

    return {
      isModalActive,
      closeModal,
      stage,
      messages,
      onNext,
      // activeCards,
      // onCardClick,
      // checkCards,
      isCheckingInProgress,
      isSuccess,
      isAnimated,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
