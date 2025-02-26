import { createStore } from 'vuex'

export default createStore({
  state: {
    clothings: [],  // Store the list of clothing items
    isLoggedIn: localStorage.getItem('token') !== null,  // Check if the user is logged in
  },
  mutations: {
    setClothings(state, clothings) {
      state.clothings = clothings;
    },
    addClothing(state, clothing) {
      state.clothings.push(clothing);
    },
    removeClothing(state, clothingId) {
      state.clothings = state.clothings.filter(clothing => clothing.id !== clothingId);
    },
    setLoginStatus(state, status) {
      state.isLoggedIn = status;
    }
  },
  actions: {
    async fetchClothings({ commit }) {
      try {
        const response = await fetch('http://localhost:8000/api/clothings');    ////to redefine this api
        const data = await response.json();
        commit('setClothings', data);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
      }
    },
    async addClothing({ commit }, clothing) {
      try {
        const response = await fetch('http://localhost:8000/api/clothings', {       //// also this
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(clothing),
        });
        const newClothing = await response.json();
        commit('addClothing', newClothing);
      } catch (error) {
        console.error('Error adding clothing:', error);
      }
    },
    async logout({ commit }) {
      localStorage.removeItem('token');
      commit('setLoginStatus', false);
    }
  },
  getters: {
    clothings: state => state.clothings,
    isLoggedIn: state => state.isLoggedIn
  }
});
