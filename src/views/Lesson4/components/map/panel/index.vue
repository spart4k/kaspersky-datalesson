<template>
  <div :class="$style.panel">
    <div :class="$style.wrap">
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
    <div :class="$style.btnWrapper">
      <v-btn md :class="$style.btn" @click="applyOptions">Применить</v-btn>
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
    <!-- {{ answerCount }} -->
    
  </div>
</template>
<style scoped module lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>
