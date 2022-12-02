<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
    <PortalTarget name="popup" multiple></PortalTarget>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from './utils/constants';

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
  async created() {
    const { session_id: session } = this.$route.query;

    const lsVar = 'sessionId_5d5151';
    const levelVar = 'level_5d5151';

    if (session) {
      const sessionData = await axios.get(`${BASE_URL}/api/v2/get_session`, {
        params: { session_id: session },
        headers: { Accept: 'application/json' },
      });

      let level;
      switch (sessionData.data.id_trainer) {
        case 77:
          level = 1;
          break;
        case 78:
          level = 2;
          break;
        case 79:
          level = 3;
          break;
        default:
          break;
      }

      console.log(sessionData.data);
      localStorage.setItem(lsVar, session);
      localStorage.setItem(levelVar, level);
      this.$router.push('/');
    }

    if (localStorage.getItem(lsVar)) {
      this.$store.dispatch('updateSession', localStorage.getItem(lsVar));
    }

    if (localStorage.getItem(levelVar)) {
      this.$store.dispatch('updateLevel', localStorage.getItem(levelVar));
    }
  },
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
