import Vue from 'vue'
import App from './App.vue'

import AxScroll from '../dist/ax-scroll';
Vue.use(AxScroll);

new Vue({
  el: '#app',
  render: h => h(App)
})
