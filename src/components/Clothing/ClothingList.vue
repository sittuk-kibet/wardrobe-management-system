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
import axios from 'axios';

export default {
  data() {
    return {
      clothings: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://your-backend-api.com/api/clothings');
      this.clothings = response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  },
};
</script>

