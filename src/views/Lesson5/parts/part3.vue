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
              <th :class="[$style.fact, (stage < 2 || stage === 6) && $style.hidden, stage > 5 && $style.corrected]">{{stage > 5 ? 'Скорректированный прогноз' : 'Факт'}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :class="$style.columnTitle">Ветер</td>
              <td :class="$style.columnTitle">Температура</td>
              <td :class="[$style.columnTitle, (stage < 2 || stage === 6) && $style.hidden]">Температура</td>
            </tr>
            <template v-for="index in 4">
              <Row
                :key="index"
                :index="index"
                :stage="stage"
                :isClickable="stage === 2 || stage === 6"
                :isSelected="selectedRows.includes(index)"
                :isWrong="
                  isCheckingInProgress &&
                  (selectedRows.length !== correctRows.length || !selectedRows.every((el) => correctRows.includes(el))) &&
                  selectedRows.includes(index)
                "
                :isCorrect="
                  selectedRows.every((el) => correctRows.includes(el)) &&
                  selectedRows.includes(index) &&
                  stage > 2 &&
                  stage < 6
                "
                :class="[$style.row, `row${index}`]"
                @click="onRowClick(index)"
              />
              <div :key="-index" :class="$style.divider"></div>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="stage > 3" :class="$style.patternsWrapper">
      <template v-for="index in 4">
        <div
          :class="[
            $style.pattern,
            isCheckingInProgress &&
              selectedPattern !== 1 &&
              selectedPattern === index &&
              $style.wrong,
            selectedPattern === 1 && selectedPattern === index && stage < 6 && $style.correct,
            stage > 4 && selectedPattern !== index && $style.hidden, stage > 4 && selectedPattern === index && $style.disabled
          ]"
          :key="index"
          @click="checkPattern(index)"
        >
          {{ texts.patterns[`level${level}`][index - 1] }}
        </div>
      </template>
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
        v-if="(stage === 2 || stage === 6) && selectedRows.length > 0 && !isCheckingInProgress"
        sm
        :class="$style.btn"
        @click="checkRows"
        >Проверить</v-btn
      >
      <v-btn v-if="stage === 3 || stage === 5" sm :class="$style.btn" @click="onNext"
        >Продолжить</v-btn
      >
      <!-- <v-btn v-if="stage === 4" sm :class="$style.btn" @click="$router.push('/lesson3')"
        >Продолжить</v-btn
      > -->
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
    const selectedPattern = ref(null);
    const task1ErrorsCount = ref(0);
    const task2ErrorsCount = ref(0);
    const task3ErrorsCount = ref(0);

    const store = useStore();
    const level = computed(() => store.state.level);

    const isMobile = useMobile();

    const correctRows = level.value === '1' ? [2, 4] : undefined;
    const correctRows2 = level.value === '1' ? [1, 3] : undefined;

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
      if (stage.value === 2) {
        pushPopup(texts.stage2.start[`level${level.value}`], messages.value);
        mobileChatCounter.value += 2;
      }
      if (stage.value === 4) {
        messages.value.push(texts.stage4.start[`level${level.value}`]);
        mobileChatCounter.value += 1;
      }
      if (stage.value === 6) {
        selectedRows.value = [];
        pushPopup(texts.stage6.start[`level${level.value}`], messages.value);
        mobileChatCounter.value += 3;
      }
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
    };

    const checkRows = () => {
      isCheckingInProgress.value = true;
      if (stage.value === 2) {
        if (selectedRows.value.length === correctRows.length && selectedRows.value.every((el) => correctRows.includes(el))) {
          isCheckingInProgress.value = false;
          messages.value.push(texts.stage2.final[`level${level.value}`]);
          mobileChatCounter.value += 1;
          onNext();
        } else {
          errorCount.value += 1;
          task1ErrorsCount.value += 1;
          if (task1ErrorsCount.value === 1) {
            messages.value.push(texts.stage2.error1[`level${level.value}`]);
            mobileChatCounter.value += 1;
          }
          if (task1ErrorsCount.value === 2) {
            messages.value.push(texts.stage2.error2[`level${level.value}`]);
            mobileChatCounter.value += 1;
          }
          setTimeout(() => {
            isCheckingInProgress.value = false;
            selectedRows.value = [];
          }, 2000);
        }
      }

      if (stage.value === 6) {
        if (selectedRows.value.length === correctRows2.length && selectedRows.value.every((el) => correctRows2.includes(el))) {
          isCheckingInProgress.value = false;
          messages.value.push(texts.stage6.final[`level${level.value}`]);
          mobileChatCounter.value += 1;
          onNext();
        } else {
          errorCount.value += 1;
          task3ErrorsCount.value += 1;
          if (task3ErrorsCount.value === 1) {
            messages.value.push(texts.stage6.error1[`level${level.value}`]);
            mobileChatCounter.value += 1;
          }
          if (task3ErrorsCount.value === 2) {
            messages.value.push(texts.stage6.error2[`level${level.value}`]);
            mobileChatCounter.value += 1;
          }
          setTimeout(() => {
            isCheckingInProgress.value = false;
            selectedRows.value = [];
          }, 2000);
        }
      }
    };

    const checkPattern = (num) => {
      if (isCheckingInProgress.value) return;
      isCheckingInProgress.value = true;
      selectedPattern.value = num;
      if (num === 1) {
        isCheckingInProgress.value = false;
        messages.value.push(texts.stage4.final[`level${level.value}`]);
        mobileChatCounter.value += 1;
        onNext();
      } else {
        errorCount.value += 1;
        task2ErrorsCount.value += 1;
        if (task2ErrorsCount.value === 1) {
          messages.value.push(texts.stage4.error1[`level${level.value}`]);
          mobileChatCounter.value += 1;
        }
        if (task2ErrorsCount.value === 2) {
          messages.value.push(texts.stage4.error2[`level${level.value}`]);
          mobileChatCounter.value += 1;
        }
        setTimeout(() => {
          isCheckingInProgress.value = false;
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
      correctRows,
      checkPattern,
      selectedPattern,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
