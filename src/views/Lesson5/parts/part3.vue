<template>
  <div :class="[$style.wrapper, level === '3' && $style.level3]">
    <div :class="$style.starsWrapper">
      <img :class="$style.stars" src="../assets/stars4.svg" alt="" />
    </div>
    <div v-if="isMobile && stage > 3" :class="$style.patternsBtnWrapper">
      <div :class="$style.patternsBtn" @click="isPatternWindowActive = true">?</div>
    </div>
    <v-speaker
      v-if="stage > 1 || (stage === 1 && !isModalActive)"
      @toggle="toggleMobileChat"
      :counter="mobileChatCounter"
    />
    <div :class="$style.window">
      <img :class="$style.controls" src="../assets/controls.svg" alt="" />
      <p :class="$style.title">Прогноз погоды</p>
      <table :class="[$style.table, level === '3' && $style.level3]">
        <thead :class="$style.thead">
          <tr>
            <th :colspan="level === '3' ? '3' : '2'" :class="$style.forecast">Прогноз</th>
            <th
              :class="[
                $style.fact,
                (stage < 2 || stage === 6) && $style.hidden,
                stage > 5 && $style.corrected,
              ]"
            >
              {{ stage > 5 ? 'Скорректированный прогноз' : 'Факт' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :class="$style.columnTitle">Ветер</td>
            <td v-if="level === '3'" :class="$style.columnTitle">Дождь</td>
            <td :class="$style.columnTitle">Температура</td>
            <td :class="[$style.columnTitle, (stage < 2 || stage === 6) && $style.hidden]">
              Температура
            </td>
          </tr>
          <template v-for="index in level === '3' && stage < 6 ? 8 : 4">
            <Row
              :key="index"
              :index="index"
              :stage="stage"
              :isClickable="(stage === 2 || stage === 6) && !isCheckingInProgress"
              :isSelected="selectedRows.includes(index)"
              :isWrong="
                isCheckingInProgress &&
                (selectedRows.length !== correctRows.length ||
                  !selectedRows.every((el) => correctRows.includes(el))) &&
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
      <div v-if="stage > 5 && isMobile" :class="$style.correctPatternMobile">
        {{ texts.patterns[`level${level}`][0] }}
      </div>
    </div>
    <div
      v-if="stage > 3"
      :class="[$style.patternsWrapper, isMobile && isPatternWindowActive && $style.active]"
    >
      <p v-if="isMobile" :class="$style.patternsTitle">Выбери верное утверждение:</p>
      <div
        v-if="isMobile"
        @click="isPatternWindowActive = false"
        :class="$style.patternsBtnCloseWrapper"
      ></div>
      <template v-for="index in 4">
        <div
          :class="[
            $style.pattern,
            isCheckingInProgress &&
              selectedPattern !== 1 &&
              selectedPattern === index &&
              $style.wrong,
            selectedPattern === 1 && selectedPattern === index && stage < 6 && $style.correct,
            stage > 5 && selectedPattern !== index && $style.hidden,
            stage > 4 && selectedPattern === 1 && $style.disabled,
          ]"
          :key="index"
          @click="checkPattern(index)"
        >
          {{ texts.patterns[`level${level}`][index - 1] }}
        </div>
      </template>
      <v-btn v-if="stage >= 5 && isMobile" sm :class="$style.btnMobile" @click="onMobileBtnClick"
        >Продолжить</v-btn
      >
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
        v-if="(stage === 2 || (stage === 6 && (!isMobile || !isPatternWindowActive))) && selectedRows.length > 0 && !isCheckingInProgress"
        sm
        :class="$style.btn"
        @click="checkRows"
        >Проверить</v-btn
      >
      <v-btn v-if="(stage === 3 || (stage === 5 && !isMobile))" sm :class="$style.btn" @click="onNext"
        >Продолжить</v-btn
      >
      <v-btn v-if="stage === 8 && (!isMobile || !isPatternWindowActive)" sm :class="$style.btn" @click="$router.push('/lesson6')"
        >Продолжить</v-btn
      >
    </transition>
    <v-modal v-if="stage === 1" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <img :class="$style.speaker" src="../../../assets/img/leader.svg" alt="" />
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
    <v-modal v-if="stage === 7" :isActive="isModalActive">
      <div :class="[$style.achieveModal, errorCount === 0 ? $style.gold : $style.silver]">
        <img
          :class="$style.achieve"
          :src="
            errorCount === 0
              ? '/assets/img/lesson5/achieveGold.png'
              : '/assets/img/lesson5/achieveSilver.png'
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
    const isPatternWindowActive = ref(true);

    const store = useStore();
    const level = computed(() => store.state.level);

    const isMobile = useMobile();

    const correctRows = level.value === '3' ? [1, 2, 6, 7] : [2, 4];
    const correctRows2 = level.value === '3' ? [2, 3] : [1, 3];

    const onNext = () => {
      stage.value += 1;
    };

    watch(isMobile, () => {
      if (!isMobile.value) {
        isMobileChatOpened.value = false;
      }
    });

    const toggleMobileChat = () => {
      if (stage.value === 1) return;
      isMobileChatOpened.value = !isMobileChatOpened.value;
      mobileChatCounter.value = 0;
    };

    const onGameStart = () => {
      isModalActive.value = false;
      pushPopup(texts.start[`level${level.value}`], messages.value);
    };

    const onMobileBtnClick = () => {
      isPatternWindowActive.value = false;
      if (stage.value === 5) onNext();
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
        if (
          selectedRows.value.length === correctRows.length &&
          selectedRows.value.every((el) => correctRows.includes(el))
        ) {
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
        if (
          selectedRows.value.length === correctRows2.length &&
          selectedRows.value.every((el) => correctRows2.includes(el))
        ) {
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

      if (stage.value === 7) {
        if (errorCount.value <= 1) {
          setTimeout(() => {
            isModalActive.value = true;
          }, 1000);
        } else {
          setTimeout(() => {
            onNext();
          }, 1000);
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
      isPatternWindowActive,
      onMobileBtnClick,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
