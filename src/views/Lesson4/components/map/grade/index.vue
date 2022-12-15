<template>
  <div v-if="$props.level === '2'" :class="$style.grade">
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
  <div v-else-if="$props.level === '3'" :class="$style.grade">
    <div v-for="(item, index) in cards" :key="index" 
    @click="checkPattern(index)"
    :class="[
      $style.card, 
      $style.pattern,
      selectedPattern !== 0 &&
      selectedPattern !== 3 &&
      selectedPattern === index &&
      $style.wrong,
      selectedPatternArray.includes(index) ? $style.correct : '',
      ]">
      {{ item.label }}
    </div>
  </div>
</template>
<style scoped module lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>