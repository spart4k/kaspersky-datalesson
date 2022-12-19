<template>
  <div :class="$style.wrapper">
    <v-progress :class="$style.progress"></v-progress>
    <img
      :class="$style.cod"
      ref="codRef"
      :src="isAnimated ? '/assets/img/lesson2/cod_2.png' : '/assets/img/lesson2/cod_1.png'"
      alt=""
    />
    <v-speaker v-if="stage > 1 || (stage === 1 && !isModalActive)" @toggle="toggleMobileChat" :counter="mobileChatCounter" />
    <div :class="[$style.cardWrapper, stage === 1 && $style.disabled]">
      <template v-for="index in 6">
        <Card
          :index="index"
          :isActive="activeCards.includes(index)"
          :isDisabled="stage === 1 || isSuccess || isCheckingInProgress"
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
    <v-popup-msg :items="messages" :isOpened="isMobileChatOpened" @toggle="toggleMobileChat" :class="$style.popupMsg" />
    <transition name="fade">
      <v-btn v-if="stage === 1 && messages.length >= texts.start[`level${level}`].length && (!isMobile || isMobile && isMobileChatOpened)" sm :class="$style.btn" @click="onGameInit">Хорошо</v-btn>
      <v-btn
        v-if="stage === 2 && activeCards.length >= 4 && !isCheckingInProgress"
        sm
        :class="$style.btn"
        @click="checkCards"
        >Проверить</v-btn
      >
      <v-btn v-if="stage === 4" sm :class="$style.btn" @click="$router.push('/lesson3')"
        >Продолжить</v-btn
      >
    </transition>
    <v-modal v-if="stage === 1" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <img :class="$style.speaker" src="../../../components/@ui/Speaker/speaker.png" alt="" />
        <p :class="$style.modalText">
          Центр обработки данных, сокращённо – ЦОД. Туда поступают данные с множества источников из
          разных точек планеты.
        </p>
        <v-btn lg @click="onGameStart">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="stage === 3" :isActive="isModalActive">
      <div :class="[$style.achieveModal, errorCount === 0 ? $style.gold : $style.silver]">
        <img
          :class="$style.achieve"
          :src="
            errorCount === 0
              ? '/assets/img/lesson2/achieveGold.png'
              : '/assets/img/lesson2/achieveSilver.png'
          "
          alt=""
        />
        <p :class="[$style.modalTextAchieve, $style.modalTextBottom]">
          {{ errorCount === 0 ? texts.achieveGold : texts.achieveSilver }}
        </p>
        <v-btn lg @click="closeAchieveModal">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import gsap from 'gsap';
import Card from '../components/Card/Card.vue';
import { useStore } from '@/store';
import { pushPopup } from '@/utils/pushPopup';
import { loadImage } from '@/utils/loadImage';
import useMobile from '@/hooks/useMobile';
import texts from './texts';

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
    const messages = ref([]);
    const activeCards = ref([]);
    const codRef = ref(null);
    const isMobileChatOpened = ref(true);
    const mobileChatCounter = ref(0);

    const store = useStore();
    const level = computed(() => store.state.level);

    const isMobile = useMobile();

    const onNext = () => {
      stage.value += 1;
    };

    watch(isMobile, () => {
      if (!isMobile.value) {
        isMobileChatOpened.value = false
      }
    })

    const toggleMobileChat = () => {
      if (stage.value === 1) return;
      isMobileChatOpened.value = !isMobileChatOpened.value
      mobileChatCounter.value = 0
    }

    const onGameStart = () => {
      isModalActive.value = false;
      pushPopup(texts.start[`level${level.value}`], messages.value);
    };

    const onGameInit = () => {
      isMobileChatOpened.value = false;
      onNext();
    };

    const onCardClick = (num) => {
      if (activeCards.value.includes(num)) {
        activeCards.value = activeCards.value.filter((el) => el !== num);
      } else {
        activeCards.value.push(num);
      }
    };

    const checkCards = () => {
      isCheckingInProgress.value = true;
      if (!activeCards.value.includes(2) && !activeCards.value.includes(5)) {
        isSuccess.value = true;
        messages.value.push(texts.final[`level${level.value}`]);
        mobileChatCounter.value += 1
        new Promise((resolve) => {
          const { top, left } = codRef.value.getBoundingClientRect();
          gsap.to('.card1', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 0.7,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card1', { opacity: 0, duration: 0.3 });
            isAnimated.value = true;
          }, 200);
          gsap.to('.card3', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 0.5,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card3', { opacity: 0, duration: 0.3 });
          }, 0);
          gsap.to('.card4', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 0.7,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card4', { opacity: 0, duration: 0.3 });
          }, 100);
          gsap.to('.card6', {
            x: (i, el) => left - el.getBoundingClientRect().left,
            y: (i, el) => top - el.getBoundingClientRect().top,
            duration: 0.5,
            scale: 0.5,
          });
          setTimeout(() => {
            gsap.to('.card6', { opacity: 0, duration: 0.3 });
          }, 0);
          setTimeout(() => {
            resolve();
          }, 1000);
        }).then(async () => {
          onNext();
          store.dispatch('updateCurrentLesson', 3)
          if (errorCount.value < 2) {
            await loadImage(
              errorCount.value === 0
                ? '/assets/img/lesson2/achieveGold.png'
                : '/assets/img/lesson2/achieveSilver.png'
            );
            errorCount.value === 0 ? store.dispatch('updateProgress', [2, 2]) : store.dispatch('updateProgress', [2, 1]);
            isModalActive.value = true;
          } else {
            onNext();
          }
        });
      } else {
        if (activeCards.value.includes(2) || activeCards.value.includes(5)) errorCount.value += 1;
        if (errorCount.value === 1) {
          messages.value.push(texts.wrong[`level${level.value}`].error1);
          mobileChatCounter.value += 1
        } 
        if (errorCount.value === 2) {
          messages.value.push(texts.wrong[`level${level.value}`].error2);
          mobileChatCounter.value += 1
        } 
        setTimeout(() => {
          isCheckingInProgress.value = false;
          stage.value = 2;
          activeCards.value = [];
        }, 3000);
      }
    };

    const closeAchieveModal = () => {
      isModalActive.value = false;
      onNext();
    };

    return {
      isModalActive,
      onGameStart,
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
      texts,
      closeAchieveModal,
      errorCount,
      level,
      isMobileChatOpened,
      onGameInit,
      toggleMobileChat,
      isMobile,
      mobileChatCounter,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
