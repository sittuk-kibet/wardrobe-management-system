<template>
  <div>
    <h3>Register</h3>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div>
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" v-model="password_confirmation" id="password_confirmation" required />
      </div>
      <button type="submit">Register</button>
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
    const password_confirmation = ref('')

    const register = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value
          })
        })

        const data = await response.json()

        if (data.token) {
          localStorage.setItem('token', data.token)  // Store the token
          store.commit('setLoginStatus', true)  // Update login state in Vuex
        }
      } catch (error) {
        console.error('Registration failed:', error)
      }
    }

    return {
      email,
      password,
      password_confirmation,
      register
    }
  }
}
</script>
