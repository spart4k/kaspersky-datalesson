<template>
  <div :class="$style.range">
    <div :class="$style.title">
      Размер сектора
    </div>
    <vue-slider :direction="'btt'" :data="rangeData" :tooltip="'none'" :dotSize="24" :class="$style.rangeSlider" v-model="rangeValue" />
    <div :class="$style.panel">
      <div>{{ rangeKm }}</div>
    </div>
  </div>
</template>
<style scoped module lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>