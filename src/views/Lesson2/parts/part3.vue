<template>
  <div :class="[
    $style.wrapper,
    stage < 2 ? $style.blur : '',
    zoom === 'all' ? $style.zoomAll : $style.zoomSingle
  ]" ref="wrapperRef">
    <!-- <img :class="$style.prof" src="../assets/prof.svg" alt="" /> -->
    <!--<v-speaker v-if="stage > 0" @toggle="toggleMobileChat" :counter="mobileChatCounter"/>-->
    <Speakers :speakersList="speakersList"></Speakers>
    <!--<v-btn v-if="true" sm :class="$style.btn" @click="testMessage">{{ nextBtnText }}</v-btn>-->
    <Cast/>
    <v-modal v-if="false" :isActive="isModalActive">
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
import { ref, reactive, computed, watch, onMounted } from 'vue';
import Vue from 'vue'
// import gsap from 'gsap';
// import Card from '../components/Card/Card.vue';
import { useStore } from '@/store';
import Speakers from '@/components/@ui/Speakers/default'
import useMobile from '@/hooks/useMobile';
import markFirstTask from '@/services/markFirstTask';
import Cast from '@/components/@ui/Cast/default'

export default {
  name: 'part3',
  components: {
    Speakers,
    Cast,
    // Card,
  },
  setup(props, ctx) {
    const { emit } = ctx
    const store = useStore();
    const isModalActive = ref(true);
    const stage = computed(() => {
      return store.state.stage
    })
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
    const appList = ref([])
    const speakersList = ref([
      {
        id: 0,
        img: require('@/assets/img/speakers/blue.png'),
        messages: [
        ]
      },
      {
        id: 1,
        img: require('@/assets/img/speakers/purple.png'),
        messages: []
      },
      {
        id: 2,
        img: require('@/assets/img/speakers/green.png'),
        messages: []
      },
      {
        id: 3,
        img: require('@/assets/img/speakers/petya.png'),
        messages: [
        ]
      }
    ])
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
    const testMessage = () => {
      //speaker.messages.$set(2,message)
      //Vue.set(speaker, '2', message)
      //console.log(speaker)
      //speaker.messages.push(message)
      onNext()
    }
    const isPaused = ref(false);
    // setTimeout(() => {
    //   messages.value.push(
    //     'На метеостанции, где мы находимся, для этого существуют специальные приборы.'
    //   )

    // }, 2500)

    const wrapperRef = ref(null);

    const scrollTo = (element, to, duration) => {
      if (duration <= 0) return;
      const difference = to - element.scrollLeft;
      const perTick = difference / duration * 10;

      setTimeout(function() {
        element.scrollLeft = element.scrollLeft + perTick;
        if (element.scrollLeft === to) return;
        scrollTo(element, to, duration - 10);
      }, 10);
    }
    const nextStage = () => {
      store.commit('changeStage', 'increase')
    };
    const onNext = (appliance) => {
      //if (stage.value === 2 & appliance !== 'precipitation') retur
      if (stage.value === 1) {
        let speaker = speakersList.value.find(el => el.id === 2)
        let message = {
          text: 'Мошенники распространяют вредоносные и нежелательные программы, например троянцы, эти вредоносные программы созданы для уничтожения, блокировки, модификации или кражи информации, нарушения работы устройств.',
          btn: false
        }
        //speaker.messages.$set(2,message)
        //Vue.set(speaker, '2', message)
        //console.log(speaker)
        speaker.messages.push(message)
        console.log(speaker)
      }
      if (appliance === 'precipitation' && stage.value !== 2) return
      if (appliance === 'home' && stage.value !== 8 && stage.value !== 11 ) return
      if (appliance === 'mill' && stage.value !== 5) return
      nextStage()
      mobileChatCounter.value += 1
      if (stage.value === 1) {
        mobileChatCounter.value = 0
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
        setTimeout(() => {
          scrollTo(wrapperRef.value, 100, 200)
          setTimeout(() => {
            scrollTo(wrapperRef.value, -100, 500)
          }, 350);
        }, 1000);
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
      if (stage.value === 1) return;
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
    console.log(stage)
    onMounted(() => {
      setTimeout(() => {
        nextStage()
      }, 1000)
      initAppsList()
    })
    const clearMessage = () => {
      speakersList.value.forEach((item) => {
        item.messages = []
      })
    }
    const changeAppLighting = (app, state) => {
      let targetApp = null
      appList.value.forEach((item) => {
        let findedEl = item.find((el) => el.app === app)
        if (findedEl) targetApp = findedEl
      })
      console.log(targetApp)
      targetApp.lighting = state
      return targetApp
    }
    const initAppsList = () => {
      const list = [
        [
          {
            app: 'AppBox',
            transition: 'open-app',
            position: 1,
            img: require('@/assets/img/phone/desktop/box.png'),
            lighting: false
          },
          {
            app: 'AppWallpaper',
            transition: 'open-app',
            position: 2,
            img: require('@/assets/img/phone/desktop/circle.png'),
            lighting: false
          },
          {
            app: 'AppPhoto',
            transition: 'open-app',
            position: 3,
            img: require('@/assets/img/phone/desktop/photo.png'),
            lighting: false
          }
        ],
        [],
        []
      ]
      appList.value = list
      store.commit('setAppList', list)
    }
    watch(() => store.state.stage, (current, old) => {
      console.log(current)
      if (current === 1) {
        let speaker = speakersList.value.find(el => el.id === 2)
        let message = {
          text: 'Мошенники распространяют вредоносные и нежелательные программы, например троянцы, эти вредоносные программы созданы для уничтожения, блокировки, модификации или кражи информации, нарушения работы устройств.',
          btn: false
        }
        speaker.messages.push(message)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Или скамерские приложения.задача таких программ — выманить у пользователя деньги.',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 1800)
      }
      if (current === 2) {
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Моя задача – обнаружить подобные программы среди всего множества приложений, улучшать  технологии защиты и, таким образом, не дать злоумышленникам обмануть людей, помочь обезопасить данные на смартфонах.',
            btn: false
          }
          speaker.messages.push(message)
        }, 1000)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Давайте посмотрим, что с твоим телефоном. У меня есть идея, что это может быть.',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 2500)
      }
      if (current === 3) {
        store.commit('changePhoneStatus', 'loading')
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Вероятно, во всем виновато вредоносное приложение.',
            btn: false
          }
          speaker.messages.push(message)
        }, 1000)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Давай посмотрим, какие разрешения есть для установленных приложений.',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 2500)
      }
      if (current === 4) {
        store.commit('changePhoneStatus', 'loaded')
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Давай откроем приложение',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 1000)
      }
      if (current === 5) {
        clearMessage()
        changeAppLighting('AppBox', true)
      }
      if (current === 6) {
        changeAppLighting('AppBox', false)
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Давай откроем настройки приложения',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 1000)
      }
      if (current === 7) {
        clearMessage()
      }
      if (current === 8) {
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 0)
          let message = {
            text: 'Это, обычные настройки',
            btn: false
          }
          speaker.messages.push(message)
        }, 1000)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Верно – это приложение имеет необходимые ему настройки',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 2500)
      }
      if (current === 9) {
        clearMessage()
        changeAppLighting('AppPhoto', true)
      }
      if (current === 10) {
        clearMessage()
        changeAppLighting('AppPhoto', false)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Давай откроем настройки приложения',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 1000)
      }
      if (current === 11) {
        clearMessage()
      }
      if (current === 12) {
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 0)
          let message = {
            text: 'Это, обычные настройки',
            btn: false
          }
          speaker.messages.push(message)
        }, 1000)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Верно – это приложение имеет необходимые ему настройки',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 2500)
      }
      if (current === 13) {
        clearMessage()
        changeAppLighting('AppWallpaper', true)
      }
      if (current === 14) {
        clearMessage()
        changeAppLighting('AppWallpaper', false)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Давай откроем настройки приложения',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 1000)
      }
      if (current === 15) {
        clearMessage()
      }
      if (current === 16) {
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 0)
          let message = {
            text: 'Тут что не так?',
            btn: false
          }
          speaker.messages.push(message)
        }, 1000)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Давай отключим эти доступы',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 2500)
      }
      if (current === 17) {
        clearMessage()
      }
      if (current === 18) {
        clearMessage()
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 0)
          let message = {
            text: 'Готово!',
            btn: false
          }
          speaker.messages.push(message)
        }, 1000)
        setTimeout(() => {
          let speaker = speakersList.value.find(el => el.id === 2)
          let message = {
            text: 'Отлично! Мы нашли его',
            btn: {
              availability: true,
              type: 'next',
              text: 'Продолжить'
            }
          }
          speaker.messages.push(message)
        }, 2500)
      }
      if (current === 19) {
        emit('nextLesson')
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
      onPaused,
      wrapperRef,
      speakersList,
      testMessage,
      nextStage,
      clearMessage,
      appList,
      initAppsList,
      changeAppLighting
    };
  },
};
</script>

<style lang="scss" module src="./part3.scss"></style>
