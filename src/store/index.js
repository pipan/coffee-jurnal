import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
      updating: false
    },
    repository: {},
    lastId: 0,
    coffeeTypes: [
      {
        id: 'filter',
        name: 'Filter'
      },
      {
        id: 'espresso',
        name: 'Espresso'
      }
    ]
  },
  getters: {
    chronologicalItems: function (state) {
      const items = []
      for (const id in state.repository) {
        items.push(state.repository[id])
      }
      return items.sort((a, b) => {
        if (a.created_at < b.created_at) {
          return 1
        }
        else if (a.created_at > b.created_at) {
          return -1
        }
        return 0
      })
    },
    sampleItems: function (_, getters) {
      return getters.chronologicalItems.slice(0, 29)
    },
    item: (state) => (id) => {
      return state.repository[id]
    },
    coffeePlaceOptions: function(_, getters) {
      const options = []
      
      for (const item of getters.sampleItems) {
        if (!item.coffeePlace || options.indexOf(item.coffeePlace) > -1) {
          continue
        }
        options.push(item.coffeePlace)
      }
      return options
    },
    coffeeOriginOptions: function(_, getters) {
      const options = []
      for (const item of getters.sampleItems) {
        if (!item.coffeeOrigin || options.indexOf(item.coffeeOrigin) > -1) {
          continue
        }
        options.push(item.coffeeOrigin)
      }
      return options
    },
    coffeeRosterOptions: function(_, getters) {
      const options = []
      for (const item of getters.sampleItems) {
        if (!item.coffeeRoster || options.indexOf(item.coffeeRoster) > -1) {
          continue
        }
        options.push(item.coffeeRoster)
      }
      return options
    }
  },
  mutations: {
    refresh: function (state) {
      const repository = JSON.parse(localStorage.getItem('repository') || "{}")
      for (let id in repository) {
        repository[id].created_at = new Date(repository[id].created_at)
      }
      state.repository = repository
      state.lastId = parseInt(localStorage.getItem('lastId') || '0')
    },
    updateItem: function(state, item) {
      if (!item.id || !state.repository[item.id]) {
        return
      }

      const repositoryItem = state.repository[item.id]
      const newRepository = Object.assign({}, state.repository)
      newRepository[item.id] = Object.assign({}, repositoryItem, item)
      state.repository = newRepository
      localStorage.setItem('repository', JSON.stringify(state.repository))
      return state.repository[item.id]
    },
    insertItem: function(state, item) {
      state.lastId += 1
      localStorage.setItem('lastId', item.id)

      state.repository = Object.assign({}, state.repository)
      state.repository[item.id] = Object.assign({}, item)
      localStorage.setItem('repository', JSON.stringify(state.repository))
      return state.repository[item.id]
    },
    deleteIds: function(state, ids) {
      let newRepo = Object.assign({}, state.repository)
      for (const id of ids) {
        delete newRepo[id]
      }
      state.repository = newRepo
      localStorage.setItem('repository', JSON.stringify(state.repository))
    },
    setAppSetting: function(state, value) {
      state.app = Object.assign({}, state.app, value)
    }
  },
  actions: {
    createNewCup: function (context, data) {
      data = Object.assign({
        created_at: new Date(),
        propertyRatings: {},
        rating: -1
      }, data)
      data.id = context.state.lastId + 1
      context.commit("insertItem", data)
      return Promise.resolve(data)
    },
    cupTasting: function (context, data) {
      context.commit("updateItem", data)
    },
    updateCup: function (context, data) {
      context.commit("updateItem", data)
    },
    deleteByIds: function(context, data) {
      context.commit("deleteIds", data)
    },
    updateStart: function(context) {
      context.commit('setAppSetting', {
        updating: true
      })
    }
  },
  modules: {
  }
})
