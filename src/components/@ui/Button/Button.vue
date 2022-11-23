<template>
  <button :class="$style.wrapper" @click="$emit('click')"><slot /></button>
</template>

<script>
export default {
  name: 'v-btn',
  props: {

  },
}
</script>

<style lang="scss" module>
.wrapper {

}
</style>
