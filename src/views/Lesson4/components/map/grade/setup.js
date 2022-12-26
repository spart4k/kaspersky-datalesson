import { ref, onMounted, watch, toRefs, computed } from 'vue';
export default {
  name: 'map-grade',
  props: {
    level: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const selectedPattern = ref(null);
    const selectedPatternArray = ref([])
    const cards = ref([])
    
    const checkPattern = (num) => {
      // if (isCheckingInProgress.value) return;
      // isCheckingInProgress.value = true;
      if (props.level === '2' || props.level === '3') {
        if (num !== 1) {
          setTimeout(() =>{
            selectedPattern.value = null
          }, 1000)
        }
      }
      if (props.level === '3') {
        if (!selectedPatternArray.value.includes(num) && (num === 0 || num === 3) ) {
          selectedPatternArray.value.push(num)
          selectedPattern.value = null
        } else {
          selectedPattern.value = num;
        }
        emit('check', selectedPatternArray.value)
      } else {
        selectedPattern.value = num;
        emit('check', selectedPattern.value)
      }
      
      
      // if (num === 1) {
      //   // isCheckingInProgress.value = false;
      //   // messages.value.push(texts.stage4.final[`level${level.value}`]);
      //   // mobileChatCounter.value += 1;
      //   // onNext();
      // } else {
      //   // errorCount.value += 1;
      //   // task2ErrorsCount.value += 1;
      //   // if (task2ErrorsCount.value === 1) {
      //   //   messages.value.push(texts.stage4.error1[`level${level.value}`]);
      //   //   mobileChatCounter.value += 1;
      //   // }
      //   // if (task2ErrorsCount.value === 2) {
      //   //   messages.value.push(texts.stage4.error2[`level${level.value}`]);
      //   //   mobileChatCounter.value += 1;
      //   // }
      // }
    };
    onMounted(() => {
      if (props.level == '2') {
        cards.value.push({
          label: 'Чем больше параметров и мельче сетка, тем менее точным будет прогноз и тем дольше он будет просчитываться.',
          checked: true,
          right: false
        })
        cards.value.push({
          label: 'Чем меньше параметров и крупнее сетка, тем менее точным будет прогноз, но и рассчитываться он будет быстрее.',
          checked: true,
          right: true
        })
        cards.value.push({
          label: 'Чем больше параметров и мельче сетка, тем более точным будет прогноз и тем быстрее он будет считаться.',
          checked: true,
          right: false
        })
      } else if (props.level == '3') {
        cards.value.push({
          label: 'Чем выше детализация, тем прогноз точнее, но увеличивается время на его расчёт. ',
          checked: true,
          right: false
        })
        cards.value.push({
          label: 'Чем выше детализация, тем прогноз менее точный, так как требуется больше ресурсов.',
          checked: true,
          right: true
        })
        cards.value.push({
          label: 'Меньшая детализация позволяет производить меньше расчётов, что ускоряет прогнозирование и увеличивает точность прогноза.',
          checked: true,
          right: false
        })
        cards.value.push({
          label: 'Меньшая детализация позволяет производить меньше расчётов, что ускоряет прогнозирование, но при этом уменьшает точность прогноза.',
          checked: true,
          right: false
        })
      }
    })
    const applyOptions = () => {
      
    }
    const closePanel = () => {
      emit('closePanel')
    }
    return {
      cards,
      selectedPattern,
      checkPattern,
      selectedPatternArray,
      applyOptions,
      closePanel
    }
  },
}
