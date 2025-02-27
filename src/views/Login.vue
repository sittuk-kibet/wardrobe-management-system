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
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>  <!-- Display error message -->
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRouter } from 'vue-router'  // Import the Vue Router for redirection

export default {
  setup() {
    const store = useStore()
    const router = useRouter()  // Use router for navigation
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')  // Track error messages

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

        if (response.ok && data.token) {
          localStorage.setItem('token', data.token)  // Store the token
          store.commit('setLoginStatus', true)  // Update login state in Vuex

          // Redirect to the intended route or home
          const redirectTo = router.currentRoute.value.query.redirect || '/';
          router.push(redirectTo);  // Redirect the user after login
        } else {
          errorMessage.value = data.message || 'Login failed. Please try again.'  // Show error message
        }
      } catch (error) {
        console.error('Login failed:', error)
        errorMessage.value = 'An error occurred. Please try again later.'  // Show generic error message
      }
    }

    return {
      email,
      password,
      login,
      errorMessage  // Return error message for the template
    }
  }
}
</script>
