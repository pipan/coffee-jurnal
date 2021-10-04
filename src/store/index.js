import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemIds: [],
    repository: {},
    lastId: 0
  },
  getters: {
    items: function (state) {
      const items = []
      for (const id of state.itemIds) {
        items.push(state.repository[id])
      }
      return items
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
