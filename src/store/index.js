import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemIds: [],
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
    items: function (state) {
      const items = []
      for (const id of state.itemIds) {
        items.push(state.repository[id])
      }
      return items
    },
    sampleItems: function (_, getters) {
      return getters.items.splice(0, 29)
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
    saveItem: function(state, item) {
      if (!item.id) {
        item.id = state.lastId
        state.lastId = state.lastId + 1
      }

      if (!state.repository[item.id]) {
        state.itemIds = [item.id, ...state.itemIds]
      }

      const repositoryItem = state.repository[item.id] || {}
      state.repository = Object.assign({}, state.repository)
      state.repository[item.id] = Object.assign({}, repositoryItem, item)
    }
  },
  actions: {
    createNewCup: function (context, data) {
      data.created_at = new Date()
      context.commit("saveItem", data)
    },
    cupTasting: function (context, data) {
      context.commit("saveItem", data)
    }
  },
  modules: {
  }
})
