<template>
  <div :class="$style.wrap">
    <p>
      Выбери верное утверждение:
    </p>
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
    <div :class="$style.btnWrapper">
      <v-btn md :class="$style.btn" @click="applyOptions">Продолжить</v-btn>
    </div>
    <svg @click="closePanel" :class="$style.close" width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_458_15149)">
      <circle cx="22" cy="21" r="21" fill="#986CE7"/>
      <circle cx="22" cy="21" r="19.5" stroke="white" stroke-width="3"/>
      </g>
      <path d="M16.75 15.75L27.25 26.25" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M16.75 26.25L27.25 15.75" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <defs>
      <filter id="filter0_d_458_15149" x="0" y="0" width="44" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="0.5"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_458_15149"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_458_15149" result="shape"/>
      </filter>
      </defs>
    </svg>   
  </div>
  
</template>
<style scoped module lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>