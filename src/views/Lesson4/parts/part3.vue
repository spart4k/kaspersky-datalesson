<template>
  <div :class="[
    $style.wrapper
  ]">
    <starts :class="$style.stars"/>
    <timer ref="timer"></timer>
    <map-default ref="mapDefault" @firstClicked="firstClicked" :stage="stage" :squere="squere" @allChecked="allChecked"/>
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
          Прогнозы рассчитываются на мощных суперкомпьютерах. Они делают прогноз гораздо быстрее и точнее обычных компьютеров.
        </p>
        <!-- <p :class="$style.modalText">
          Давай научимся отличать источники, необходимые для прогноза, от тех, которые в прогнозе не
          требуются.
        </p> -->
        <v-btn lg @click="closeModal">Начать</v-btn>
      </div>
    </v-modal>
    <v-modal v-if="stage === 7" :isActive="isModalActive">
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
import { ref, reactive } from 'vue';
// import gsap from 'gsap';
// import Card from '../components/Card/Card.vue';
import mapDefault from '../components/map/default';
import home from '../components/home/index.vue';
import mill from '../components/mill/index.vue';
import precipitation from '../components/precipitation/index.vue'
import starts from '@/components/@ui/Stars'
import speaker from '@/components/@ui/Speaker/Speaker.vue'
import useMobile from '@/hooks/useMobile';
import timer from '../components/timer'
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
    timer
    // Card,
  },
  setup() {
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
    const messages = ref([
      'Прогнозы рассчитываются на мощных суперкомпьютерах. Они делают прогноз гораздо быстрее и точнее обычных компьютеров.',
    ]);

    const closeModal = () => {
      isModalActive.value = false;
    };

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
        timer.value.stopInterval()
        messages.value.push('Отлично, у тебя все быстро получилось. Но давай посмотрим, насколько точным вышел этот прогноз.')
        setTimeout(() => {
          messages.value.push('Граница дождя недостаточно точная.')
        }, 1500)
        setTimeout(() => {
          onNext()
        }, 2500)
      } 
      if (stage.value === 4) {
        messages.value.push('Давай посмотрим на другую сетку, теперь из 16 клеточек. Снова помоги компьютеру сделать вычисления. Нажми на каждую из клеточек.')
        squere.value = 16
        showNextBtn.value = true
        timer.value.clearTimerValue()
        mapDefault.value.clearFirstClicked()
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
        messages.value.push('Отличный эксперимент! Теперь ты видишь, что, чем точнее мы хотим получить прогноз, тем дольше его придется считать.')
        timer.value.stopInterval()
        showNextBtn.value = true
      } 
      if (stage.value === 7) {
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
      mapDefault
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
