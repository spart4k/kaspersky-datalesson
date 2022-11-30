<template>
  <div :class="$style.wrapper">
    <img :class="$style.stars" src="../assets/stars1.svg" alt="" />
    <img :class="$style.cod" ref="codRef" :src="isAnimated ? '/assets/img/lesson2/cod_2.svg' : '/assets/img/lesson2/cod_1.svg'" alt="" />
    <img :class="$style.prof" src="../../../assets/img/prof.png" alt="" />
    <div :class="$style.cardWrapper">
      <template v-for="index in 6">
        <Card
          :index="index"
          :isActive="activeCards.includes(index)"
          :isDisabled="stage === 1 || isSuccess"
          :isWrong="
            isCheckingInProgress &&
            ((index === 2 && activeCards.includes(2)) || (index === 5 && activeCards.includes(5)))
          "
          :isNotSelected="isCheckingInProgress && !activeCards.includes(index)"
          :key="index"
          :class="`card${index}`"
          @click="onCardClick(index)"
        />
      </template>
    </div>
    <v-popup-msg :items="messages" :task="messages" :class="$style.popupMsg" />
    <transition name="fade">
      <v-btn v-if="stage === 1" sm :class="$style.btn" @click="onNext">Хорошо</v-btn>
      <v-btn
        v-if="stage === 2 && activeCards.length >= 4 && !isCheckingInProgress"
        sm
        :class="$style.btn"
        @click="checkCards"
        >Проверить</v-btn
      >
    </transition>
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
import gsap from 'gsap';
import Card from '../components/Card/Card.vue';

export default {
  name: 'part3',
  components: {
    Card,
  },
  setup() {
    const isModalActive = ref(true);
    const stage = ref(1);
    const errorCount = ref(0);
    const isCheckingInProgress = ref(false);
    const isSuccess = ref(false);
    const isAnimated = ref(false);
    const messages = ref([
      'Отметь все профессиональные источники данных, которые отправляют данные в ЦОД.',
    ]);
    const activeCards = ref([]);
    const codRef = ref(null);

    const closeModal = () => {
      isModalActive.value = false;
    };

    const onCardClick = (num) => {
      if (activeCards.value.includes(num)) {
        activeCards.value = activeCards.value.filter(el => el !== num);
      } else {
        activeCards.value.push(num);
      }
    };

    const checkCards = () => {
      isCheckingInProgress.value = true;
      if (!activeCards.value.includes(2) && !activeCards.value.includes(5)) {
        isSuccess.value = true;
        messages.value.push('Правильно! Тебе удалось выделить все правильные источники данных.');
        new Promise((resolve) => {
          const { top, left } = codRef.value.getBoundingClientRect();
          gsap.to('.card1', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 4,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card1', { opacity: 0, duration: 1 });
          }, 3000);
          gsap.to('.card3', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 3,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card3', { opacity: 0, duration: 1 });
            isAnimated.value = true;
          }, 2000);
          gsap.to('.card4', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 5,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card4', { opacity: 0, duration: 1 });
          }, 4000);
          gsap.to('.card6', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 4,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card6', { opacity: 0, duration: 1 });
          }, 3000);
          setTimeout(() => {
            resolve();
          }, 4500);
        }).then(() => {
          stage.value = 3;
          isModalActive.value = true;
        })
      } else {
        if (activeCards.value.includes(2) || activeCards.value.includes(5)) errorCount.value += 1;
        if (errorCount.value === 1) messages.value.push('Не забывай, что источники данных должны быть профессиональные.');
        setTimeout(() => {
          isCheckingInProgress.value = false;
          stage.value = 2;
          activeCards.value = [];
        }, 3000);
      }
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
      activeCards,
      onCardClick,
      checkCards,
      isCheckingInProgress,
      isSuccess,
      codRef,
      isAnimated,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
