<template>
  <div :class="$style.mainWrap">
    <div :class="$style.wrap">
      <div :class="$style.map">
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
    <img v-if="stage >= 4" :class="$style.maplittle" src="../../../assets/maplittle.png" alt="">
  </div>
</template>
<style lang="scss" module src="./style.scss"></style>
<script src="./setup.js"></script>
