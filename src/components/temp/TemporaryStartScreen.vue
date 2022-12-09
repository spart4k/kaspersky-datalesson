<template>
  <div :class="$style.wrapper">
    <div :class="$style.inner">
      <div :class="$style.linkWrapper">
        <router-link :class="$style.link" to="/lesson1">Lesson 1</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="$style.link" to="/lesson2">Lesson 2</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="$style.link" to="/lesson3">Lesson 3</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="[$style.link, $style.disabled]" to="/lesson4">Lesson 4</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="$style.link" to="/lesson5">Lesson 5</router-link>
      </div>
      <div :class="$style.linkWrapper">
        <router-link :class="[$style.link, $style.disabled]" to="/lesson6">Lesson 6</router-link>
      </div>
      <p v-if="session" :class="$style.text">session_id: {{ session }}</p>
      <p v-if="level" :class="$style.text2">level: {{ level }}</p>
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
    const level = computed(() => store.state.level);

    return {
      session,
      level,
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
  min-width: rem(400);
  min-height: rem(200);
  padding: rem(20);
  border-radius: rem(10);
}

.linkWrapper {
  margin: rem(10);
}

.link {
  color: #000;
  font-size: rem(18);
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
  margin: rem(10);
  margin-top: rem(30);
  font-size: rem(14);
}

.text2 {
  margin: rem(10);
  margin-top: rem(10);
  font-size: rem(14);
}
</style>
