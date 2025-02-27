import { createStore } from 'vuex';

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
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/clothings`);
        const data = await response.json();
        commit('setClothings', data);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
      }
    },
    async addClothing({ commit }, clothing) {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/clothings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(clothing),
        });

        if (response.ok) {
          const newClothing = await response.json();
          commit('addClothing', newClothing);
        } else {
          console.error('Failed to add clothing item');
        }
      } catch (error) {
        console.error('Error adding clothing:', error);
      }
    },
    async logout({ commit }) {
      try {
        // Call backend to logout the user and invalidate the token
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          // If the response is successful, clear localStorage and Vuex state
          localStorage.removeItem('token');
          commit('setLoginStatus', false);
        } else {
          console.error('Failed to log out');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  },
  getters: {
    clothings: state => state.clothings,
    isLoggedIn: state => state.isLoggedIn
  }
});
