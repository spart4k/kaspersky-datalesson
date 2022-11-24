<template>
  <div :class="$style.wrapper">
    <v-btn lg :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
  </div>
</template>

<script>
export default {
  name: 'part1',
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

.btn {
  position: absolute;
  bottom: 5.1rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
