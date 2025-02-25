<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
nav {
  padding: 10px;
  background-color: #333;
  color: white;
}
router-link {
  color: white;
  margin-right: 15px;
}
</style>
