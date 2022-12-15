<template>
  <div :class="$style.timer">
    <div :class="$style.title">
      Точность прогноза
    </div>
    <div :class="$style.time">
      {{ procents }}
    </div>
  </div>
</template>
<style lang="scss" module src="./style.scss"></style>
<script src="./setup.js"></script>
