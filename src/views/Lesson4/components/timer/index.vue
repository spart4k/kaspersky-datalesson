<template>
  <div :class="$style.timer">
    {{ timerValue.hour }}:{{ timerValue.minutes }}:{{ timerValue.seconds }}
  </div>
</template>
<style lang="scss" module src="./style.scss"></style>
<script src="./setup.js"></script>
