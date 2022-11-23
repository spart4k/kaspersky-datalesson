<template>
  <div :class="$style.wrapper">
    <div :class="$style.inner">
      <div :class="$style.linkWrapper"><router-link :class="$style.link" to="/lesson1">Lesson 1</router-link></div>
      <div :class="$style.linkWrapper"><router-link :class="$style.link" to="/lesson2">Lesson 2</router-link></div>
      <div :class="$style.linkWrapper"><router-link :class="$style.link" to="/lesson3">Lesson 3</router-link></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemporaryStartScreen',
}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #e7e7e7;
}

.inner {
  background-color: #fdfdfd;
  min-width: 40rem;
  min-height: 20rem;
  padding: 2rem;
  border-radius: 10px;
}

.linkWrapper {
  margin: 1rem;
}

.link {
  color: #000;
  font-size: 1.8rem;
  text-decoration: none;
  &:visited {
    color: inherit;
  }
}
</style>
