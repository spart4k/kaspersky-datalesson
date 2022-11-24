<template>
  <div :class="$style.wrapper">
    <div :class="$style.btnWrapper">
      <v-btn md :class="$style.btn" @click="$emit('prev')">Назад</v-btn>
      <v-btn lg :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'part2',
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" module>
.wrapper {
  height: 100vh;
  overflow: hidden;
  background-color: #ebebeb;
  position: relative;
}

.btnWrapper {
  width: 54rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 5.1rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
