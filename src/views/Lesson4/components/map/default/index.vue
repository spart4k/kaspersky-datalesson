<template>
  <div :class="[
    $style.mainWrap,
    $props.level !== '1' ? $style.highLevel : ''
  ]">
    <div :class="[
      $style.wrap,
      $props.stage >= 5 && $props.level !== '1' ? $style.small : '',
    ]">
      <div :class="[
        $style.map,
        $props.stage !== 2 && $props.stage !== 3 && $props.stage !== 5 && $props.level === '1' ? $style.disabled : ''
      ]">
        <div :class="$style.separator">
          <div :class="$style.grid">
            <div 
            :style="{
              width: boxSize,
              height: boxSize
            }"
            :class="[
              $style.box, 
              item.checked ? $style.checked : $style.unChecked,
              item.lighting ? $style.lighting : ''
            ]" @click="checking(item)" v-for="(item, index) in grid" :key="index"></div>
          </div>
        </div>
        <div :class="[
          $style.rain,
          isShowRain ? $style.isShow : $style.isHide
        ]">
          <img src="../../../assets/rain.svg" alt="">
        </div>
      </div>
    </div>
    <div :class="$style.col">
      <map-range v-if="$props.level !== '1'" :class="[$style.rangeSlider, $props.stage < 2 ? $style.disable : '']" @changeSquere="changeSquere"></map-range>
      <div v-if="$props.stage >= 4 && $props.level !== '1'" :class="$style.btnWrapper">
        <v-btn md :class="$style.btn" @click="isShowPanel = true">Настройки</v-btn>
      </div>
      <map-panel @closePanel="isShowPanel = false" :isShowPanel="isShowPanel" v-show="$props.stage >= 4 && $props.level !== '1' && (isMobile ? isShowPanel ? true : false : true)" @changeCount="changeCount"></map-panel>
    </div>
    <div :class="[$style.col, $style.grade]">
      <map-grade @closePanel="isShowGrade = false" :level="$props.level" @check="check" v-if="$props.stage >= 5 && $props.level !== '1' && (isMobile ? isShowGrade ? true : false : true)"></map-grade>
    </div>
    <svg v-if="$props.stage >= 5 && $props.level !== '1'" :class="$style.openGrade" @click="isShowGrade = true" width="58" height="59" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_461_464)">
      <circle cx="29" cy="28" r="28" fill="#986CE7"/>
      <circle cx="29" cy="28" r="26.5" stroke="white" stroke-width="3"/>
      </g>
      <path d="M25.695 31.264C25.695 30.56 25.791 29.9307 25.983 29.376C26.175 28.8213 26.4843 28.2987 26.911 27.808C27.359 27.3173 27.9457 26.816 28.671 26.304C29.311 25.8347 29.823 25.4187 30.207 25.056C30.6123 24.6933 30.9003 24.3307 31.071 23.968C31.263 23.6053 31.359 23.2 31.359 22.752C31.359 22.0693 31.103 21.5573 30.591 21.216C30.1003 20.8533 29.407 20.672 28.511 20.672C27.615 20.672 26.7297 20.8107 25.855 21.088C24.9803 21.3653 24.0843 21.7387 23.167 22.208L21.471 18.784C22.5163 18.208 23.647 17.7387 24.863 17.376C26.079 17.0133 27.4123 16.832 28.863 16.832C31.0817 16.832 32.799 17.3653 34.015 18.432C35.2523 19.4987 35.871 20.8533 35.871 22.496C35.871 23.3707 35.7323 24.128 35.455 24.768C35.1777 25.408 34.7617 26.0053 34.207 26.56C33.6523 27.0933 32.959 27.6693 32.127 28.288C31.5083 28.736 31.0283 29.12 30.687 29.44C30.3457 29.76 30.111 30.0693 29.983 30.368C29.8763 30.6667 29.823 31.04 29.823 31.488V32.416H25.695V31.264ZM25.183 37.76C25.183 36.7787 25.4497 36.096 25.983 35.712C26.5163 35.3067 27.167 35.104 27.935 35.104C28.6817 35.104 29.3217 35.3067 29.855 35.712C30.3883 36.096 30.655 36.7787 30.655 37.76C30.655 38.6987 30.3883 39.3813 29.855 39.808C29.3217 40.2133 28.6817 40.416 27.935 40.416C27.167 40.416 26.5163 40.2133 25.983 39.808C25.4497 39.3813 25.183 38.6987 25.183 37.76Z" fill="white"/>
      <defs>
      <filter id="filter0_d_461_464" x="0" y="0" width="58" height="59" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="0.5"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_461_464"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_461_464" result="shape"/>
      </filter>
      </defs>
    </svg>
    <!-- <vue-range-slider :class="$style.rangeSlider" ref="slider" v-model="rangeValue"></vue-range-slider> -->
    <img v-if="stage >= 4 && $props.level === '1'" :class="$style.maplittle" src="../../../assets/maplittle.png" alt="">
  </div>
</template>
<style lang="scss" module src="./style.scss"></style>
<script src="./setup.js"></script>
