<template>
  <div :class="$style.wrapper">
    <div :class="$style.starsWrapper">
      <img :class="$style.stars" src="../assets/stars1.svg" alt="" />
    </div>
    <v-speaker
      v-if="stage > 1 || (stage === 1 && !isModalActive)"
      @toggle="toggleMobileChat"
      :counter="mobileChatCounter"
    />
    <v-popup-msg
      :items="messages"
      :isOpened="isMobileChatOpened"
      @toggle="toggleMobileChat"
      :class="$style.popupMsg"
    />
    <div :class="[$style.window, stage === 1 && $style.disabled]">
      <img :class="$style.controls" src="../assets/controls.svg" alt="" />
      <p :class="$style.title">Расчёт прогноза погоды</p>
      <div :class="$style.outer">
        <div :class="$style.inner">
          <div v-for="column in columnsData" :key="column.title" :class="$style.column">
            <div :class="$style.columnTitle">{{ column.title }}</div>
            <draggable
              :list="column.tasks"
              :animation="200"
              :ghost-class="$style.ghostCard"
              group="tasks"
              :class="$style.draggable"
              :scroll-sensitivity="200"
              :force-fallback="true"
            >
              <div v-for="task in column.tasks" :key="task.id" :class="$style.draggableInner">
                <p :class="$style.task">{{ task.title }}</p>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <v-btn
        v-if="stage === 1 && !isModalActive && (!isMobile || (isMobile && isMobileChatOpened))"
        sm
        :class="$style.btn"
        @click="onGameInit"
        >Хорошо</v-btn
      >
      <v-btn v-if="isCheckAvailable" sm :class="$style.btn" @click="checkCards">Проверить</v-btn>
      <v-btn v-if="stage === 3" sm :class="$style.btn" @click="$router.push('/')"
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
    <v-modal v-if="stage === 2" :isActive="isModalActive">
      <div :class="[$style.achieveModal, errorCount === 0 ? $style.gold : $style.silver]">
        <img
          :class="$style.achieve"
          :src="
            errorCount === 0
              ? '/assets/img/lesson6/achieveGold.png'
              : '/assets/img/lesson6/achieveSilver.png'
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
import { ref, reactive, computed, watch } from 'vue';
import draggable from 'vuedraggable';
import { useStore } from '@/store';
import useMobile from '@/hooks/useMobile';
import texts from './texts';

export default {
  name: 'part3',
  components: { draggable },
  setup() {
    const isModalActive = ref(true);
    const stage = ref(1);
    const errorCount = ref(0);
    const messages = ref([]);
    const isMobileChatOpened = ref(true);
    const mobileChatCounter = ref(0);
    const isCheckAvailable = ref(false);

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
      if (stage.value === 1) return;
      isMobileChatOpened.value = !isMobileChatOpened.value;
      mobileChatCounter.value = 0;
    };

    const onGameStart = () => {
      isModalActive.value = false;
      messages.value.push(texts.start[`level${level.value}`]);
    };

    const onGameInit = () => {
      isMobileChatOpened.value = false;
      onNext();
    };

    const closeAchieveModal = () => {
      isModalActive.value = false;
      onNext();
    };

    const columnsData = reactive([
      {
        title: 'Backlog',
        tasks: [
          {
            id: 1,
            title: texts.cards[0],
          },
          {
            id: 2,
            title: texts.cards[1],
          },
          {
            id: 3,
            title: texts.cards[2],
          },
          ...level.value !== '1' ? [
            {
              id: 4,
              title: texts.cards[3],
            },
            {
              id: 5,
              title: texts.cards[4],
            }
          ] : [],
        ],
      },
      {
        title: 'Этап №1',
        tasks: [],
      },
      {
        title: 'Этап №2',
        tasks: level.value === '1' ? [{
          id: 4,
          title: texts.cards[3],
        }] : [],
      },
      {
        title: 'Этап №3',
        tasks: [],
      },
      {
        title: 'Этап №4',
        tasks: level.value === '1' ? [{
          id: 5,
          title: texts.cards[4],
        }] : [],
      },
      {
        title: 'Этап №5',
        tasks: [],
      },
    ]);

    watch(columnsData, () => {
      isCheckAvailable.value = true;
    });

    const checkCards = () => {
      isCheckAvailable.value = false;
      if (
        columnsData[1].tasks[0] &&
        columnsData[1].tasks[0].id === 3 &&
        columnsData[2].tasks[0] &&
        columnsData[2].tasks[0].id === 4 &&
        columnsData[3].tasks[0] &&
        columnsData[3].tasks[0].id === 2 &&
        columnsData[4].tasks[0] &&
        columnsData[4].tasks[0].id === 5 &&
        columnsData[5].tasks[0] &&
        columnsData[5].tasks[0].id === 1
      ) {
        messages.value.push(texts.final[`level${level.value}`]);
        mobileChatCounter.value += 1;
        if (errorCount.value <= 1) {
          isModalActive.value = true;
        } else {
          onNext();
        }
      } else {
        messages.value.push(texts.wrong[`level${level.value}`]);
        mobileChatCounter.value += 1;
        errorCount.value += 1;
      }
    };

    return {
      isModalActive,
      onGameStart,
      stage,
      messages,
      onNext,
      texts,
      closeAchieveModal,
      errorCount,
      level,
      isMobileChatOpened,
      onGameInit,
      toggleMobileChat,
      isMobile,
      mobileChatCounter,
      columnsData,
      isCheckAvailable,
      checkCards,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
