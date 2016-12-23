import superagent from 'superagent'

import config from '../config'

import store from '../vuex/store'

let VueSuperagent = {}

VueSuperagent.install = function(Vue, options) {

  Vue.prototype.$request = function(method, url) {
    return superagent[method](config.domain + url)
      .timeout({
        response: 5000,
      }).
      on('error', (err) => {

        if (err.timeout) {
          store.dispatch('fadeShow', {
            status: 'info',
            content: '请求超时'
          })
        }
      })
  }

}

export default VueSuperagent
