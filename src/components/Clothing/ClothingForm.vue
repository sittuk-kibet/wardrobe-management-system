<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name</label>
      <input type="text" v-model="clothing.name" id="name" required /> // v-model automatically sync the input value with the bound state.so no longer need event handler for that.
    </div>
    <div>
      <label for="category">Category</label>
      <select v-model="clothing.category" id="category" required>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="shoes">Shoes</option>
      </select>
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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      clothing: {
        name: '',
        category: 'top',
        size: '',
        color: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://your-backend-api.com/api/clothings', this.clothing);
        console.log('Item added:', response.data);
        // Reset form
        this.clothing = { name: '', category: 'top', size: '', color: '' };
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}
div {
  margin-bottom: 10px;
}
label {
  margin-bottom: 5px;
}
</style>
