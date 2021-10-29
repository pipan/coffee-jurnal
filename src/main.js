import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import './registerServiceWorker'

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

store.commit('refresh')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
