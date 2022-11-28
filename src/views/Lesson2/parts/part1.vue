<template>
  <div :class="$style.wrapper">
    <div :class="$style.btnWrapper">
      <v-btn lg :class="$style.btn" @click="$emit('next')">Продолжить</v-btn>
    </div>
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

.btnWrapper {
  position: absolute;
  bottom: rem(51);
  left: 50%;
  transform: translateX(-50%);
}
</style>
