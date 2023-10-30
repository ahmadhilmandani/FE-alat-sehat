import { createRouter, createWebHistory } from "vue-router"
import Home from '../pages/Home.vue'
import DetailProduct from '../pages/DetailProduct.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', name: "Home" ,component: Home },
  { path: '/product/:productId/:shopId', component: DetailProduct, props: true },
  { path: '/login', component: Login },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_SOME_KEY),
  routes,
})

export default router