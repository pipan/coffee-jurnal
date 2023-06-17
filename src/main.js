import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import ScreenTransformOrigin from './directives/ScreenTransformOrigin.js'
import TitlePlugin from './title/TitlePlugin'
import { gestureSwipeHorizontalDirective } from './directives/GestureSwipeHorizontal'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(TitlePlugin)
app.directive('screen-transform-origin', ScreenTransformOrigin)
app.directive('gesture-swipe-horizontal', gestureSwipeHorizontalDirective)

app.mount('#app')

store.commit('loadApp')
