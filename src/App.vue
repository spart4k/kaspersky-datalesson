<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
    <PortalTarget name="popup" multiple></PortalTarget>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    titleTemplate: 'Урок Цифры',
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout';
    },
  },
  created() {
    const { session_id: session } = this.$route.query;

    const lsVar = 'sessionId_5d5151'

    if (session) {
      localStorage.setItem(lsVar, JSON.stringify(session));
      this.$router.push('/');
    }

    if (localStorage.getItem(lsVar)) {
      this.$store.dispatch('setSession', JSON.parse(localStorage.getItem(lsVar)));
    }
  },
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
