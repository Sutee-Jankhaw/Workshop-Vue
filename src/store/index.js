import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  },
  getters: {
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  },
  actions: {
  },
  modules: {
  }
})
