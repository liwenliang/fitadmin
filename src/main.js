import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App'
import router from './router'
import store from './store'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import '@/permission' // permission control

require('./mock')

Vue.use(MuseUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
