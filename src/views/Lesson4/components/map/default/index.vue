<template>
  <div :class="$style.mainWrap">
    <div :class="[
      $style.wrap,
      $props.stage >= 5 && $props.level !== '1' ? $style.small : ''
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
      <map-panel v-show="$props.stage >= 4 && $props.level !== '1'" @changeCount="changeCount"></map-panel>
    </div>
    <div :class="[$style.col, $style.grade]">
      <map-grade :level="$props.level" @check="check" v-if="$props.stage >= 5 && $props.level !== '1'"></map-grade>
    </div>
    <!-- <vue-range-slider :class="$style.rangeSlider" ref="slider" v-model="rangeValue"></vue-range-slider> -->
    <img v-if="stage >= 4 && $props.level === '1'" :class="$style.maplittle" src="../../../assets/maplittle.png" alt="">
  </div>
</template>
<style lang="scss" module src="./style.scss"></style>
<script src="./setup.js"></script>
