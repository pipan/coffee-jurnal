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
        meta: { transitionOrder: 1, transitionDepth: 0 }
      },
      {
        path: 'stats',
        name: 'Stats',
        component: Stats,
        meta: { transitionOrder: 2, transitionDepth: 0 },
        children: [
          {
            path: 'filter',
            name: 'Filter',
            component: FilterModal
          }
        ]
      }
    ]
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: { transitionDepth: 1 }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    meta: { transitionDepth: 3 }
  },
  {
    path: '/taste/:id',
    name: 'Taste',
    component: Taste,
    meta: { transitionDepth: 2 }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
