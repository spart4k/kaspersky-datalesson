<template>
  <div :class="[
    $style.wrapper,
    stage < 2 ? $style.blur : '',
    zoom === 'all' ? $style.zoomAll : $style.zoomSingle
  ]">
    <v-progress :class="$style.progress"></v-progress>
    <Diary ref="diaryComp" :stage="stage"/>
    <div v-if="zoom === 'all'" :class="$style.paginations">
      <div :class="$style.button">
        <svg :class="[ $style.arrow, $style.left ]" width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 20L2 11L11 2" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>  
      </div>
      <div :class="$style.button">
        <svg :class="[ $style.arrow, $style.right ]" width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L11 11L2 20" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>  
      </div>      
    </div>
    <!-- <img :class="$style.prof" src="../assets/prof.svg" alt="" /> -->
    <v-speaker v-if="stage > 0" @toggle="toggleMobileChat" :counter="mobileChatCounter"/>
    <v-btn v-if="showNextBtn" sm :class="$style.btn" @click="onNext">{{ nextBtnText }}</v-btn>
    <v-btn v-if="isPaused" sm :class="$style.btn" @click="onPaused">Хорошо</v-btn>
    <v-btn v-if="showNextLessonBtn" sm :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
    <div :class="[
      $style.appliances,
    ]">
      <div v-if="zoom === 'all'" :class="$style.wrap">
        <div :class="[
          $style.precipitation,
          stage < 2 ? $style.blur : '',
          isShowPrecipitation['precipitation'] ? $style.lighting : ''
        ]">
          <img @click="onNext('precipitation')" src="../assets/precipitation.svg" alt="">
        </div>
        <div :class="[
          $style.home,
          stage < 2 ? $style.blur : '',
          isShowPrecipitation['home'] ? $style.lighting : ''
        ]">
          <img @click="onNext('home')" src="../assets/home.svg" alt="">
        </div>
        <div :class="[
          $style.mill,
          stage < 2 ? $style.blur : '',
          isShowPrecipitation['mill'] ? $style.lighting : ''
        ]">
          <img @click="onNext('mill')" src="../assets/mill.svg" alt="">
        </div>
      </div>
    </div>
    <div v-if="precipitationChoosed" :class="[
      $style.wrapSingle,
      $style[precipitationChoosed]
    ]">
      <div :class="$style.wrap">
        <component @successAnswer="successAnswer" @addMessage="addMessage" @emitClick="successSingle" :lightingHome="lightingHome" :is="precipitationChoosed" :isPaused="isPaused"></component>
      </div>
    </div>
    <v-popup-msg :items="messages" :isOpened="isMobileChatOpened" @toggle="toggleMobileChat" :task="messages" :class="$style.popupMsg" :shift="8" />
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
        <img :class="$style.imgModal" src="../assets/prof.svg" alt="" />
        <p :class="$style.modalText">
          {{  level === '1' ? 'Погоду изучают метеорологи. Они анализируют погодные явления и прогнозируют их.' : level === '2' ? 'Погоду изучают метеорологи. Они исследуют строение и свойства земной атмосферы и процессы, происходящие в ней.' : level === '3' ? 'Изучением погодных явлений занимаются метеорологи. Они исследуют строение и свойства атмосферы Земли, а также физические и химические процессы, происходящие в ней.' : '' }}
        </p>
        <!-- <p :class="$style.modalText">
          Давай научимся отличать источники, необходимые для прогноза, от тех, которые в прогнозе не
          требуются.
        </p> -->
        <v-btn lg @click="closeModal">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="stage === 14" :isActive="isModalActive">
      <div :class="[$style.modalInner, $style.modalAchieve]">
        <img :class="$style.achieve" src="../assets/achieve.png" alt="" />
        <p :class="[$style.modalText, $style.modalTextBottom]">
          Отличная работа! Ты получаешь золотое достижение «Метеоролог»!<br /> Продолжай в том же духе!
        </p>
        <v-btn lg @click="closeModal">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
// import gsap from 'gsap';
// import Card from '../components/Card/Card.vue';
import { useStore } from '@/store';
import Diary from '../components/Diary/index.vue';
import home from '../components/home/index.vue';
import mill from '../components/mill/index.vue';
import precipitation from '../components/precipitation/index.vue'
import speaker from '@/components/@ui/Speaker/Speaker.vue'
import useMobile from '@/hooks/useMobile';
import markFirstTask from '@/services/markFirstTask';
export default {
  name: 'part3',
  components: {
    Diary,
    home,
    precipitation,
    mill,
    speaker
    // Card,
  },
  setup() {
    const store = useStore();
    const isModalActive = ref(true);
    const stage = ref(0);
    const isCheckingInProgress = ref(false);
    const isSuccess = ref(false);
    const isAnimated = ref(false);
    const diaryComp = ref(null)
    const zoom = ref('all')
    const nextBtnText = ref('Хорошо')
    const isMobileChatOpened = ref(true)
    const mobileChatCounter = ref(0);
    const level = computed(() => store.state.level);
    const lightingHome = ref('')
    const showNextLessonBtn = ref(false)
    const isShowPrecipitation = reactive({
      precipitation: false,
      home: false,
      mill: false
    })
    const showNextBtn = ref(true)
    const isShowPrecipitationSigle = reactive({
      precipitation: false,
      home: false,
      mill: false
    })
    const isMobile = useMobile();
    const precipitationChoosed = ref('')
    const messages = ref([]);
    showNextBtn.value = false
    const closeModal = () => {
      isModalActive.value = false;
      onNext()
    };
    const isPaused = ref(false);
    // setTimeout(() => {
    //   messages.value.push(
    //     'На метеостанции, где мы находимся, для этого существуют специальные приборы.'
    //   )
      
    // }, 2500)
    const onNext = (appliance) => {
      if (stage.value === 2 & appliance !== 'precipitation') return
      if (appliance === 'precipitation' && stage.value !== 2) return
      if (appliance === 'home' && stage.value !== 8 && stage.value !== 11 ) return
      if (appliance === 'mill' && stage.value !== 5) return
      stage.value += 1;
      mobileChatCounter.value += 1
      if (stage.value === 1) {
        setTimeout(() => {
          if (level.value === '1') {
            messages.value.push(
              'Чтобы создать прогноз, метеорологи измеряют температуру воздуха, количество осадков и много других погодных параметров.'
            )
          }
          if (level.value === '2') {
            messages.value.push(
              'Чтобы прогнозировать погоду, метеорологи измеряют температуру воздуха, количество осадков, скорость ветра и другие метеорологические параметры.'
            )
          } 
          if (level.value === '3') {
            messages.value.push(
              'Чтобы создать прогноз погоды, метеорологи собирают текущие данные о температуре воздуха, количестве осадков, атмосферном давлении, скорости ветра, а также берут во внимание и многие другие параметры.'
            )
          } 
        }, 1000)
      setTimeout(() => {
        messages.value.push(
          'На метеостанции, где мы находимся, для этого существуют специальные приборы. '
        )
        if (level.value === '1') nextBtnText.value = 'Понятно'
        showNextBtn.value = true
      }, 2500)
      }
      if (stage.value == 2) { 
        showAppliance('precipitation')
        if (level.value === '1') {
          messages.value.push(
            'Посмотри на подсвеченный прибор слева. Нажми на него.'
          )
        } 
        showNextBtn.value = false
        if (isMobile) {
          isMobileChatOpened.value = false
          mobileChatCounter.value = 0
        }
      }
      if (stage.value === 3) {
        if (level.value === '1') messages.value.push('Осадкомер: Прибор для измерения количества выпавших осадков. Осадки измеряются в миллиметрах (мм).')
        if (level.value === '2') messages.value.push('Осадкомер: Прибор для сбора и измерения количества выпавших осадков. Осадки собираются в специальное металлическое ведро и переливаются в измерительный стеклянный стакан для определения их точного количества. Единицей измерения количества атмосферных осадков является миллиметр (мм).')
        if (level.value === '3') messages.value.push('Осадкомер: Прибор для сбора и измерения количества выпавших осадков. Осадки собираются в специальное металлическое ведро и переливаются в измерительный стеклянный стакан для определения их точного количества. Единицей измерения количества атмосферных осадков является миллиметр (мм).')
        hideAppliance('precipitation')
        showSigleAppliance('precipitation')
        changeZoom('single')
        isPaused.value = true
      } 
      if (stage.value === 4) {
        messages.value.push('Да, это верные показания.')
        let input = diaryComp.value.form.find((el) => el.title === "Кол-во осадков" )
        input.value = input.answer
        hideSigleAppliance('precipitation')
        changeZoom('all')
        showNextBtn.value = true
      }
      if (stage.value === 5) {
        // messages.value.push('Да, это верные показания.')
        // let input = diaryComp.value.form.find((el) => el.title === "Температура" )
        // input.value = input.answer
        // hideSigleAppliance('precipitation')
        // changeZoom('all')
        showAppliance('mill')
        if (level.value === '1') {
          messages.value.push(
            'Посмотри на подсвеченный прибор справа. Кликни на него.'
          )
        } 
        showNextBtn.value = false
      } 
      if (stage.value === 6) {
        // messages.value.push('Термометр: показывает температуру в градусах Цельсия (°С).')
        // setTimeout(() => {
        //   messages.value.push('Посмотри внимательно, где заканчивается ртутный столбик на приборе.')
        // }, 1000)
        // setTimeout(() => {
        //   messages.value.push('Нажми сюда, чтобы снять показания с метеорологического термометра.')
        // }, 2000)
        // hideAppliance('home')
        // showSigleAppliance('home')
        // changeZoom('single')
        if (level.value === '1') messages.value.push('Анемометр: помогает измерить скорость ветра в метрах в секунду (м/с).')
        if (level.value === '2') messages.value.push('Анемометр: Прибор для определения скорости ветра. Сперва подсчитывается число оборотов чашек анемометра в минуту, затем по специальной таблице рассчитывается скорость ветра. Единицей измерения скорости ветра являются метры в секунду (м/с).')
        if (level.value === '3') messages.value.push('Анемометр: Прибор для определения скорости ветра. Сперва подсчитывается число оборотов чашек анемометра в минуту, затем по специальной таблице рассчитывается скорость ветра. Единицей измерения скорости ветра являются метры в секунду (м/с).')
        // messages.value.push('Анемометр: помогает измерить скорость ветра в метрах в секунду (м/с).')
        // setTimeout(() => {
        //   messages.value.push('Посмотри внимательнее, показания снимаются со счётчика.')
        // }, 1000)
        hideAppliance('mill')
        showSigleAppliance('mill')
        changeZoom('single')
        isPaused.value = true
      } 
      if (stage.value === 7) {
        messages.value.push('Да, это верные показания.')
        hideSigleAppliance('home')
        changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Скорость ветра" )
        input.value = input.answer
        showNextBtn.value = true
      } 
      if (stage.value === 8) {
        showNextBtn.value = false
        showAppliance('home')
        if (level.value === '1') {
          messages.value.push(
            'Посмотри на подсвеченное жёлтым сооружение в центре. Это метеобудка. Нажми на неё.'
          )
        } 
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
        if (level.value === '1') messages.value.push('Термометр: показывает температуру в градусах Цельсия (°С).')
        if (level.value === '2') messages.value.push('Термометр: Прибор для измерения температуры воздуха. Единицей измерения температуры является градус Цельсия (°С).')
        if (level.value === '3') messages.value.push('Термометр: Прибор для измерения температуры воздуха. Единицей измерения температуры является градус Цельсия (°С).')
        
        // setTimeout(() => {
        //   messages.value.push('Посмотри внимательно, где заканчивается ртутный столбик на приборе.')
        // }, 1000)
        hideAppliance('home')
        showSigleAppliance('home')
        changeZoom('single')
        isPaused.value = true
      } 
      if (stage.value === 10) {
        messages.value.push('Да, это верные показания.')
        lightingHome.value = ''
        // hideSigleAppliance('mill')
        // changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Температура" )
        input.value = input.answer
        showNextBtn.value = true
      } 
      // if (stage.value === 11) {
      //   showNextBtn.value = false
      // } 
      if (stage.value === 11) {
        if (level.value === '1') messages.value.push('Гигрометр: измеряет влажность воздуха в процентах (%).')
        if (level.value === '2') messages.value.push('Гигрометр: Прибор для измерения относительной влажности воздуха. Единицей измерения относительной влажности воздуха является процент (%).')
        if (level.value === '3') messages.value.push('Гигрометр: Прибор для измерения относительной влажности воздуха. Единицей измерения относительной влажности воздуха является процент (%).')
        // setTimeout(() => {
        //   messages.value.push('Посмотри внимательно, куда указывает стрелка.')
        // }, 1000)
        setTimeout(() => {
          messages.value.push('Гигрометр находится в центре. Где на приборе отображается его значение? Кликни на это место, чтобы снять показания.')
          lightingHome.value = 'girometr'
        }, 2000)
        hideAppliance('home')
        showSigleAppliance('home')
        changeZoom('single')
        showNextBtn.value = false
      } 
      if (stage.value === 12) {
        lightingHome.value = ''
        messages.value.push('Да, это верные показания.')
        // hideSigleAppliance('vlaga')
        // changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Влажность" )
        input.value = input.answer
        showNextBtn.value = true
      } 
      if (stage.value === 13) {
        showNextBtn.value = false
        if (level.value === '1') messages.value.push('Барометр: показывает атмосферное давление в миллиметрах ртутного столба (мм рт. ст.) или гектопаскалях (гПа).')
        if (level.value === '2') messages.value.push('Барометр: Прибор для измерения атмосферного давления. Официальной единицей измерения атмосферного давления является гектопаскаль (гПа), но в жизни мы привыкли использовать миллиметры ртутного столба (мм рт. ст.). ')
        if (level.value === '3') messages.value.push('Барометр: Прибор для измерения атмосферного давления. Официальной единицей измерения атмосферного давления является гектопаскаль (гПа), но в жизни мы привыкли использовать миллиметры ртутного столба (мм рт. ст.). ')
        // setTimeout(() => {
        //   messages.value.push('Посмотри внимательно, куда указывает стрелка.')
        // }, 1000)
        setTimeout(() => {
          messages.value.push('Барометр находится справа. Где на приборе отображается его значение? Нажми туда.')
          lightingHome.value = 'barometr'
        }, 2500)
      } 
      if (stage.value === 14) {
        messages.value.push('Да, это верные показания.')
        hideSigleAppliance('home')
        changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Атм. давление" )
        input.value = input.answer
        // showNextBtn.value = true
        
        setTimeout(() => {
          messages.value.push('Отличная работа! Мы записали всё, что нужно. ')
        }, 1000)
        setTimeout(() => {
          // messages.value.push('Отличная работа! Мы записали всё, что нужно. ')
          store.dispatch('updateProgress', [1, 2])
          store.dispatch('updateCurrentLesson', 2)
          markFirstTask()
          isModalActive.value = true
        }, 2500)
      }
      if (stage.value === 15) {
        showNextLessonBtn.value = true
      }
    };
    const changeZoom = (state) => {
      zoom.value = state
    }
    const showSigleAppliance = (appliance) => {
      isShowPrecipitationSigle[appliance] = true
      precipitationChoosed.value = appliance
    }
    const hideSigleAppliance = (appliance) => {
      isShowPrecipitationSigle[appliance] = false
      precipitationChoosed.value = ''
    }
    const showAppliance = (appliance) => {
      isShowPrecipitation[appliance] = true
    }
    const hideAppliance = (appliance) => {
      isShowPrecipitation[appliance] = false
    }
    const clickAnswer = () => {
      onNext()
    }
    const successSingle = () => {
    }
    const toggleMobileChat = () => {
      isMobileChatOpened.value = !isMobileChatOpened.value
      mobileChatCounter.value = 0
    }
    const addMessage = (text) => {
      messages.value.push(text)
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
      if (appliance === 'vlaga' && stage.value === 11) {
        onNext()
      }
      if (appliance === 'davl' && stage.value === 13) {
        onNext()
      }
    }

    const onPaused = () => {
      if (stage.value === 3) {
        isPaused.value = false;
        messages.value.push('Посмотри на осадкомер. Нажми на уровень воды в ёмкости, чтобы занести показания в дневник погоды.')
      }
      if (stage.value === 6) {
        isPaused.value = false;
        messages.value.push('Посмотри на анемометр. Где на приборе отображается его значение? Нажми на него, чтобы занести показания в дневник погоды.')
      }
      if (stage.value === 9) {
        isPaused.value = false;
        messages.value.push('Термометр находится слева. Нажми на значение температуры на нём.')
        lightingHome.value = 'termometr'
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
      isShowPrecipitation,
      precipitationChoosed,
      isShowPrecipitationSigle,
      hideSigleAppliance,
      showSigleAppliance,
      showAppliance,
      hideAppliance,
      zoom,
      changeZoom,
      clickAnswer,
      diaryComp,
      showNextBtn,
      successSingle,
      successAnswer,
      toggleMobileChat,
      isMobileChatOpened,
      mobileChatCounter,
      isMobile,
      lightingHome,
      addMessage,
      showNextLessonBtn,
      level,
      nextBtnText,
      isPaused,
      onPaused
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
