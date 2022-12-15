<template>
  <div :class="$style.timer">
    <div :class="$style.title">
      Время расчета {{ startTimer }}
    </div>
    <div :class="$style.time">
      {{ startTimer }}
    </div>
  </div>
</template>
<style lang="scss" module src="./style.scss"></style>
<script src="./setup.js"></script>
