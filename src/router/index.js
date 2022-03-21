import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import ImportView from '../views/ImportView.vue'
import EditView from '../views/EditView.vue'
import TasteView from '../views/TasteView.vue'
import StatsView from '../views/StatsView.vue'
import FilterView from '../views/FilterView.vue'
import NavigationLayout from '../views/NavigationLayout.vue'

const routes = [
  {
    path: '/',
    component: NavigationLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
        meta: { transitionOrder: 1, transitionDepth: 0 }
      },
      {
        path: 'stats',
        name: 'Stats',
        component: StatsView,
        meta: { transitionOrder: 2, transitionDepth: 0 }
      }
    ]
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateView,
    meta: { transitionDepth: 1 }
  },
  {
    path: '/import',
    name: 'Import',
    component: ImportView,
    meta: { transitionDepth: 2 }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: EditView,
    meta: { transitionDepth: 3 }
  },
  {
    path: '/taste/:id',
    name: 'Taste',
    component: TasteView,
    meta: { transitionDepth: 2 }
  },
  {
    path: '/filter',
    name: 'Filter',
    component: FilterView,
    meta: { transitionDepth: 1 }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
