<template>
  <div :class="$style.panel">
    <!-- {{ answerCount }} -->
    <div v-show="false" class=""> {{ answerCount }} </div>
    <label :class="item.disable ? $style.disable : ''" v-for="(item, index) in weatherOptions" :key="index">
      <input v-model="item.value" type="checkbox">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="18" height="18" rx="5" stroke="black" stroke-opacity="0.15" stroke-width="2"/>
        <rect v-if="item.value" width="20" height="20" rx="6" fill="#46EE6E"/>
        <path d="M4 10.3077L7.78947 14L16 6" stroke="white" stroke-width="3" stroke-linecap="round"/>
      </svg>        
      <span>{{item.label}}</span>
    </label>
  </div>
</template>
<style scoped module lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>
