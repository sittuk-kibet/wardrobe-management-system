<template>
  <div>
    <input v-model="searchQuery" placeholder="Search items..." /> /// This directive binds the value of the input field to the searchQuery data property. This means whenever a user types in the input field, the value of searchQuery will automatically update, and vice versa.
    <select v-model="selectedCategory"> /// When a user selects a category from the dropdown, selectedCategory will automatically update.
      <option value="">All Categories</option>
      <option value="top">Top</option>
      <option value="bottom">Bottom</option>
      <option value="shoes">Shoes</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',    // This is the property that holds the current value of the search input field. Initially, it's an empty string.
      selectedCategory: '',   // This is the property that holds the currently selected category from the dropdown. Initially, it's an empty string (indicating no category is selected)
    };
  },
  computed: {
    filteredItems() {
      return this.$store.state.clothings.filter(item => {
        return (
          (this.selectedCategory === '' || item.category === this.selectedCategory) && // This checks whether the selected category is empty (''), which means "All Categories". If it's not empty, it compares the category of the item to the selected category.
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
};
</script>

