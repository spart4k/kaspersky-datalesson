<template>
  <div :class="$style.diary">
    <div :class="[
      $style.wrap,
      isOpen ? $style.isOpen : $style.isHide
    ]">
      <!-- <img v-if="isOpen" @click="hide" :class="$style.close" src="../../assets/closediary.svg" alt=""> -->
      <svg v-if="isOpen" @click="hide" :class="$style.close" width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_579_885)">
        <circle cx="17" cy="16" r="16" fill="#986CE7"/>
        <circle cx="17" cy="16" r="14.5" stroke="white" stroke-width="3"/>
        </g>
        <path d="M13 12L21 20" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <path d="M13 20L21 12" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <defs>
        <filter id="filter0_d_579_885" x="0" y="0" width="34" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="0.5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_579_885"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_579_885" result="shape"/>
        </filter>
        </defs>
      </svg>  
      <div @click="open" :class="$style.header">
        <img src="../../assets/diary.png" alt="">
        <div v-if="isOpen" :class="[
          $style.title,
          isOpen ? $style.isOpening : $style.isHiding
        ]">
          Дневник погоды
        </div>
      </div>
      <div v-if="isOpen" :class="$style.body">
        <div :class="$style.form">
          <label v-for="(item, index) in form" :key="index" :class="[$style.row, $style[item.class]]" for="">
            <div :class="[
              $style.title,
              item.state === 'success' ? $style.showSuccess : ''
            ]">
              <p>
                {{ item.title }}
                <!-- <img v-if="item.state === 'success'" src="../../assets/success.svg" alt=""> -->
              </p>
            </div>
            
            <input :class="[
              $style[item.state]
            ]" v-model="item.value" :readonly="item.state !== 'writing' || true" value="test" type="text">
            <span>{{ item.postfix }}</span>
          </label>
          <!-- <label :class="[$style.row, $style.temp]" for="">
            <p>Температура</p>
            <input value="test" type="text">
            <span>°С</span>
          </label>
          <label :class="[$style.row, $style.osadki]" for="">
            <p>Кол-во осадков</p>
            <input value="test" type="text">
            <span>мм</span>
          </label>
          <label :class="[$style.row, $style.veter]" for="">
            <p>Скорость ветра</p>
            <input value="test" type="text">
            <span>м/с</span>
          </label>
          <label :class="[$style.row, $style.davl]" for="">
            <p>Атм. давление</p>
            <input value="test" type="text">
            <span>мм рт. cт.</span>
          </label>
          <label :class="[$style.row, $style.vlaga]" for="">
            <p>Влажность</p>
            <input value="test" type="text">
            <span>%</span>
          </label> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" module src="./style.scss"></style>
<script src="./setup.js"></script>
