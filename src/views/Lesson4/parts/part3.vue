<template>
  <div :class="[
    $style.wrapper
  ]">
    <starts :class="$style.stars"/>
    <timer v-show="level === '1'" ref="timer"></timer>
    <map-default :level="level" ref="mapDefault" @checkPattern="checkPattern" @changeCountValue="changeCountValue" @changeSquereValue="changeSquereValue" @firstClicked="firstClicked" :stage="stage" :squere="squere" @allChecked="allChecked"/>
    <calculation :seconds="calculationTimer" v-show="level === '2' || level === '3'"></calculation>
    <accuracy :procents="procentAll" v-show="level === '2' || level === '3'"></accuracy>
    <!-- <img v-if="stage >= 4" :class="$style.maplittle" src="../assets/maplittle.png" alt=""> -->
    <!-- <img :class="$style.prof" src="../assets/prof.svg" alt="" /> -->
    <v-speaker @toggle="toggleMobileChat" :counter="mobileChatCounter"/>
    <v-btn v-if="showNextBtn" sm :class="$style.btn" @click="onNext">Хорошо</v-btn>
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
    <v-modal v-if="stage === 1" :isActive="isModalActive" :toggleActive="closeModal">
      <div :class="$style.modalInner">
        <img src="../assets/prof.svg" alt="" />
        <p :class="$style.modalText">
          Для расчётов прогноза используются суперкомпьютеры – они гораздо мощнее обычных компьютеров и позволяют делать точный прогноз за считаные часы. Обычный компьютер справился бы с такими расчётами за неделю и не дал бы прогноз вовремя.
        </p>
        <!-- <p v-if="level === '2'" :class="$style.modalText">
          Модель делит земной шар на много клеточек, образуя сетку. Чем меньше клеточка сетки, тем больше их понадобится. От этого прогноз будет точнее, но и считать его придётся дольше. Это очень похоже на разрешение экрана монитора – чем больше пикселей на экране, тем более чёткое изображение, но требуется больше ресурсов для его отображения.
        </p> -->
        <v-btn lg @click="closeModal">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="(stage === 7 && level === '1') || (stage === 6 && level === '2') || (stage === 6 && level === '3')" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <img :class="$style.achieve" src="../assets/achieve.svg" alt="" />
        <p :class="[$style.modalText, $style.modalTextBottom]">
          Отличная работа! Ты получаешь золотое достижение «Специалист по вычислительной математике»!<br>
Продолжай в том же духе!
        </p>
        <v-btn lg @click="$router.push('/lesson5')">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
// import gsap from 'gsap';
// import Card from '../components/Card/Card.vue';
import { useStore } from '@/store';
import mapDefault from '../components/map/default';
import home from '../components/home/index.vue';
import mill from '../components/mill/index.vue';
import precipitation from '../components/precipitation/index.vue'
import starts from '@/components/@ui/Stars'
import speaker from '@/components/@ui/Speaker/Speaker.vue'
import useMobile from '@/hooks/useMobile';
import timer from '../components/timer'
import calculation from '../components/calculation'
import accuracy from '../components/accuracy'
export default {
  name: 'part3',
  components: {
    // Diary,
    home,
    precipitation,
    mill,
    starts,
    speaker,
    mapDefault,
    timer,
    calculation,
    accuracy
    // Card,
  },
  setup() {
    const store = useStore();
    const isModalActive = ref(true);
    const stage = ref(1);
    const isCheckingInProgress = ref(false);
    const isSuccess = ref(false);
    const isAnimated = ref(false);
    const isMobileChatOpened = ref(true)
    const mobileChatCounter = ref(0);
    const showNextBtn = ref(true)
    const isMobile = useMobile();
    const squere = ref(4)
    const timer = ref(null)
    const mapDefault = ref(null)
    const level = computed(() => store.state.level);
    const calculationMap = ref(1800)
    const calculationOptions = ref(4500)
    const procentMap = ref(8)
    const procentOptions = ref(30)
    console.log(level.value)
    const messages = ref([]);
    const closeModal = () => {
      isModalActive.value = false;
    };
    if (level.value === '1') {
      messages.value.push(
        'Прогнозы рассчитываются на мощных суперкомпьютерах. Они делают прогноз гораздо быстрее и точнее обычных компьютеров.',
      )
    }
    if (level.value === '2' || level.value === '3') {
      messages.value.push(
      'Попробуй перемещать ползунок, наблюдай, как меняется сетка на карте, точность и время расчета прогноза.',
      )
    }
    const onNext = (appliance) => {
      // if (stage.value === 2 & appliance !== 'precipitation') return
      // if (appliance === 'precipitation' && stage.value !== 2) return
      // if (appliance === 'home' && stage.value !== 8 && stage.value !== 11 ) return
      // if (appliance === 'mill' && stage.value !== 5) return
      stage.value += 1;
      mobileChatCounter.value += 1
      if (stage.value == 2) { 
        showNextBtn.value = false    
        if (isMobile) {
          isMobileChatOpened.value = false
          mobileChatCounter.value = 0
        }
      }
      if (stage.value === 3) {
        console.log('3 step')
        if (level.value === '1') {
          timer.value.stopInterval()
          messages.value.push('Отлично, у тебя все быстро получилось. Но давай посмотрим, насколько точным вышел этот прогноз.')
          setTimeout(() => {
            messages.value.push('Граница дождя недостаточно точная.')
          }, 1500)
          setTimeout(() => {
            onNext()
          }, 2500)
        } else if (level.value === '2' || level.value === '3') {
          if (squere.value === 324) {
            messages.value.push('А теперь давай в нашей модели учитывать дополнительные параметры. Обрати внимание на то, как меняются время и точность прогноза.')
          }
          onNext()
        }
        
      } 
      if (stage.value === 4) {
        if (level.value === '1') {
          messages.value.push('Давай посмотрим на другую сетку, теперь из 16 клеточек. Снова помоги компьютеру сделать вычисления. Нажми на каждую из клеточек.')
          squere.value = 16
          showNextBtn.value = true
          timer.value.clearTimerValue()
          mapDefault.value.clearFirstClicked()
        }
        // if ()
      }
      if (stage.value === 5) {
        if (level.value === '1') {
          showNextBtn.value = false
        } else if (level.value === '2' || level.value === '3') {
          console.log('NEXT STEP 5+')
          messages.value.push('На основании своих наблюдений выбери из списка корректное утверждение.')
          showNextBtn.value = false
        }
      } 
      if (stage.value === 6) {
        if (level.value === '1') {
          messages.value.push('Отличный эксперимент! Теперь ты видишь, что, чем точнее мы хотим получить прогноз, тем дольше его придется считать.')
          timer.value.stopInterval()
          showNextBtn.value = true
        } else if (level.value === '2' || level.value === '3') {
          messages.value.push('У тебя получилось! Теперь ты видишь, как связаны точность прогноза и время на его расчёт.')
          isModalActive.value = true
        }
      } 
      if (stage.value === 7) {
        console.log('STEP 7')
        // messages.value.push('Да, это верные показания.')
        // hideSigleAppliance('home')
        // changeZoom('all')
        // let input = diaryComp.value.form.find((el) => el.title === "Температура" )
        // input.value = input.answer
        // showNextBtn.value = true
        isModalActive.value = true
      } 
      if (stage.value === 8) {
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
      onNext()
    }
    const firstClicked = () => {
      timer.value.startTimer()
    }
    const changeSquereValue = (param) => {
      console.log(param)
      squere.value = param
    }
    const changeCountValue = (val) => {
      console.log('main', val)
      calculationOptions.value = val * 900
      console.log(val * 900)
      console.log(calculationOptions.value )
      procentOptions.value = val * 5
      console.log(calculationOptions.value, stage.value)
      if (calculationOptions.value === 9000 && stage.value === 4) {
        console.log('ON NEXT')
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
        console.log('NEXT STEP')
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
      console.log(procentMap.value)
      calculationMap.value = second
      console.log(calculationMap.value)
      console.log(calculationTimer.value)
    })
    const checkPattern = (item) => {
      console.log(item)
      if (item !== 1) {
        messages.value.push('Нет, это не так. Вспомни, как менялось время расчёта прогноза при добавлении параметров и уменьшении сетки.')
        setTimeout(() => {
          messages.value.push('Чем больше параметров и мельче сетка, тем точнее будет прогноз, но времени на его расчёт требуется больше. Найди утверждение, обратное этому.')
        }, 1500)
      } else {
        onNext()
      }
    }
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
      checkPattern
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
