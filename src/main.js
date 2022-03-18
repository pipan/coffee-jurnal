import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import './registerServiceWorker'

import ScreenTransformOrigin from './directives/ScreenTransformOrigin.js'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(createMetaManager())
app.use(metaPlugin)
app.directive('screen-transform-origin', ScreenTransformOrigin)

app.mount('#app')

store.commit('loadApp')
