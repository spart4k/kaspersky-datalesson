<template>
  <div id="app">
    <component :is="layout">
      <v-loader v-if="!level"></v-loader>
      <bonus v-else-if="bonus" />
      <template v-else>
        <transition name="fade" mode="out-in">
          <lesson-1 v-if="stage === 1" @next-lesson="onNext" />
          <lesson-2 v-if="stage === 2" @next-lesson="onNext" />
          <lesson-3 v-if="stage === 3" @next-lesson="onNext" />
          <lesson-4 v-if="stage === 4" @next-lesson="onNext" />
          <lesson-5 v-if="stage === 5" @next-lesson="onNext" />
          <lesson-6 v-if="stage === 6" />
        </transition>
      </template>
    </component>
    <PortalTarget name="popup" multiple></PortalTarget>
  </div>
</template>

<script>
import Lesson1 from '@/views/Lesson1/Lesson1';
import Lesson2 from '@/views/Lesson2/Lesson2';
import Lesson3 from '@/views/Lesson3/Lesson3';
import Lesson4 from '@/views/Lesson4/Lesson1';
import Lesson5 from '@/views/Lesson5/Lesson5';
import Lesson6 from '@/views/Lesson6/Lesson6';
import Bonus from '@/views/Bonus/Bonus';
import { getSession } from '@/services/getSession';
import { createSession } from '@/services/createSession';

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: 'Урок Цифры',
  },
  components: {
    Lesson1, Lesson2, Lesson3, Lesson4, Lesson5, Lesson6, Bonus
  },
  data() {
    return {
      stage: 1,
    }
  },
  methods: {
    onNext() {
      this.stage += 1
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout';
    },
    level() {
      return this.$store.state.level
    },
    bonus() {
      return this.$route.query.bonus
    },
  },
  async created() {
    const { session_id: session } = this.$route.query;

    const lsVar = 'sessionId_5d5151';
    const levelVar = 'level_5d5151';

    if (session) {
      const sessionData = await getSession(session);

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

      localStorage.setItem(lsVar, session);
      localStorage.setItem(levelVar, level);

      if (this.bonus) {
        const { id_lesson, id_trainer, type, grade, grades, not_from_russia, id_country, id_region, id_city } = sessionData.data;
        await createSession(id_lesson, id_trainer, type, grade, grades, not_from_russia, id_country, id_region, id_city);
      }
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
