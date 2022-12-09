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

<style scoped lang="scss" module>
.wrapper {
  height: 100%;
  overflow: hidden;
  background-color: #ebebeb;
  position: relative;
}

.btnWrapper {
  width: rem(540);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: rem(51);
  left: 50%;
  transform: translateX(-50%);
  > button {
    width: rem(280);
    &:not(:last-child) {
      margin-bottom: rem(20);
    }
  }
}
</style>
