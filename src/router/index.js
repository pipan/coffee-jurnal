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
      },
      {
        path: 'stats',
        name: 'Stats',
        component: Stats,
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
    component: Create
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/taste/:id',
    name: 'Taste',
    component: Taste
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
