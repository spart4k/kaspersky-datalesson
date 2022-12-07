<template>
  <div :class="$style.wrapper">
    <img :class="$style.stars" src="../assets/stars2.svg" alt="" />
    <img :class="$style.prof" src="../../../assets/img/leader.svg" alt="" />
    <img :class="[$style.basket, 'basket']" :src="isBasketEmpty ? '/assets/img/lesson3/basket-empty.png' : '/assets/img/lesson3/basket-full.png'" alt="" />
    <img v-if="isStackVisible" :class="$style.stack" src="../assets/stack.svg" alt="" />
    <div :class="$style.window">
      <img :class="$style.controls" src="../assets/controls.svg" alt="" />
      <p :class="$style.title">Папка: Данные для отправки в ЦОД</p>
      <div :class="$style.inner">
        <template v-for="index in 6">
          <div :key="index" :class="[$style.droparea, 'droppable', `drop${index}`]"></div>
        </template>
      </div>
    </div>
    <template v-for="index in 7">
      <Card :key="index" :data-num="index" :index="index" :class="[$style.card, 'draggable', 'disabled', `card${index}`]" />
    </template>
    <v-popup-msg :items="messages" :class="$style.popupMsg" />
    <transition name="fade">
      <v-btn v-if="stage === 1" sm :class="$style.btn" @click="enableGame">Хорошо</v-btn>
      <v-btn v-if="stage === 4" sm :class="$style.btn" @click="$router.push('/lesson4')">Продолжить</v-btn>
    </transition>
    <v-modal v-if="stage === 1" :isActive="isModalActive" :toggleActive="startGame">
      <div :class="$style.modalInner">
        <img :class="$style.modalImg" src="../../../assets/img/leader.svg" alt="" />
        <p :class="$style.modalText">{{texts.start}}</p>
        <v-btn lg @click="startGame">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="stage === 3" :isActive="isModalActive">
      <div :class="$style.achieveModal">
        <img :class="$style.achieve" :src="errorCount === 0 ? '/assets/img/lesson3/achieveGold.png' : '/assets/img/lesson3/achieveSilver.png'" alt="" />
        <p :class="[$style.modalTextAchieve, $style.modalTextBottom]">{{errorCount === 0 ? texts.achieveGold : texts.achieveSilver}}</p>
        <v-btn lg @click="closeAchieveModal">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import debounce from 'debounce'
import { isMobile } from 'mobile-device-detect';
import { pushPopup } from '@/utils/pushPopup';
import Card from '../components/Card/Card.vue';
import texts from './texts';

gsap.registerPlugin(Draggable)

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
    const isBasketEmpty = ref(true)
    const activeCard = ref(null)
    const isStackVisible = ref(true)

    const wrongCards = ['2'];

    const onNext = () => {
      stage.value += 1;
    };

    const endGame = () => {
      messages.value.push(texts.stage3)
      onNext()
      if (errorCount.value <= 1) {
        setTimeout(() => {
          isModalActive.value = true
        }, 1000);
      } else {
        setTimeout(() => {
          messages.value.push(texts.final)
          onNext()
        }, 1000);
      }
    }

    watch(rightAnswersCount, () => {
      const rightElements = document.querySelectorAll('.snapped:not(.wrong)')
      if (rightElements.length === 6) {
        isStackVisible.value = false
        endGame()
      }
    })

    const closeAchieveModal = () => {
      isModalActive.value = false;
      setTimeout(() => {
        messages.value.push(texts.final)
        onNext()
      }, 1000);
    };

    const startGame = () => {
      isModalActive.value = false;
      pushPopup(texts.stage1.level1, messages.value)
    }

    const enableGame = () => {
      document.querySelectorAll('.draggable').forEach(el => el.classList.remove('disabled'))
      onNext()
    };

    const moveCenter = (e, el) => {
      if (el.classList.contains('snapped')) return
      const position = el.getBoundingClientRect()
      gsap.to(el, {
        x: (e.pageX - position.left) - position.width / 2,
        y: (e.pageY - position.top) - position.height / 2,
        duration: 0.1,
      });
    }

    const onInit = () => {
      clientWidth.value = document.body.clientWidth
      clientHeight.value = document.body.clientHeight
      factor.value = 16 * clientWidth.value / 1280
    }

    const removeBlur = () => {
      document.documentElement.style.filter = 'unset'
    }

    const onResize = () => {
      onInit()
      const elements = document.querySelectorAll('.draggable')
      elements.forEach((el) => {
        el.style.left = `${clientWidth.value / 1.33}px`
        el.style.top = `${3.75 * factor.value}px`
        el.style.transform = 'rotate(-9deg) '
        return el
      })
      document.documentElement.style.filter = 'blur(15px)'
      document.querySelectorAll('.occupied').forEach(el => el.classList.remove('occupied'))
      document.querySelectorAll('.wrong').forEach(el => el.classList.remove('wrong'))
      document.querySelectorAll('.snapped').forEach(el => el.classList.remove('snapped'))
    }

    onMounted(() => {
      onInit()
      window.addEventListener('resize', onResize)
      window.addEventListener('resize', debounce(removeBlur, 500))
      const targets = document.querySelectorAll('.droppable');
      const overlapThreshold = '80%';

      Draggable.create('.draggable', {
        type: 'left,top',
        onDragStart(e) {
          let { target } = e;
          if (!target.classList.contains('draggable')) target = target.closest('.draggable');
          if (target.classList.contains('wrong')) target.classList.remove('wrong');
          if (target.classList.contains('snapped')) target.classList.remove('snapped');
          if (!isMobile) window.addEventListener('mousemove', moveCenter(e, target), { once: true })
          activeCard.value = target.dataset.num;

          gsap.to(target, {
            rotate: 0,
            duration: 0.2,
            scale: 0.75,
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
              target.classList.add('wrong')
              messages.value.push(texts.wrong.level1[`card${activeCard.value}`])
              errorCount.value += 1
            } else {
              gsap.to(target, {
                opacity: 0,
                duration: 0.5,
              });
              setTimeout(() => {
                target.remove()
              }, 500);
              isBasketEmpty.value = false
            }
            return
          }
          for (let i = 0; i < targets.length; i += 1) {
            if (this.hitTest(targets[i], overlapThreshold)) {
              if (!targets[i].classList.contains('occupied')) {
                const box = targets[i].getBoundingClientRect();
                targets[i].classList.add('occupied');

                gsap.to(target, {
                  x: 0,
                  y: 0,
                  left: box.left - factor.value * 1.9,
                  top: box.top - factor.value * 2,
                  duration: 0.1,
                });

                if (
                  target.targetAttachedTo !== targets[i] && target.targetAttachedTo !== undefined
                ) {
                  target.targetAttachedTo.classList.remove('occupied');
                  target.targetAttachedTo = undefined;
                }

                target.targetAttachedTo = targets[i];
                target.classList.add('snapped');
                targets[i].classList.remove('showOver');
                snapMade = true;
                if (wrongCards.includes(activeCard.value)) {
                  target.classList.add('wrong')
                  messages.value.push(texts.wrong.level1[`card${activeCard.value}`])
                  target.targetAttachedTo.classList.remove('occupied');
                  errorCount.value += 1
                } else {
                  messages.value.push(texts.right.level1)
                  rightAnswersCount.value += 1
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
              left: clientWidth.value / 1.33,
              top: 3.75 * factor.value,
              scale: 1,
              rotate: -9,
              duration: 0.3,
            });
          }
          activeCard.value = null
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
  border: 1px solid #91C0F8;
}

.disabled {
  pointer-events: none;
}

</style>
