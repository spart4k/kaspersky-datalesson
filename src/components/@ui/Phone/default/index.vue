<template>
  <!--<div :class="$style.phone">
    <div :class="$style.mainWrap">
      <img :class="$style.mirrorWrap" src="@/assets/img/phone/mainwrap.png" alt="">
    </div>
  </div>-->
  <div :class="$style.phone">
    <div :class="$style.phoneWrap">
      <img ref="mirrorWrap" :class="$style.mirrorWrap" src="@/assets/img/phone/mainwrap.png" alt="">
      <div ref="mainWrap" :class="$style.mainWrap">
        <div :class="$style.wrapShell">
          <!--<div :class="$style.shell"></div>-->
          <core :class="$style.shell"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Core from '../core'

export default {
  name: 'Phone-Default',
  components: {
    Core
  },
  props: {
  },
  setup(props) {
    const mirrorWrap = ref(null)
    const mainWrap = ref(null)
    const posMainWrap = ref({
      width: null,
      height: null,
      top: null,
      left: null
    })
    onMounted(() => {
      console.log(mirrorWrap.value.getBoundingClientRect())
      console.log(mirrorWrap.value.offsetWidth)
      //mirrorWrap.value.getBoundingClientRect()
      console.log(mainWrap.value)
    })
    return {
      mirrorWrap,
      mainWrap
    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
