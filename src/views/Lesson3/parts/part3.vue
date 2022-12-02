<template>
  <div :class="$style.wrapper">
    <div :class="$style.starsWrapper">
      <img :class="$style.stars" src="../assets/stars2.svg" alt="" />
    </div>
    <img :class="$style.prof" src="../../../assets/img/leader.svg" alt="" />
    <img
      :class="[$style.basket, 'basket']"
      :src="
        isBasketEmpty
          ? '/assets/img/lesson3/basket-empty.png'
          : '/assets/img/lesson3/basket-full.png'
      "
      alt=""
    />
    <img
      :class="[$style.stack, isStackVisible && !isChatFullLength && $style.visible]"
      src="../assets/stack.svg"
      alt=""
    />
    <div :class="$style.window">
      <img :class="$style.controls" src="../assets/controls.svg" alt="" />
      <p :class="$style.title">Папка: Данные для отправки в ЦОД</p>
      <div :class="$style.inner">
        <template v-for="index in 6">
          <div :key="index" :class="[$style.droparea, 'droppable', `drop${index}`]"></div>
        </template>
      </div>
    </div>
    <template v-for="index in level === '1' ? 6 : level === '2' ? 12 : 16">
      <Card
        :key="index"
        :data-num="index"
        :index="index"
        :class="[$style.card, stage > 1 && $style.visible, 'draggable', `card${index}`]"
      />
    </template>
    <v-popup-msg :items="messages" :class="[$style.popupMsg, isChatFullLength && $style.full]" />
    <transition name="fade">
      <v-btn
        v-if="stage === 1 && messages.length >= texts.stage1[`level${level}`].length"
        sm
        :class="$style.btn"
        @click="enableGame"
        >Хорошо</v-btn
      >
      <v-btn v-if="stage === 4" sm :class="$style.btn" @click="$router.push('/lesson4')"
        >Продолжить</v-btn
      >
    </transition>
    <v-modal v-if="stage === 1" :isActive="isModalActive" :toggleActive="startGame">
      <div :class="$style.modalInner">
        <img :class="$style.modalImg" src="../../../assets/img/leader.svg" alt="" />
        <p :class="$style.modalText">{{ texts.start }}</p>
        <v-btn lg @click="startGame">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="stage === 3" :isActive="isModalActive">
      <div :class="$style.achieveModal">
        <img
          :class="$style.achieve"
          :src="
            errorCount === 0
              ? '/assets/img/lesson3/achieveGold.png'
              : '/assets/img/lesson3/achieveSilver.png'
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
import { ref, onMounted, watch, computed } from 'vue';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
// import debounce from 'debounce'
import { isMobile } from 'mobile-device-detect';
import Card from '../components/Card/Card.vue';
import { pushPopup } from '@/utils/pushPopup';
import texts from './texts';
import { useStore } from '@/store';

gsap.registerPlugin(Draggable);

export default {
  name: 'part3',
  components: {
    Card,
  },
  setup() {
    const isModalActive = ref(true);
    const stage = ref(1);
    const errorCount = ref(0);
    const rightAnswersCount = ref(0);
    const messages = ref([]);
    const factor = ref(null);
    const clientWidth = ref(null);
    const clientHeight = ref(null);
    const isBasketEmpty = ref(true);
    const activeCard = ref(null);
    const isStackVisible = ref(true);
    const isChatFullLength = ref(true);

    const store = useStore();
    const level = computed(() => store.state.level);

    let wrongCards;
    switch (level.value) {
      case '1':
        wrongCards = ['2', '4'];
        break;
      case '2':
        wrongCards = ['2', '3', '5', '7', '10', '11'];
        break;
      case '3':
        wrongCards = [];
        break;
      default:
        break;
    }

    const onNext = () => {
      stage.value += 1;
    };

    const endGame = () => {
      messages.value.push(texts.stage3[`level${level.value}`]);
      onNext();
      if (errorCount.value <= 1) {
        setTimeout(() => {
          isModalActive.value = true;
        }, 1000);
      } else {
        setTimeout(() => {
          pushPopup(texts.final[`level${level.value}`], messages.value);
          onNext();
        }, 1000);
      }
    };

    watch(rightAnswersCount, () => {
      const rightElements = document.querySelectorAll('.snapped:not(.wrong)');
      if ((level.value === '1' && rightElements.length === 4) || rightElements.length === 6) {
        isStackVisible.value = false;
        isChatFullLength.value = true;
        endGame();
      }
    });

    const closeAchieveModal = () => {
      isModalActive.value = false;
      setTimeout(() => {
        pushPopup(texts.final[`level${level.value}`], messages.value);
        onNext();
      }, 1000);
    };

    const startGame = () => {
      isModalActive.value = false;
      pushPopup(texts.stage1[`level${level.value}`], messages.value);
    };

    const enableGame = () => {
      isChatFullLength.value = false;
      onNext();
    };

    const moveCenter = (e, el) => {
      if (el.classList.contains('snapped')) return;
      const position = el.getBoundingClientRect();
      gsap.to(el, {
        x: e.pageX - position.left - position.width / 2,
        y: e.pageY - position.top - position.height / 2,
        duration: 0.1,
      });
    };

    const onInit = () => {
      clientWidth.value = document.body.clientWidth;
      clientHeight.value = document.body.clientHeight;
      factor.value = (16 * clientWidth.value) / 1280;
    };

    // const removeBlur = () => {
    //   document.documentElement.style.filter = 'unset'
    // }

    const onResize = () => {
      const elements = document.querySelectorAll('.draggable');
      if (stage.value === 4 || (stage.value === 3 && isModalActive.value)) {
        elements.forEach((el) => el.remove());
      } else {
        elements.forEach((el) => {
          el.style.left = `${clientWidth.value / 1.23}px`;
          el.style.top = `${1.5625 * factor.value}px`;
          el.style.transform = 'rotate(-9deg) ';
          return el;
        });
      }
      onInit();
      // document.documentElement.style.filter = 'blur(15px)'
      document.querySelectorAll('.occupied').forEach((el) => el.classList.remove('occupied'));
      document.querySelectorAll('.wrong').forEach((el) => el.classList.remove('wrong'));
      document.querySelectorAll('.snapped').forEach((el) => el.classList.remove('snapped'));
    };

    onMounted(() => {
      //temp
      // startGame()
      // enableGame()

      onInit();
      window.addEventListener('resize', onResize);
      // window.addEventListener('resize', debounce(removeBlur, 500))
      const targets = document.querySelectorAll('.droppable');
      const overlapThreshold = '80%';

      Draggable.create('.draggable', {
        type: 'left,top',
        onDragStart(e) {
          let { target } = e;
          if (!target.classList.contains('draggable')) target = target.closest('.draggable');
          if (target.classList.contains('wrong')) target.classList.remove('wrong');
          if (target.classList.contains('snapped')) target.classList.remove('snapped');
          if (!isMobile)
            window.addEventListener('mousemove', moveCenter(e, target), { once: true });
          activeCard.value = target.dataset.num;

          gsap.to(target, {
            rotate: 0,
            duration: 0.2,
          });
        },

        onDrag() {
          for (let i = 0; i < targets.length; i += 1) {
            if (this.hitTest(targets[i], overlapThreshold)) {
              targets[i].classList.add('showOver');
            } else {
              targets[i].classList.remove('showOver');
            }
          }
        },

        onDragEnd(e) {
          let snapMade = false;
          let { target } = e;
          if (!target.classList.contains('draggable')) target = target.closest('.draggable');
          const basket = document.querySelector('.basket');
          if (this.hitTest(basket)) {
            if (!wrongCards.includes(activeCard.value)) {
              target.classList.add('wrong');
              messages.value.push(texts.wrong[`level${level.value}`][`card${activeCard.value}`]);
              errorCount.value += 1;
            } else {
              gsap.to(target, {
                opacity: 0,
                duration: 0.1,
              });
              messages.value.push(texts.right[`level${level.value}`]);
              setTimeout(() => {
                target.remove();
              }, 500);
              isBasketEmpty.value = false;
            }
            return;
          }
          for (let i = 0; i < targets.length; i += 1) {
            if (this.hitTest(targets[i], overlapThreshold)) {
              if (!targets[i].classList.contains('occupied')) {
                const box = targets[i].getBoundingClientRect();
                targets[i].classList.add('occupied');

                gsap.to(target, {
                  x: 0,
                  y: 0,
                  left: box.left,
                  top: box.top,
                  duration: 0.1,
                });

                if (
                  target.targetAttachedTo !== targets[i] &&
                  target.targetAttachedTo !== undefined
                ) {
                  target.targetAttachedTo.classList.remove('occupied');
                  target.targetAttachedTo = undefined;
                }

                target.targetAttachedTo = targets[i];
                target.classList.add('snapped');
                targets[i].classList.remove('showOver');
                snapMade = true;
                if (wrongCards.includes(activeCard.value)) {
                  target.classList.add('wrong');
                  messages.value.push(
                    texts.wrong[`level${level.value}`][`card${activeCard.value}`]
                  );
                  target.targetAttachedTo.classList.remove('occupied');
                  errorCount.value += 1;
                } else {
                  messages.value.push(texts.right[`level${level.value}`]);
                  rightAnswersCount.value += 1;
                }
              }
            }
          }

          if (!snapMade) {
            if (target && target.targetAttachedTo !== undefined) {
              target.classList.remove('snapped');
              target.targetAttachedTo.classList.remove('occupied');
            }
            gsap.to(target, {
              x: 0,
              y: 0,
              left: clientWidth.value / 1.23,
              top: 1.5625 * factor.value,
              rotate: -9,
              duration: 0.3,
            });
          }
          activeCard.value = null;
        },
      });
    });

    return {
      isModalActive,
      startGame,
      closeAchieveModal,
      stage,
      messages,
      onNext,
      isBasketEmpty,
      enableGame,
      errorCount,
      texts,
      isStackVisible,
      isChatFullLength,
      level,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>

<style lang="scss">
.showOver {
  background-color: #eee;
}

.wrong {
  border: 2px solid red !important;
  color: red !important;
  animation-name: wrongAnimation;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.snapped {
  border: 1px solid #91c0f8;
}
</style>
