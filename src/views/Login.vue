<template>
  <div>
    <h3>Login</h3>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  setup() {
    const store = useStore()
    const email = ref('')
    const password = ref('')

    const login = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        })

        const data = await response.json()

        if (data.token) {
          localStorage.setItem('token', data.token)  // Store the token
          store.commit('setLoginStatus', true)  // Update login state in Vuex
        }
      } catch (error) {
        console.error('Login failed:', error)
      }
    }

    return {
      email,
      password,
      login
    }
  }
}
</script>
