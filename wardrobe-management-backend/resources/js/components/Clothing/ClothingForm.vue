<template>
  <div>
    <h3>Add Clothing</h3>
    <form @submit.prevent="addClothing">
      <div>
        <label for="name">Name</label>
        <input type="text" v-model="clothing.name" id="name" required />
      </div>
      <div>
        <label for="category">Category</label>
        <input type="text" v-model="clothing.category" id="category" required />
      </div>
      <div>
        <label for="size">Size</label>
        <input type="text" v-model="clothing.size" id="size" required />
      </div>
      <div>
        <label for="color">Color</label>
        <input type="text" v-model="clothing.color" id="color" required />
      </div>
      <button type="submit">Add Clothing</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const clothing = {
      name: '',
      category: '',
      size: '',
      color: ''
    }

    // Dispatch the action to add a new clothing item
    const addClothing = async () => {
      await store.dispatch('addClothing', clothing)
    }

    return {
      clothing,
      addClothing
    }
  }
}
</script>
