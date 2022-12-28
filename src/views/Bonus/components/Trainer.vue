<template>
  <div :class="$style.wrapper">
    <v-progress :class="$style.progress"></v-progress>
    <div v-if="isMobile && stage > 3" :class="$style.patternsBtnWrapper">
      <div :class="$style.patternsBtn" @click="isPatternWindowActive = true">?</div>
    </div>
    <v-speaker
      v-if="stage > 1 || (stage === 1 && !isModalActive)"
      @toggle="toggleMobileChat"
      :counter="mobileChatCounter"
    />
    {{$props.part}}
    <div :class="[$style.window, stage === 1 && $style.disabled]">
      <img :class="$style.controls" src="../assets/controls.svg" alt="" />
      <p :class="$style.title">Прогноз погоды</p>
      <table :class="[$style.table, $props.part > 2 && $style.extended]">
        <thead :class="$style.thead">
          <tr>
            <th :colspan="$props.part > 2 ? '3' : '2'" :class="$style.forecast">Прогноз</th>
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
            <td v-if="$props.part > 2" :class="$style.columnTitle">Дождь</td>
            <td :class="$style.columnTitle">Температура</td>
            <td :class="[$style.columnTitle, (stage < 2 || stage === 6) && $style.hidden]">
              Температура
            </td>
          </tr>
          <template v-for="index in getRowsNumber()">
            <Row
              :key="index"
              :index="index"
              :stage="stage"
              :part="$props.part"
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
        {{ texts.patterns[`part${$props.part}`][correctPattern - 1] }}
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
              selectedPattern !== correctPattern &&
              selectedPattern === index &&
              $style.wrong,
            selectedPattern === correctPattern && selectedPattern === index && stage < 6 && $style.correct,
            stage > 5 && selectedPattern !== index && $style.hidden,
            stage > 4 && selectedPattern === correctPattern && $style.disabled,
          ]"
          :key="index"
          @click="checkPattern(index)"
        >
          {{ texts.patterns[`part${$props.part}`][index - 1] }}
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
          messages.length >= texts.start.length &&
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
      <v-btn v-if="stage === 7 && (!isMobile || !isPatternWindowActive) && $props.part !== 5" sm :class="$style.btn" @click="$props.part !== 5 && $emit('next')"
        >{{$props.part === 5 ? 'Ура, это всё!' : 'К заданию посложнее'}}</v-btn
      >
      <v-btn
        sm
        :class="$style.btn"
        @click="() => {}"
        v-if="!isModalActive && !(stage === 1 && messages.length >= texts.start.length && (!isMobile || (isMobile && isMobileChatOpened))) && !((stage === 2 || (stage === 6 && (!isMobile || !isPatternWindowActive))) && selectedRows.length > 0 && !isCheckingInProgress) && !(stage === 3 || (stage === 5 && !isMobile)) && !(stage === 7 && (!isMobile || !isPatternWindowActive) && $props.part !== 5)"
        >Пропустить задание</v-btn
      >
    </transition>
    <v-modal v-if="stage === 1 && $props.part === 1" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <img :class="$style.speaker" src="../../../components/@ui/Speaker/speaker.png" alt="" />
        <p :class="$style.modalText">{{texts.modal}}</p>
        <v-btn lg @click="onGameStart">Начать</v-btn>
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
  name: 'Trainer',
  components: {
    Row,
  },
  props: {
    part: Number,
  },
  setup(props) {
    const isModalActive = ref(true);
    const stage = ref(1);
    const errorCount = ref(0);
    const messages = ref([]);
    const isMobileChatOpened = ref(true);
    const mobileChatCounter = ref(0);
    const selectedRows = ref([]);
    const isCheckingInProgress = ref(false);
    const selectedPattern = ref(null);
    const isPatternWindowActive = ref(true);

    const store = useStore();
    const level = computed(() => store.state.level);

    const isMobile = useMobile();

    const correctRows = props.part === 1 ? [2, 7] : props.part === 2 ? [4, 6, 8, 9, 11, 12] : props.part === 3 ? [1, 3, 4, 6, 8, 9, 10, 12, 15, 16] : props.part === 4 ? [2, 3, 4, 6, 7, 10] : [1, 3, 4, 7, 8, 9, 12, 13];
    const correctRows2 = props.part === 1 ? [3, 5] : props.part === 2 ? [2, 5] : props.part === 3 ? [1, 2, 4, 6] : props.part === 4 ? [2, 4, 6, 7] : [1, 2, 3, 4];
    const correctPattern = props.part === 1 ? 1 : props.part === 2 ? 4 : props.part === 3 ? 1 : props.part === 4 ? 2 : 2;

    const onNext = () => {
      stage.value += 1;
    };

    watch(isMobile, () => {
      if (!isMobile.value) {
        isMobileChatOpened.value = false;
      }
    });

    const getRowsNumber = () => {
      if (props.part === 1) {
        return stage.value < 6 ? 8 : 5
      }
      if (props.part === 2) {
        return stage.value < 6 ? 12 : 6
      }
      if (props.part === 3) {
        return stage.value < 6 ? 16 : 6
      }
      if (props.part === 4) {
        return stage.value < 6 ? 12 : 7
      }
      if (props.part === 5) {
        return stage.value < 6 ? 13 : 7
      }
    }

    const toggleMobileChat = () => {
      if (stage.value === 1) return;
      isMobileChatOpened.value = !isMobileChatOpened.value;
      mobileChatCounter.value = 0;
    };

    const onGameStart = () => {
      isModalActive.value = false;
      pushPopup(texts.start, messages.value);
    };

    const onMobileBtnClick = () => {
      isPatternWindowActive.value = false;
      if (stage.value === 5) onNext();
    };

    watch(stage, () => {
      if (stage.value === 2) {
        pushPopup(texts.stage2.start, messages.value);
        mobileChatCounter.value += 2;
      }
      if (stage.value === 4) {
        messages.value.push(texts.stage4.start);
        mobileChatCounter.value += 1;
      }
      if (stage.value === 6) {
        selectedRows.value = [];
        pushPopup(texts.stage6.start, messages.value);
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
          messages.value.push(texts.stage2.final);
          mobileChatCounter.value += 1;
          onNext();
        } else {
          errorCount.value += 1;
          messages.value.push(texts.stage2.error[`part${props.part}`]);
          mobileChatCounter.value += 1;
          setTimeout(() => {
            isCheckingInProgress.value = false;
            selectedRows.value = [];
          }, 1000);
        }
      }

      if (stage.value === 6) {
        if (
          selectedRows.value.length === correctRows2.length &&
          selectedRows.value.every((el) => correctRows2.includes(el))
        ) {
          isCheckingInProgress.value = false;
          messages.value.push(texts.stage6.final);
          mobileChatCounter.value += 1;
          onNext();
        } else {
          errorCount.value += 1;
          messages.value.push(texts.stage6.error[`part${props.part}`]);
          mobileChatCounter.value += 1;
          setTimeout(() => {
            isCheckingInProgress.value = false;
            selectedRows.value = [];
          }, 1000);
        }
      }

      if (stage.value === 7) {
        // if(props.part === 5) {
        //   setTimeout(() => {
        //     isModalActive.value = true;
        //   }, 2000);
        // }
      }
    };

    const checkPattern = (num) => {
      if (isCheckingInProgress.value) return;
      isCheckingInProgress.value = true;
      selectedPattern.value = num;
      if (num === correctPattern) {
        isCheckingInProgress.value = false;
        messages.value.push(texts.stage4.final);
        mobileChatCounter.value += 1;
        onNext();
      } else {
        errorCount.value += 1;
        messages.value.push(texts.stage4.error[`part${props.part}`]);
        mobileChatCounter.value += 1;
        setTimeout(() => {
          isCheckingInProgress.value = false;
        }, 1000);
      }
    };

    const closeAchieveModal = () => {
      isModalActive.value = false;
      onNext();
    };

    onMounted(() => {
      if (props.part > 1) onGameStart();
    })

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
      getRowsNumber,
      correctPattern,
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
