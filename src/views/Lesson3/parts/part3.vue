<template>
  <div :class="$style.wrapper">
    <img :class="$style.stars" src="../assets/stars2.svg" alt="" />
    <img :class="$style.prof" src="../../../assets/img/leader.svg" alt="" />
    <img :class="[$style.basket, 'basket']" src="../assets/basket.png" alt="" />
    <img :class="$style.stack" src="../assets/stack.svg" alt="" />
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
      <Card :key="index" :index="index" :class="[$style.card, 'draggable', `card${index}`]" />
    </template>
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
        <img :class="$style.modalImg" src="../../../assets/img/leader.svg" alt="" />
        <p :class="$style.modalText">
          Найди данные, которые не подойдут для расчета погоды. Например, данные из ненужных
          источников. Или данные, в которых ошиблись приборы.
        </p>
        <v-btn lg @click="closeModal">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="stage === 3" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <!-- <img :class="$style.achieve" src="../assets/achieve.svg" alt="" /> -->
        <p :class="[$style.modalText, $style.modalTextBottom]">
          Отличная работа! Ты получаешь золотое достижение «Инженер данных»!<br />
          Продолжай в том же духе!
        </p>
        <v-btn lg @click="$router.push('/lesson4')">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import Card from '../components/Card/Card.vue';

gsap.registerPlugin(Draggable)

export default {
  name: 'part3',
  components: {
    Card,
  },
  setup() {
    const isModalActive = ref(false);
    const stage = ref(1);
    // const errorCount = ref(0);
    const messages = ref([
      'Перетащи в окно программы подходящие данные, а в корзину – ненужные для прогноза.',
    ]);
    const factor = ref(null);

    // const wrongCards = ['card2'];

    const closeModal = () => {
      isModalActive.value = false;
    };

    const checkCards = () => {};

    const onNext = () => {
      stage.value += 1;
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

    const onResize = () => {
      const { clientWidth } = document.body
      factor.value = 16 * clientWidth / 1280
    }

    const onRemove = () => {
      console.log('remove');
    }

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize)
      const targets = document.querySelectorAll('.droppable');
      const overlapThreshold = '80%';

      const position = document.querySelectorAll('.draggable')[0].getBoundingClientRect();
      const draggableCoordinates = {
        left: position.left, top: position.top, bottom: position.bottom, right: position.right,
      }

      Draggable.create('.draggable', {
        type: 'left,top',
        onDragStart(e) {
          let { target } = e;
          if (!target.classList.contains('draggable')) target = target.closest('.draggable');
          if (target.classList.contains('wrong')) target.classList.remove('wrong');
          window.addEventListener('mousemove', moveCenter(e, target))
          window.removeEventListener('mousemove', moveCenter(e, target))

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
          // const basket = document.querySelector('.basket');
          // if (this.hitTest(basket)) {
          //   gsap.to(target, {
          //     opacity: 0,
          //     duration: 0.2,
          //   });
          // }
          for (let i = 0; i < targets.length; i += 1) {
            if (this.hitTest(targets[i], overlapThreshold)) {
              if (!targets[i].classList.contains('occupied')) {
                const box = targets[i].getBoundingClientRect();
                targets[i].classList.add('occupied');

                gsap.to(target, {
                  x: 0,
                  y: 0,
                  left: box.left - factor.value * 2,
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
                if (target.classList.contains('card2')) {
                  target.classList.add('wrong')
                  messages.value.push('Если бы это была Луна, а не Марс, это ещё могло бы иметь значение. А Марс – слишком далеко от нас.')
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
              left: draggableCoordinates.left,
              top: draggableCoordinates.top,
              scale: 1,
              rotate: -9,
              duration: 0.3,
            });
          }
        },
      });
    });

    return {
      isModalActive,
      closeModal,
      stage,
      messages,
      onNext,
      checkCards,
      onRemove,
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
  border: 3px solid red !important;
  color: red !important;
  animation-name: wrongAnimation;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

</style>
