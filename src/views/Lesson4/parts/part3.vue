<template>
  <div :class="[
    $style.wrapper
  ]">
    <v-progress :class="$style.progress"></v-progress>
    <timer v-show="level === '1'" :class="$style.timer" ref="timer"></timer>
    <map-default :level="level" ref="mapDefault" @checkPattern="checkPattern" :isPaused="isPaused" @changeCountValue="changeCountValue" @changeSquereValue="changeSquereValue" @firstClicked="firstClicked" :stage="stage" :squere="squere" @allChecked="allChecked"/>
    <calculation :seconds="calculationTimer" v-show="level === '2' || level === '3'"></calculation>
    <accuracy :procents="procentAll" v-show="level === '2' || level === '3'"></accuracy>
    <!-- <img v-if="stage >= 4" :class="$style.maplittle" src="../assets/maplittle.png" alt=""> -->
    <!-- <img :class="$style.prof" src="../assets/prof.svg" alt="" /> -->
    <v-speaker v-if="stage > 0" :class="$style.speaker" @toggle="toggleMobileChat" :counter="mobileChatCounter"/>
    <v-btn v-if="showNextBtn" sm :class="$style.btn" @click="onNext">Хорошо</v-btn>
    <v-btn v-if="stage === 5.5" sm :class="$style.btn" @click="handlePaused">Хорошо</v-btn>
    <v-btn v-if="showNextBtnLesson" sm :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
    <v-popup-msg :items="messages" :isOpened="isMobileChatOpened" @toggle="toggleMobileChat" :task="messages" :class="$style.popupMsg" />
    <!-- <transition name="fade">
      <v-btn v-if="stage === 1" sm :class="$style.btn" @click="onNext">Хорошо</v-btn>
      <v-btn
        v-if="stage === 2 && activeCards.length >= 4 && !isCheckingInProgress"
        sm
        :class="$style.btn"
        @click="checkCards"
        >Проверить</v-btn
      >
    </transition> -->
    <v-modal v-if="stage === 0" :isActive="isModalActive" :toggleActive="closeModal">
      <div :class="$style.modalInner">
        <img :class="$style.modalImg" src="../assets/prof.svg" alt="" />
        <p :class="$style.modalText">
          {{  level === '1' ? 'Прогнозы рассчитываются на мощных суперкомпьютерах. Они делают прогноз гораздо быстрее и точнее обычных компьютеров.' : level === '2' ? 'Для расчётов прогноза используются суперкомпьютеры – они гораздо мощнее обычных компьютеров и позволяют делать точный прогноз за считаные часы. Обычный компьютер справился бы с такими расчётами за неделю и не дал бы прогноз вовремя.' : level === '3' ? 'Расчёты метеорологической модели производит суперкомпьютер. Благодаря своей мощности он может делать точный прогноз всего за несколько часов.' : '' }}
        </p>
        <!-- <p v-if="level === '2'" :class="$style.modalText">
          Модель делит земной шар на много клеточек, образуя сетку. Чем меньше клеточка сетки, тем больше их понадобится. От этого прогноз будет точнее, но и считать его придётся дольше. Это очень похоже на разрешение экрана монитора – чем больше пикселей на экране, тем более чёткое изображение, но требуется больше ресурсов для его отображения.
        </p> -->
        <v-btn lg @click="onNext">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="(stage === 7 && level === '1') || (stage === 7 && level === '2') || (stage === 7 && level === '3')" :isActive="isModalActive">
      <div :class="[$style.modalInner, !errorCount && $style.modalGold, errorCount === 1 && $style.modalSilver]">
        <achieveGold v-if="(level === '1') || (level === '2' && !errorCount) || (level === '3' && !errorCount)" :class="$style.achieve"></achieveGold>
        <achieveSilver v-if="(level === '2' && errorCount === 1) || (level === '3' && errorCount === 1)" :class="$style.achieve"></achieveSilver>
        <!-- <img  :class="$style.achieve" src="../assets/achieve.svg" alt="" /> -->
        <!-- <img v-else :class="$style.achieve" src="../assets/achieve.svg" alt="" /> -->
        <p  v-if="!errorCount" :class="[$style.modalText, $style.modalTextBottom]">
          Отличная работа! Ты получаешь золотое достижение «Специалист по вычислительной математике»!<br>
Продолжай в том же духе!
        </p>
        <p  v-if="errorCount === 1" :class="[$style.modalText, $style.modalTextBottom]">
          Ты получаешь серебряное достижение «Специалист по вычислительной математике»! Чтобы получать золотые достижения, выполняй упражнения без ошибок.
        </p>
        <v-btn lg @click="onNext">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
// import gsap from 'gsap';
// import Card from '../components/Card/Card.vue';
import achieveGold from '../components/achieveGold'
import achieveSilver from '../components/achieveSilver'
import { useStore } from '@/store';
import mapDefault from '../components/map/default';
import home from '../components/home/index.vue';
import mill from '../components/mill/index.vue';
import precipitation from '../components/precipitation/index.vue'
import speaker from '@/components/@ui/Speaker/Speaker.vue'
import useMobile from '@/hooks/useMobile';
import timer from '../components/timer';
import calculation from '../components/calculation';
import accuracy from '../components/accuracy';
export default {
  name: 'part3',
  components: {
    // Diary,
    home,
    precipitation,
    mill,
    speaker,
    mapDefault,
    timer,
    calculation,
    accuracy,
    achieveGold,
    achieveSilver
    // Card,
  },
  setup() {
    const store = useStore();
    const isModalActive = ref(true);
    const stage = ref(0);
    const isCheckingInProgress = ref(false);
    const isSuccess = ref(false);
    const isAnimated = ref(false);
    const isMobileChatOpened = ref(true)
    const mobileChatCounter = ref(0);
    const showNextBtn = ref(false)
    const isMobile = useMobile();
    const squere = ref(4)
    const timer = ref(null)
    const mapDefault = ref(null)
    const level = computed(() => store.state.level);
    const calculationMap = ref(1800)
    const calculationOptions = ref(4500)
    const procentMap = ref(8*2)
    const procentOptions = ref(30)
    const showNextBtnLesson = ref(false)
    const errorCount = ref(0)
    const messages = ref([]);
    const closeModal = () => {
      isModalActive.value = false;
    };
    const isPaused = ref(true);
    
    const onNext = (appliance) => {
      // if (stage.value === 2 & appliance !== 'precipitation') return
      // if (appliance === 'precipitation' && stage.value !== 2) return
      // if (appliance === 'home' && stage.value !== 8 && stage.value !== 11 ) return
      // if (appliance === 'mill' && stage.value !== 5) return
      stage.value += 1;
      mobileChatCounter.value += 1
      if (stage.value == 1) {
        showNextBtn.value = false
        if (level.value === '1') {
          setTimeout(() => {
            messages.value.push(
              'Модель делит Землю на много клеточек. Чем больше будет клеточек, тем точнее будет прогноз. Как мозаика – чем больше деталей, тем чётче картинка.',
            )
          }, 1000)
          setTimeout(() => {
            messages.value.push(
              'Но нельзя просто так сделать сетку из огромного множества клеточек. Давайте попробуем провести такие расчёты и посмотрим почему.',
            )
          }, 2500)
          setTimeout(() => {
            messages.value.push(
              'Давай представим, что у тебя есть сетка из четырёх клеточек. Помоги компьютеру сделать погодные вычисления – нажми на каждую из клеточек.',
            )
            showNextBtn.value = true
          }, 4000)
        }
        if (level.value === '2') {
          showNextBtn.value = false
          setTimeout(() => {
            messages.value.push(
            'Модель делит земной шар на много клеточек, образуя сетку. Чем меньше клеточка сетки, тем больше их понадобится. От этого прогноз будет точнее, но и считать его придётся дольше. Это очень похоже на разрешение экрана монитора – чем больше пикселей на экране, тем более чёткое изображение, но требуется больше ресурсов для его отображения.',
            )
          }, 1000)
          setTimeout(() => {
            messages.value.push(
            'Если модель строит прогноз на большой территории, сторона одной клетки может быть 54 км, это крупная сетка. Её легче посчитать, чем сетку меньшего размера. Но для маленьких территорий такой сетки недостаточно. Клеточек со стороной, например, 27 км может не хватить на небольшой город. Давайте посмотрим, как это происходит…',
            )
          }, 2500)
          setTimeout(() => {
            messages.value.push(
            'Попробуй менять размер сетки на карте. Двигай ползунок и смотри, как меняется точность прогноза погоды и время расчёта метеорологической модели.',
            )
            showNextBtn.value = true
          }, 4000)
        }
        if (level.value === '3') {
          showNextBtn.value = false
          setTimeout(() => {
            messages.value.push(
            'Для сравнения – мощности обычного компьютера едва хватит, чтобы сделать такой же прогноз за неделю. Такой прогноз всегда будет опаздывать и не будет нужен.',
            )
          }, 1000)
          setTimeout(() => {
            messages.value.push(
            'Модель делит земной шар на ячейки равного размера. В итоге получается сетка. Далее рассчитываются значения параметров для каждой ячейки сетки.',
            )
          }, 2500)
          setTimeout(() => {
            messages.value.push(
            'При этом размер ячейки влияет как на точность, так и на скорость создания прогноза. Чем меньше ячейки, тем выше их плотность внутри сетки. Так прогноз погоды будет точнее, но и считать его придётся дольше. Это очень похоже на разрешение экрана монитора – чем больше пикселей на экране, тем более чёткое изображение, но требуется больше ресурсов для его отображения.',
            )
          }, 4000)
          setTimeout(() => {
            messages.value.push(
            'В этом и кроется одна из сложностей создания прогноза. Что лучше выбрать? Точность прогноза или скорость его получения? Выбрать свой вариант можно, настраивая модель. У меня как раз есть готовая симуляция, давайте посмотрим, как это происходит.',
            )
          }, 5500)
          setTimeout(() => {
            messages.value.push(
            'Попробуй менять размер ячеек сетки на карте. Двигай ползунок и смотри, как меняется точность прогноза погоды и время расчёта метеорологической модели.',
            )
            showNextBtn.value = true
          }, 7000)
        }
      }
      if (stage.value == 2) { 
        showNextBtn.value = false  
        if (level.value === '1') {
          setTimeout(()=>{
            // messages.value.push('Модель делит Землю на много клеточек. Чем больше будет клеточек, тем точнее будет прогноз. Как мозаика – чем больше деталей, тем чётче картинка.') 
          }, 500) 
        }
        
        if (isMobile) {
          isMobileChatOpened.value = false
          mobileChatCounter.value = 0
        }
      }
      if (stage.value === 3) {
        if (level.value === '1') {
          timer.value.stopInterval()
          messages.value.push('Отлично, у тебя все быстро получилось. Но давай посмотрим, насколько точным вышел этот прогноз.')
          showNextBtn.value = true
          // mobileChatCounter.value += 1
          // setTimeout(() => {
          //   messages.value.push('Граница дождя недостаточно точная.')
          // }, 2000)
          // setTimeout(() => {
          //   onNext()
          // }, 4000)
        } else if (level.value === '2' || level.value === '3') {
          if (squere.value === 324) {
            messages.value.push('А теперь давай в нашей модели учитывать дополнительные параметры. Обрати внимание на то, как меняются время и точность прогноза.')
            // mobileChatCounter.value += 1
          }
          onNext()
        }
        
      } 
      if (stage.value === 4) {
        if (level.value === '1') {
          showNextBtn.value = false
          setTimeout(() => {
            messages.value.push('Граница дождя недостаточно точная.')
          }, 1000)
          // setTimeout(() => {
          //   onNext()
          // }, 2000)
          setTimeout(() => {
            // onNext()
            messages.value.push('Давай посмотрим на другую сетку, теперь из 16 клеточек. Снова помоги компьютеру сделать вычисления. Нажми на каждую из клеточек.')
            // showNextBtn.value = true
            squere.value = 16
            let oldTimerValue = timer.value.timerValue
            let objCopy = Object.assign({}, oldTimerValue);
            timer.value.clearTimerValue()
            mapDefault.value.isShowDoubleMap = true
            mapDefault.value.timer.timerValue = objCopy
            mapDefault.value.clearFirstClicked()
          }, 2500)
          setTimeout(() => {
            showNextBtn.value = true
          }, 4000)
          // mobileChatCounter.value += 1
          
        }
        // if ()
      }
      if (stage.value === 5) {
        if (level.value === '1') {
          showNextBtn.value = false
          // messages.value.push('Кажется, на этот раз понадобилось гораздо больше времени. Давай посмотрим, помогло ли это с точностью прогноза.')
          // setTimeout(() => {
          //   messages.value.push('Да! Теперь мы выделили границу гораздо точнее.')
          // }, 2000)
        } else if (level.value === '2' || level.value === '3') {
          setTimeout(() => {
            messages.value.push('Отличный эксперимент! Двигай ползунок, подключай и отключай метеорологические параметры и следи, как меняются время и точность прогноза.')
          }, 500)
          setTimeout(() => {
            showNextBtn.value = false
            level.value === '2' ? messages.value.push('На основании своих наблюдений выбери из списка корректное утверждение.') : messages.value.push('На основании своих наблюдений выбери из списка 2 корректных утверждения.')
          }, 2000)
          
          // mobileChatCounter.value += 1
        }
      } 
      if (stage.value === 6) {
        if (level.value === '1') {
          showNextBtn.value = false
          if (level.value === '1') {
          showNextBtn.value = false
          setTimeout(() => {
            messages.value.push('Да! Теперь мы выделили границу гораздо точнее.')
            // mobileChatCounter.value += 1
          }, 2000)
          setTimeout(() => {
            messages.value.push('Отличный эксперимент! Теперь ты видишь, что, чем точнее мы хотим получить прогноз, тем дольше его придется считать.')
            // mobileChatCounter.value += 1
            // showNextBtn.value = false
            store.dispatch('updateProgress', [4, 2])
            store.dispatch('updateCurrentLesson', 5)
            setTimeout(() => {
              onNext()
            }, 2500);
          }, 3500)
          
        }
          timer.value.stopInterval()
          mobileChatCounter.value += 1
          // showNextBtn.value = true
        } else if (level.value === '2' || level.value === '3') {
          if (errorCount.value === 0) {
            store.dispatch('updateProgress', [4, 2])
          }
          if (errorCount.value === 1) {
            store.dispatch('updateProgress', [4, 1])
          }
          store.dispatch('updateCurrentLesson', 5)
          mobileChatCounter.value += 1
          messages.value.push('У тебя получилось! Теперь ты видишь, как связаны точность прогноза и время на его расчёт.')
          setTimeout(() => {
            onNext()
          }, 200)
          // isModalActive.value = true
          
        }
      } 
      if (stage.value === 7) {
        // messages.value.push('Да, это верные показания.')
        // hideSigleAppliance('home')
        // changeZoom('all')
        // let input = diaryComp.value.form.find((el) => el.title === "Температура" )
        // input.value = input.answer
        // showNextBtn.value = true
        if ((level.value === '2' || level.value === '3') && errorCount.value > 1 ) {
          isModalActive.value = false
          onNext()
        }
        isModalActive.value = true
      } 
      if (stage.value === 8) {
        isModalActive.value = false
        showNextBtnLesson.value = true
        showNextBtn.value = false
      } 
      if (stage.value === 9) {
        // messages.value.push('Анемометр: помогает измерить скорость ветра в метрах в секунду (м/с).')
        // setTimeout(() => {
        //   messages.value.push('Посмотри внимательнее, показания снимаются со счётчика.')
        // }, 1000)
        // setTimeout(() => {
        //   messages.value.push('Нажми сюда, чтобы снять показания с анемометра.')
        // }, 1000)
        // hideAppliance('mill')
        // showSigleAppliance('mill')
        // changeZoom('single')
        messages.value.push('Термометр: показывает температуру в градусах Цельсия (°С).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательно, где заканчивается ртутный столбик на приборе.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с метеорологического термометра.')
        }, 2000)
        hideAppliance('home')
        showSigleAppliance('home')
        changeZoom('single')
      } 
      if (stage.value === 10) {
        messages.value.push('Да, это верные показания.')
        hideSigleAppliance('mill')
        changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Скорость ветра" )
        input.value = input.answer
        showNextBtn.value = true
      } 
      if (stage.value === 11) {
        showNextBtn.value = false
      } 
      if (stage.value === 12) {
        messages.value.push('Гигрометр: измеряет влажность воздуха в процентах (%).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательно, куда указывает стрелка.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с гигрометра.')
        }, 2000)
        hideAppliance('home')
        showSigleAppliance('home')
        changeZoom('single')
      } 
      if (stage.value === 13) {
        messages.value.push('Да, это верные показания.')
        // hideSigleAppliance('vlaga')
        // changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Влажность" )
        input.value = input.answer
        showNextBtn.value = true
      } 
      if (stage.value === 14) {
        showNextBtn.value = false
        messages.value.push('Барометр: показывает атмосферное давление в миллиметрах ртутного столба (мм рт. ст.) или гектопаскалях (гПа).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательно, где заканчивается ртутный столбик на приборе.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с барометра.')
        }, 2000)
      } 
      if (stage.value === 15) {
        messages.value.push('Да, это верные показания.')
        hideSigleAppliance('home')
        changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Атм. давление" )
        input.value = input.answer
        showNextBtn.value = true
        isModalActive.value = true
      }
    };
    const toggleMobileChat = () => {
      isMobileChatOpened.value = !isMobileChatOpened.value
      mobileChatCounter.value = 0
    }
    const successAnswer = (appliance) => {
      if (appliance === 'precipitation' && stage.value === 3) {
        onNext()
      }
      if (appliance === 'temp' && stage.value === 9) {
        onNext()
      }
      if (appliance === 'veter' && stage.value === 6) {
        onNext()
      }
      if (appliance === 'vlaga' && stage.value === 12) {
        onNext()
      }
      if (appliance === 'davl' && stage.value === 14) {
        onNext()
      }
    }
    const allChecked = () => {
      if (stage.value === 5 && level.value === '1') {
        stage.value = 5.5
      } else {
        onNext()
      }
    }
    const firstClicked = () => {
      timer.value.startTimer()
    }
    const changeSquereValue = (param) => {
      squere.value = param
    }
    const changeCountValue = (val) => {
      val = val - 1
      calculationOptions.value = val * 900
      val = val + 1
      // if (val === 5) {
      //   calculationOptions.value = 4 * 900
      // } else {
      //   calculationOptions.value = val * 900
      // }
      // if (val === 10) {
      //   calculationOptions.value = val * 900
      // }
      procentOptions.value = val * 5
      if (calculationOptions.value === 8100 && stage.value === 4) {
        onNext()
      }
    }
    const calculationTimer = computed(() => {
      return calculationMap.value + calculationOptions.value
    })
    const procentAll = computed(() => {
      return procentMap.value + procentOptions.value
    })
    watch(squere, () => {
      let second = null
      let procent = null
      if (squere.value === 324 && stage.value === 2) {
        onNext()
      }
      switch (squere.value) {
        case 4:
          second = 1800 * 1
          break;
        case 9:
          second = 1800 * 2
          break;
        case 81:
          second = 1800 * 3
          break;
        case 324:
          second = 1800 * 4
          break;
        default:
          break;
      }
      switch (squere.value) {
        case 4:
          procent = 8 * 2
          break;
        case 9:
          procent = 8 * 3
          break;
        case 81:
          procent = 8 * 4
          break;
        case 324:
          procent = 8 * 5
          break;
        default:
          break;
      }
      procentMap.value = procent
      calculationMap.value = second
    })
    const checkPattern = (item) => {
      if (level.value === '2') {
        if (item !== 1) {
          errorCount.value++
          if (errorCount.value === 1) {
            messages.value.push('Нет, это не так. Вспомни, как менялось время расчёта прогноза при добавлении параметров и уменьшении сетки.')
          }
          if (errorCount.value === 2) {
            messages.value.push('Чем больше параметров и мельче сетка, тем точнее будет прогноз, но времени на его расчёт требуется больше. Найди утверждение, обратное этому.')
          }
          if (errorCount.value > 2) return
        } else {
          onNext()
        }
      }
      if (level.value === '3') {
        if (item.includes(0) && item.includes(3)) {
          onNext()
        } if (item.includes(0) || item.includes(3)) {
          return
        } else if (item.includes) {
          errorCount.value++
          if (errorCount.value === 1) {
            messages.value.push('Это не совсем верно. Вспомни, как менялось время расчёта прогноза при добавлении параметров и уменьшении сетки.')
          }
          if (errorCount.value === 2) {
            messages.value.push('Чем больше параметров и мельче сетка в нашей модели, тем точнее прогноз, но времени на его расчёт требуется больше. Отметишь верные утверждения?')
          }
          if (errorCount.value > 2) return
        }
      }
      
    }

    const handlePaused = () => {
      stage.value = 5;
      isPaused.value = false;
      onNext()
    }

    watch(stage, () => {
      if (stage.value === 5.5) {
        timer.value.stopInterval();
        messages.value.push('Кажется, на этот раз понадобилось гораздо больше времени. Давай посмотрим, помогло ли это с точностью прогноза.')
      } 
    })

    return {
      isModalActive,
      closeModal,
      stage,
      messages,
      onNext,
      // activeCards,
      // onCardClick,
      // checkCards,
      isCheckingInProgress,
      isSuccess,
      isAnimated,
      showNextBtn,
      toggleMobileChat,
      isMobileChatOpened,
      mobileChatCounter,
      isMobile,
      allChecked,
      squere,
      timer,
      firstClicked,
      mapDefault,
      changeSquereValue,
      level,
      calculationTimer,
      calculationMap,
      changeCountValue,
      procentMap,
      procentAll,
      procentOptions,
      checkPattern,
      errorCount,
      showNextBtnLesson,
      isPaused,
      handlePaused,
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
