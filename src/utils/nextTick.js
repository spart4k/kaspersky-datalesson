import Vue from 'vue'

const nextTick = () => new Promise(resolve => Vue.nextTick(resolve))

export default nextTick
