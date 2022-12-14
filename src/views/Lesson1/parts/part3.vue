<template>
  <div :class="[
    $style.wrapper,
    zoom === 'all' ? $style.zoomAll : $style.zoomSingle
  ]">
    <!-- <img :class="$style.stars" src="../assets/stars1.svg" alt="" /> -->
    <starts :class="$style.stars"/>
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
    <v-speaker @toggle="toggleMobileChat" :counter="mobileChatCounter"/>
    <v-btn v-if="showNextBtn" sm :class="$style.btn" @click="onNext">Хорошо</v-btn>
    <div :class="$style.appliances">
      <div v-if="zoom === 'all'" :class="$style.wrap">
        <div :class="[
          $style.precipitation,
          isShowPrecipitation['precipitation'] ? $style.lighting : ''
        ]">
          <img @click="onNext('precipitation')" src="../assets/precipitation.svg" alt="">
        </div>
        <div :class="[
          $style.home,
          isShowPrecipitation['home'] ? $style.lighting : ''
        ]">
          <img @click="onNext('home')" src="../assets/home.svg" alt="">
        </div>
        <div :class="[
          $style.mill,
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
        <component @successAnswer="successAnswer" @emitClick="successSingle" :lightingHome="lightingHome" :is="precipitationChoosed"></component>
      </div>
    </div>
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
          Погоду изучают метеорологи. Они анализируют погодные явления и прогнозируют их.
        </p>
        <!-- <p :class="$style.modalText">
          Давай научимся отличать источники, необходимые для прогноза, от тех, которые в прогнозе не
          требуются.
        </p> -->
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
import starts from '@/components/@ui/Stars'
import speaker from '@/components/@ui/Speaker/Speaker.vue'
import useMobile from '@/hooks/useMobile';
export default {
  name: 'part3',
  components: {
    Diary,
    home,
    precipitation,
    mill,
    starts,
    speaker
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
    const isMobileChatOpened = ref(true)
    const mobileChatCounter = ref(0);
    const lightingHome = ref('')
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
    const messages = ref([
      'Кликай на приборы, чтобы посмотреть на них поближе и зафиксировать их показания.',
    ]);

    const closeModal = () => {
      isModalActive.value = false;
    };

    const onNext = (appliance) => {
      if (stage.value === 2 & appliance !== 'precipitation') return
      if (appliance === 'precipitation' && stage.value !== 2) return
      if (appliance === 'home' && stage.value !== 8 && stage.value !== 11 ) return
      if (appliance === 'mill' && stage.value !== 5) return
      stage.value += 1;
      mobileChatCounter.value += 1
      if (stage.value == 2) { 
        showAppliance('precipitation')
        showNextBtn.value = false
        if (isMobile) {
          isMobileChatOpened.value = false
          mobileChatCounter.value = 0
        }
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
        showAppliance('mill')
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
        messages.value.push('Анемометр: помогает измерить скорость ветра в метрах в секунду (м/с).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательнее, показания снимаются со счётчика.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с анемометра.')
        }, 2000)
        hideAppliance('mill')
        showSigleAppliance('mill')
        changeZoom('single')
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
          lightingHome.value = 'termometr'
        }, 2000)
        hideAppliance('home')
        showSigleAppliance('home')
        changeZoom('single')
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
        
        messages.value.push('Гигрометр: измеряет влажность воздуха в процентах (%).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательно, куда указывает стрелка.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с гигрометра.')
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
        
        messages.value.push('Барометр: показывает атмосферное давление в миллиметрах ртутного столба (мм рт. ст.) или гектопаскалях (гПа).')
        setTimeout(() => {
          messages.value.push('Посмотри внимательно, куда указывает стрелка.')
        }, 1000)
        setTimeout(() => {
          messages.value.push('Нажми сюда, чтобы снять показания с барометра.')
          lightingHome.value = 'barometr'
        }, 2000)
      } 
      if (stage.value === 14) {
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
      console.log(appliance)
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
    const toggleMobileChat = () => {
      isMobileChatOpened.value = !isMobileChatOpened.value
      mobileChatCounter.value = 0
    }
    const successAnswer = (appliance) => {
      console.log('prop')
      console.log(appliance)
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
      lightingHome
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
