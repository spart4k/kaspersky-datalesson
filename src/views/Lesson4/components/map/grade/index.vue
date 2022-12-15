<template>
  <div :class="$style.grade">
    <div v-for="(item, index) in cards" :key="index" 
    @click="checkPattern(index)"
    :class="[
      $style.card, 
      $style.pattern,
      selectedPattern !== 1 &&
      selectedPattern === index &&
      $style.wrong,
      selectedPattern === 1 && selectedPattern === index && $style.correct,
      ]">
      {{ item.label }}
    </div>
  </div>
</template>
<style scoped module lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>