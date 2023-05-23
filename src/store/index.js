import { createStore } from 'vuex'

export default createStore({
  state: {
    app: {
      updating: false
    },
    repository: {},
    lastId: 0,
    bags: [],
    coffeeTypes: [
      {
        id: 'filter',
        name: 'filter'
      },
      {
        id: 'espresso',
        name: 'espresso'
      }
    ],
    coffeeRoastIntensities: [
      {
        id: 'light',
        name: 'light'
      },
      {
        id: 'medium',
        name: 'medium'
      },
      {
        id: 'dark',
        name: 'dark'
      },
      {
        id: 'mix',
        name: 'mix'
      }
    ],
    coffeeProcessings: [
      {
        id: 'natural',
        name: 'natural'
      },
      {
        id: 'washed',
        name: 'washed'
      },
      {
        id: 'honey',
        name: 'honey'
      },
      {
        id: 'anaerobic',
        name: 'anaerobic'
      }
    ],
    displayMode: 'grid'
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
    item: (state) => (id) => {
      return state.repository[id]
    },
    coffeePlaceOptions: function(_, getters) {
      const options = []
      
      for (const item of getters.chronologicalItems) {
        if (!item.coffeePlace || options.indexOf(item.coffeePlace) > -1) {
          continue
        }
        options.push(item.coffeePlace)
      }
      return options
    },
    coffeeOriginOptions: function(_, getters) {
      const options = []
      for (const item of getters.chronologicalItems) {
        if (!item.coffeeOrigin || options.indexOf(item.coffeeOrigin) > -1) {
          continue
        }
        options.push(item.coffeeOrigin)
      }
      return options
    },
    coffeeRoasterOptions: function(_, getters) {
      const options = []
      for (const item of getters.chronologicalItems) {
        if (!item.coffeeRoaster || options.indexOf(item.coffeeRoaster) > -1) {
          continue
        }
        options.push(item.coffeeRoaster)
      }
      return options
    }
  },
  mutations: {
    loadApp: function (state) {
      const repository = JSON.parse(localStorage.getItem('repository') || "{}")
      for (let id in repository) {
        repository[id].created_at = new Date(repository[id].created_at)
      }
      state.repository = repository
      state.lastId = parseInt(localStorage.getItem('lastId') || '0')

      const displayMode = localStorage.getItem('displayMode') || "grid"
      state.displayMode = displayMode

      state.bags = JSON.parse(localStorage.getItem('bags') || "[]")
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
    },
    setDisplayMode: function(state, value) {
      state.displayMode = value
      localStorage.setItem('displayMode', value)
    },
    insertBag: function(state, item) {
      let newBags = [...state.bags]
      newBags.push(item)
      state.bags = newBags
      localStorage.setItem('bags', JSON.stringify(state.bags))
      return state.bags
    },
    removeBags: function(state, indexes) {
      let newBags = []
      for (let i = 0; i < state.bags.length; i++) {
        if (indexes.indexOf(i) > -1) {
          continue
        }
        newBags.push(state.bags[i])
      }
      state.bags = newBags
      localStorage.setItem('bags', JSON.stringify(state.bags))
      return state.bags
    },
  },
  actions: {
    createNewCup: function (context, data) {
      data = Object.assign({
        created_at: new Date(),
        propertyRatings: {
          aroma: { intensity: 0.5, quality: 0.5 },
          acidity: { intensity: 0.5, quality: 0.5 },
          sweetness: { intensity: 0.5, quality: 0.5 },
          body: { intensity: 0.5, quality: 0.5 },
          finish: { intensity: 0.5, quality: 0.5 }
        },
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
    },
    importCups: function(context, data) {
      for (let item of data) {
        item.id = context.state.lastId + 1
        item.created_at = new Date(item.created_at)
        context.commit("insertItem", item)
      }
    },
    createBag: function (context, data) {
      context.commit("insertBag", data)
    },
    removeBags: function (context, indexes) {
      context.commit("removeBags", indexes)
    },
  },
  modules: {
  }
})
