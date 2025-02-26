<template>
  <div>
    <h3>Clothing List</h3>
    <ul>
      <li v-for="item in clothings" :key="item.id">
        <p>{{ item.name }} - {{ item.category }} - {{ item.size }} - {{ item.color }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    // Access the Vuex store
    const store = useStore()

    // Get clothing items from the store
    const clothings = store.state.clothings

    // Fetch clothing items from the API on component mount
    store.dispatch('fetchClothings')

    return {
      clothings
    }
  }
}
</script>
