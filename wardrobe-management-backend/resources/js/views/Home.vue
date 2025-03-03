<template>
  <div>
    <h2>Clothing List</h2>
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
    const store = useStore()
    const clothings = store.state.clothings

    // Fetch the clothing items from Vuex on component mount
    store.dispatch('fetchClothings')

    return {
      clothings
    }
  }
}
</script>
