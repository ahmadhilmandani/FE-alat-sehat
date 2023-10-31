<script setup>
import { IconShoppingCart } from '@tabler/icons-vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const isLogin = ref(localStorage.getItem("isLogin"))
const role = ref(localStorage.getItem('role'))

async function logout() {
  await axios.get('http://localhost:5020/api/auth/logout')
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })

  localStorage.clear();

  location.reload();

}

onMounted(() => {
  isLogin.value = localStorage.getItem("isLogin")
})

</script>

<template>
  <nav
    class="w-full sticky top-0 z-50 bg-brand-white-50 flex items-center justify-between py-5 border-b border-brand-blue-100">
    <router-link to="/" class="cursor-pointer">
      <img src="../assets/alat-sehat.svg" alt="logo-alat-sehat">
    </router-link>
    <div class="flex gap-5">
      <router-link v-if="!isLogin" to="/register"
        class="px-9 py-3 rounded-full uppercase border border-brand-blue-400 text-brand-blue-400 hover:bg-slate-200 transition-all">
        daftar
      </router-link>
      <router-link v-if="!isLogin" to="/login"
        class="px-9 py-3 rounded-full uppercase bg-brand-blue-100 text-brand-blue-400 font-bold hover:bg-brand-blue-300 hover:text-white transition-all">
        Login
      </router-link>
      <div v-else class="flex gap-10 items-center">
        <router-link to="/cart" class="flex gap-2 uppercase">
          CART (0)
          <IconShoppingCart stroke-width="1.5" />
        </router-link>

        <router-link to="/shop" v-if="role == 'shop'"
          class="rounded-full px-9 py-3 uppercase font-bold bg-emerald-100 text-emerald-500 hover:bg-emerald-200/70">
          Dashboard Toko
        </router-link>

        <button class="rounded-full px-9 py-3 uppercase font-bold bg-red-200 text-red-500 hover:bg-red-200/70" @click="() => {
          console.log('click');
          logout();
          this.$router.push({ name: 'Home' });
        }">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
