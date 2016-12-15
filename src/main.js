import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMdl from 'vue-mdl'

// import normalize from '../node_modules/normalize.css/normalize.css'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// import mdlcss from 'material-design-lite/material.min.css'
import mainCss from './styles/main.scss'

// import mdljs from 'material-design-lite/material.min.js'

import routes from './router/router'

import App from './App'

Vue.use(VueRouter)
Vue.use(VueMdl)

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
