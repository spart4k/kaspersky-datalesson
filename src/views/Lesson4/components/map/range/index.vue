<template>
  <div :class="$style.range">
    <div :class="$style.title">
      Размер сектора
    </div>
    <vue-slider :data="rangeData" :tooltip="false" :dotSize="24" :class="$style.rangeSlider" v-model="rangeValue" />
    <div :class="$style.panel">
      <p>{{ rangeValue }}</p>
      <p>{{ rangeKm }}</p>
    </div>
  </div>
</template>
<style scoped module lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>