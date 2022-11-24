<template>
  <div :class="$style.wrapper">
    <div :class="$style.inner">
      <div :class="$style.linkWrapper">
        <router-link :class="[$style.link, $style.disabled]" to="/lesson1">Lesson 1</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="$style.link" to="/lesson2">Lesson 2</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="[$style.link, $style.disabled]" to="/lesson3">Lesson 3</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="[$style.link, $style.disabled]" to="/lesson4">Lesson 4</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="[$style.link, $style.disabled]" to="/lesson5">Lesson 5</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="[$style.link, $style.disabled]" to="/lesson6">Lesson 6</router-link>
      </div>
      <p v-if="session" :class="$style.text">session_id: {{ session }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';

export default {
  name: 'TemporaryStartScreen',
  setup() {
    const store = useStore();
    const session = computed(() => store.state.session);

    return {
      session,
    };
  },
};
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
  user-select: none;
  &:visited {
    color: inherit;
  }
}

.disabled {
  pointer-events: none;
  color: #ccc !important;
}

.text {
  margin: 1rem;
  margin-top: 3rem;
  font-size: 1.4rem;
}
</style>
