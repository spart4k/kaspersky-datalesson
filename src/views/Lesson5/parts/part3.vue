<template>
  <div :class="$style.wrapper">
    <div :class="$style.starsWrapper">
      <img :class="$style.stars" src="../assets/stars4.svg" alt="" />
    </div>
    <v-speaker
      v-if="stage > 1 || (stage === 1 && !isModalActive)"
      @toggle="toggleMobileChat"
      :counter="mobileChatCounter"
    />
    <div :class="$style.window">
      <img :class="$style.controls" src="../assets/controls.svg" alt="" />
      <p :class="$style.title">Прогноз погоды</p>
      <div :class="$style.tableWrapper">
        <table :class="$style.table">
          <thead :class="$style.thead">
            <tr>
              <th colspan="2" :class="$style.forecast">Прогноз</th>
              <th :class="[$style.fact, stage < 2 && $style.hidden]">Факт</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :class="$style.columnTitle">Ветер</td>
              <td :class="$style.columnTitle">Температура</td>
              <td :class="[$style.columnTitle, stage < 2 && $style.hidden]">Температура</td>
            </tr>
            <template v-for="index in 4">
              <Row
                :key="index"
                :index="index"
                :stage="stage"
                :isClickable="stage === 2"
                :isSelected="selectedRows.includes(index)"
                :isWrong="isCheckingInProgress && selectedRows.includes(index)"
                :class="[$style.row, `row${index}`]"
                @click="onRowClick(index)"
              />
              <div :key="-index" :class="$style.divider"></div>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <v-popup-msg
      :items="messages"
      :isOpened="isMobileChatOpened"
      @toggle="toggleMobileChat"
      :class="$style.popupMsg"
    />
    <transition name="fade">
      <v-btn
        v-if="
          stage === 1 &&
          messages.length >= texts.start[`level${level}`].length &&
          (!isMobile || (isMobile && isMobileChatOpened))
        "
        sm
        :class="$style.btn"
        @click="onGameInit"
        >Хорошо</v-btn
      >
      <v-btn
        v-if="stage === 2 && selectedRows.length > 0 && !isCheckingInProgress"
        sm
        :class="$style.btn"
        @click="checkRows"
        >Проверить</v-btn
      >
      <v-btn v-if="stage === 4" sm :class="$style.btn" @click="$router.push('/lesson3')"
        >Продолжить</v-btn
      >
    </transition>
    <v-modal v-if="stage === 1" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <img src="../../../assets/img/leader.svg" alt="" />
        <p :class="$style.modalText">
          Центр обработки данных, сокращённо – ЦОД. Туда поступают данные с множества источников из
          разных точек планеты.
        </p>
        <p :class="$style.modalText">
          Давай научимся отличать источники, необходимые для прогноза, от тех, которые в прогнозе не
          требуются.
        </p>
        <v-btn lg @click="onGameStart">Начать</v-btn>
      </div>
    </v-modal>
    <!-- <v-modal v-if="stage === 3" :isActive="isModalActive">
      <div :class="$style.achieveModal">
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
    </v-modal> -->
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
// import gsap from 'gsap';
import Row from '../components/Row.vue';
import { useStore } from '@/store';
import { pushPopup } from '@/utils/pushPopup';
import useMobile from '@/hooks/useMobile';
import texts from './texts';

export default {
  name: 'part3',
  components: {
    Row,
  },
  setup() {
    const isModalActive = ref(true);
    const stage = ref(1);
    const errorCount = ref(0);
    const messages = ref([]);
    const isMobileChatOpened = ref(true);
    const mobileChatCounter = ref(0);
    const selectedRows = ref([]);
    const isCheckingInProgress = ref(false);

    const store = useStore();
    const level = computed(() => store.state.level);

    const isMobile = useMobile();

    const onNext = () => {
      stage.value += 1;
    };

    watch(isMobile, () => {
      if (!isMobile.value) {
        isMobileChatOpened.value = false;
      }
    });

    const toggleMobileChat = () => {
      isMobileChatOpened.value = !isMobileChatOpened.value;
      mobileChatCounter.value = 0;
    };

    const onGameStart = () => {
      isModalActive.value = false;
      pushPopup(texts.start[`level${level.value}`], messages.value);
    };

    watch(stage, () => {
      // if (stage.value === 1) {
      //   pushPopup(texts.start[`level${level.value}`], messages.value);
      // }
      if (stage.value === 2) {
        messages.value.push(texts.stage2[`level${level.value}`]);
      }
    });

    onMounted(() => {
      // stage.value = 1
    });

    const onGameInit = () => {
      isMobileChatOpened.value = false;
      onNext();
    };

    const onRowClick = (num) => {
      if (selectedRows.value.includes(num)) {
        selectedRows.value = selectedRows.value.filter((el) => el !== num);
      } else {
        selectedRows.value.push(num);
      }
      console.log(selectedRows.value);
    };

    const checkRows = () => {
      isCheckingInProgress.value = true;
      if (false) {
        // isSuccess.value = true;
        // messages.value.push(texts.final[`level${level.value}`]);
        // mobileChatCounter.value += 1;
        
          // if (errorCount.value < 2) {
          //   isModalActive.value = true;
          // } else {
          //   onNext();
          // }
      } else {
        // if (activeCards.value.includes(2) || activeCards.value.includes(5)) errorCount.value += 1;
        // if (errorCount.value === 1) {
        //   messages.value.push(texts.wrong[`level${level.value}`].error1);
        //   mobileChatCounter.value += 1;
        // }
        // if (errorCount.value === 2) {
        //   messages.value.push(texts.wrong[`level${level.value}`].error2);
        //   mobileChatCounter.value += 1;
        // }
        setTimeout(() => {
          isCheckingInProgress.value = false;
          // stage.value = 2;
          selectedRows.value = [];
        }, 2000);
      }
    };

    const closeAchieveModal = () => {
      isModalActive.value = false;
      onNext();
    };

    return {
      isModalActive,
      stage,
      messages,
      onNext,
      onRowClick,
      texts,
      closeAchieveModal,
      errorCount,
      level,
      isMobileChatOpened,
      onGameInit,
      toggleMobileChat,
      isMobile,
      mobileChatCounter,
      onGameStart,
      selectedRows,
      isCheckingInProgress,
      checkRows,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
