import { createRouter, createWebHistory } from "vue-router"
import Home from '../pages/Home.vue'
import DetailProduct from '../pages/DetailProduct.vue'
import Login from '../pages/Login.vue'
import Cart from '../pages/Cart.vue'
import RegisterOption from '../pages/RegisterOption.vue'
import Register from '../pages/Register.vue'
import Shop from '../pages/Shop.vue'
import AddProductShop from '../pages/AddProductShop.vue'

const routes = [
  { path: '/', name: "Home" ,component: Home },
  { path: '/product/:productId/:shopId', component: DetailProduct, props: true },
  { path: '/login', component: Login },
  { path: '/register', component: RegisterOption },
  { path: '/register/:role', component: Register, props:true },
  { path: '/cart', component: Cart },
  { path: '/login/shop', component: Cart },
  { path: '/shop', component: Shop },
  { path: '/shop/add', component: AddProductShop },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_SOME_KEY),
  routes,
})

export default router