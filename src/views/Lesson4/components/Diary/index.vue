<template>
  <div :class="$style.diary">
    <div :class="[
      $style.wrap,
      isOpen ? $style.isOpen : $style.isHide
    ]">
      <img v-if="isOpen" @click="hide" :class="$style.close" src="../../assets/closediary.svg" alt="">
      <div @click="open" :class="$style.header">
        <img src="../../assets/diary.svg" alt="">
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
            ]" v-model="item.value" :readonly="item.state !== 'writing'" value="test" type="text">
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
