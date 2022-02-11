import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import './registerServiceWorker'

import ScreenTransformOrigin from './directives/ScreenTransformOrigin.js'

Vue.config.productionTip = false
Vue.use(VueMeta)

Vue.filter('round', function (value, precision) {
  precision = precision || 0
  const power = Math.pow(10, precision)
  return Math.round(value * power) / power
})
Vue.filter('ellipsis', function (value, limit) {
  if (value.length > limit) {
    return value.substr(0, limit) + "..."
  }
  return value
})
Vue.filter('orderAlphabetical', function (value, direction) {
  direction = direction || 'asc'
  const directions = {
    asc: [-1, 0, 1],
    desc: [1, 0, -1]
  }
  let ordered = [...value]
  ordered.sort((a, b) => {
    const aLower = a.toLowerCase()
    const bLower = b.toLowerCase()
    if (aLower < bLower) {
      return directions[direction][0]
    } else if (aLower > bLower) {
      return directions[direction][2]
    }
    return directions[direction][1]
  })
  return ordered
})

Vue.directive('screen-transform-origin', ScreenTransformOrigin)

store.commit('loadApp')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
