export const state = () => ({
  values: {}
})

export const getters = {
  getValues(state) {
    return state.values
  }
}

export const mutations = {
  reset(state) {
    state.values = {}
  },
  set(state, payload) {
    state.values = {
      ...state.values,
      ...payload
    }
  },
  deleteK(state, key) {
    delete state.values[key]
  },
  setObject(state, key, data) {
    state.values.Object[key] = data
  }
}
