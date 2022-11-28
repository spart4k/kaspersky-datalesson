import Vue from 'vue'

Vue.component('v-btn', () => import('@/components/@ui/Button/Button.vue'))
Vue.component('v-modal', () => import('@/components/@ui/Modal/Modal.vue'))
Vue.component('v-popup-msg', () => import('@/components/@ui/PopupMessage/PopupMessage.vue'))
