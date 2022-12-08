<template>
  <div :class="[
    $style.wrapper,
    zoom === 'all' ? $style.zoomAll : $style.zoomSingle
  ]">
    <img :class="$style.stars" src="../assets/stars1.svg" alt="" />
    <Diary ref="diaryComp" :stage="stage"/>
    <img :class="$style.prof" src="../assets/prof.svg" alt="" />
    <v-btn v-if="showNextBtn" sm :class="$style.btn" @click="onNext">Хорошо</v-btn>
    <div :class="$style.appliances">
      <div v-if="zoom === 'all'" :class="$style.wrap">
        <div :class="[
          $style.precipitation,
          isShowPrecipitation['precipitation'] ? $style.lighting : ''
        ]">
          <img @click="onNext('precipitation')" src="../assets/precipitation.svg" alt="">
        </div>
        <div :class="$style.home">
          <img @click="onNext('home')" src="../assets/home.svg" alt="">
        </div>
        <div :class="$style.mill">
          <img @click="onNext('mill')" src="../assets/mill.svg" alt="">
        </div>
      </div>
    </div>
    <div v-if="precipitationChoosed" :class="[
      $style.wrapSingle,
      $style[precipitationChoosed]
    ]">
      <div :class="$style.wrap">
        <!-- <img :src="require(`../assets/${precipitationChoosed}Single.svg`)" alt=""> -->
        <component @successAnswer="successAnswer" @emitClick="successSingle" :is="precipitationChoosed"></component>
        <!-- <div 
        :class="[
          $style.hitBox,
          $style[precipitationChoosed]
        ]"
        @click="clickAnswer"
        ></div>  -->
      </div>
    </div>
    <v-popup-msg :items="messages" :task="messages" :class="$style.popupMsg" />
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
          Центр обработки данных, сокращённо – ЦОД. Туда поступают данные с множества источников из
          разных точек планеты.
        </p>
        <p :class="$style.modalText">
          Давай научимся отличать источники, необходимые для прогноза, от тех, которые в прогнозе не
          требуются.
        </p>
        <v-btn lg @click="closeModal">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="stage === 15" :isActive="isModalActive">
      <div :class="$style.modalInner">
        <img :class="$style.achieve" src="../assets/achieve.svg" alt="" />
        <p :class="[$style.modalText, $style.modalTextBottom]">
          Отличная работа! Ты получаешь золотое достижение «Метеоролог»!<br /> Продолжай в том же духе!
        </p>
        <v-btn lg @click="$router.push('/lesson2')">Продолжить</v-btn>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
// import gsap from 'gsap';
// import Card from '../components/Card/Card.vue';
import Diary from '../components/Diary/index.vue';
import home from '../components/home/index.vue';
import mill from '../components/mill/index.vue';
import precipitation from '../components/precipitation/index.vue'

export default {
  name: 'part3',
  components: {
    Diary,
    home,
    precipitation,
    mill
    // Card,
  },
  setup() {
    const isModalActive = ref(true);
    const stage = ref(1);
    const isCheckingInProgress = ref(false);
    const isSuccess = ref(false);
    const isAnimated = ref(false);
    const diaryComp = ref(null)
    const zoom = ref('all')
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
    const precipitationChoosed = ref('')
    const messages = ref([
      'Кликай на приборы, чтобы посмотреть на них поближе и зафиксировать их показания.',
    ]);

    const closeModal = () => {
      isModalActive.value = false;
    };

    const onNext = (appliance) => {
      if (stage.value === 2 & appliance !== 'precipitation') return
      if (appliance === 'precipitation' && stage.value !== 2) return
      if (appliance === 'home' && stage.value !== 5 && stage.value !== 11 ) return
      if (appliance === 'mill' && stage.value !== 8) return
      stage.value += 1;
      console.log(stage.value)
      if (stage.value == 2) { 
        showAppliance('precipitation') 
        showNextBtn.value = false
      }
      if (stage.value === 3) {
        console.log(3)
        messages.value.push('Прибор для измерения количества выпавших осадков. Осадки измеряются в миллиметрах (мм).')
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с осадкомера.')
        }, 1000)
        hideAppliance('precipitation')
        showSigleAppliance('precipitation')
        changeZoom('single')
      } 
      if (stage.value === 4) {
        console.log(4)
        messages.value.push('Да, это верные показания.')
        let input = diaryComp.value.form.find((el) => el.title === "Кол-во осадков" )
        input.value = input.answer
        hideSigleAppliance('precipitation')
        changeZoom('all')
        showNextBtn.value = true
      }
      if (stage.value === 5) {
        // console.log(5)
        // messages.value.push('Да, это верные показания.')
        // let input = diaryComp.value.form.find((el) => el.title === "Температура" )
        // input.value = input.answer
        // hideSigleAppliance('precipitation')
        // changeZoom('all')
        showNextBtn.value = false
      } 
      if (stage.value === 6) {
        // console.log(5)
        // messages.value.push('Да, это верные показания.')
        // let input = diaryComp.value.form.find((el) => el.title === "Температура" )
        // input.value = input.answer
        // hideSigleAppliance('precipitation')
        // changeZoom('all')
        // showNextBtn.value = false
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
      } if (stage.value === 7) {
        messages.value.push('Да, это верные показания.')
        hideSigleAppliance('home')
        changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Температура" )
        input.value = input.answer
        showNextBtn.value = true
      } if (stage.value === 8) {
        showNextBtn.value = false
      } if (stage.value === 9) {
        messages.value.push('Анемометр: помогает измерить скорость ветра в метрах в секунду (м/с).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательнее, показания снимаются со счётчика.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с анемометра.')
        }, 1000)
        hideAppliance('mill')
        showSigleAppliance('mill')
        changeZoom('single')
      } if (stage.value === 10) {
        messages.value.push('Да, это верные показания.')
        hideSigleAppliance('mill')
        changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Скорость ветра" )
        input.value = input.answer
        showNextBtn.value = true
      } if (stage.value === 11) {
        showNextBtn.value = false
      } if (stage.value === 12) {
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
      } if (stage.value === 13) {
        messages.value.push('Да, это верные показания.')
        // hideSigleAppliance('vlaga')
        // changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Влажность" )
        input.value = input.answer
        showNextBtn.value = true
      } if (stage.value === 14) {
        showNextBtn.value = false
        messages.value.push('Барометр: показывает атмосферное давление в миллиметрах ртутного столба (мм рт. ст.) или гектопаскалях (гПа).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательно, где заканчивается ртутный столбик на приборе.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с барометра.')
        }, 2000)
      } if (stage.value === 15) {
        messages.value.push('Да, это верные показания.')
        hideSigleAppliance('home')
        changeZoom('all')
        let input = diaryComp.value.form.find((el) => el.title === "Атм. давление" )
        input.value = input.answer
        showNextBtn.value = true
        isModalActive.value = true
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
      console.log(isShowPrecipitation)
      isShowPrecipitation[appliance] = true
    }
    const hideAppliance = (appliance) => {
      isShowPrecipitation[appliance] = false
    }
    const clickAnswer = () => {
      onNext()
    }
    const successSingle = () => {
      console.log('log')
    }
    const successAnswer = (appliance) => {
      console.log('prop')
      console.log(appliance)
      if (appliance === 'precipitation' && stage.value === 3) {
        onNext()
      }
      if (appliance === 'temp' && stage.value === 6) {
        onNext()
      }
      if (appliance === 'veter' && stage.value === 9) {
        onNext()
      }
      if (appliance === 'vlaga' && stage.value === 12) {
        onNext()
      }
      if (appliance === 'davl' && stage.value === 14) {
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
      successAnswer
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
