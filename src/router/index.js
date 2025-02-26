import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClothingForm from '../components/Clothing/ClothingForm.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/add-clothing',
    component: ClothingForm,
    meta: { requiresAuth: true }  // Protected route
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check if the route requires authentication
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')  // Redirect to login if not authenticated
  } else {
    next()
  }
})

export default router
