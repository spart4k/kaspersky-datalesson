<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
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
      return this.$route.meta.layout || 'default-layout'
    },
  },
  // created() {
  //   const { session_id: session } = this.$route.query

  //   if (session) {
  //     this.$store.commit('SET_SESSION', session)
  //   }
  // },
}
</script>
<style lang="scss">
  @import './styles/main.scss';
</style>
