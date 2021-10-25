import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Taste from '../views/Taste.vue'
import Stats from '../views/Stats.vue'
import FilterModal from '../views/FilterModal.vue'
import NavigationLayout from '../views/NavigationLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: NavigationLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: { transitionOrder: 1 }
      },
      {
        path: 'stats',
        name: 'Stats',
        component: Stats,
        meta: { transitionOrder: 2 },
        children: [
          {
            path: 'filter',
            name: 'Filter',
            component: FilterModal,
            meta: { transitionIn: 'animation--slide-in', transitionOut: 'animation--slide-out' }
          }
        ]
      }
    ]
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: { transitionIn: 'animation--slide-in', transitionOut: 'animation--slide-out' }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    meta: { transitionIn: 'animation--slide-in', transitionOut: 'animation--slide-out' }
  },
  {
    path: '/taste/:id',
    name: 'Taste',
    component: Taste,
    meta: { transitionIn: 'animation--slide-in', transitionOut: 'animation--slide-out' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
