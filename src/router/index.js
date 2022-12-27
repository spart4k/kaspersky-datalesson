import Vue from 'vue'
import VueRouter from 'vue-router'

import Lesson1 from '@/views/Lesson1/Lesson1'
import Lesson2 from '@/views/Lesson2/Lesson2'
import Lesson3 from '@/views/Lesson3/Lesson3'
import Lesson4 from '@/views/Lesson4/Lesson1'
import Lesson5 from '@/views/Lesson5/Lesson5'
import Lesson6 from '@/views/Lesson6/Lesson6'
import Bonus from '@/views/Bonus/Bonus'
import TemporaryStartScreen from '@/components/temp/TemporaryStartScreen'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TemporaryStartScreen,
  },
  {
    path: '/lesson1',
    name: 'lesson1',
    component: Lesson1,
  },
  {
    path: '/lesson2',
    name: 'lesson2',
    component: Lesson2,
  },
  {
    path: '/lesson3',
    name: 'lesson3',
    component: Lesson3,
  },
  {
    path: '/lesson4',
    name: 'lesson4',
    component: Lesson4,
  },
  {
    path: '/lesson5',
    name: 'lesson5',
    component: Lesson5,
  },
  {
    path: '/lesson6',
    name: 'lesson6',
    component: Lesson6,
  },
  {
    path: '/bonus',
    name: 'bonus',
    component: Bonus,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
