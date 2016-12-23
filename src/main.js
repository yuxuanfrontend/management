import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSuperagent from './plugins/vue-superagent'

// import VueMdl from 'vue-mdl'

// import normalize from '../node_modules/normalize.css/normalize.css'
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import bulma from 'bulma'
// import mdlcss from 'material-design-lite/material.min.css'
// import mdljs from 'material-design-lite/material.min.js'
import mainCss from './styles/main.scss'
import flatpickercss from 'flatpickr/dist/flatpickr.min.css'


import routes from './router/router'
import store from './vuex/store'

import App from './App'

Vue.use(VueRouter)
Vue.use(VueSuperagent)
// Vue.use(VueMdl)

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})
