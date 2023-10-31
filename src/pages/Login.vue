<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

const isLoading = ref(false)
const email = ref(null)
const password = ref(null)


const login = async () => {
  isLoading.value = true
  await axios.post('http://localhost:5020/api/auth/login', { email: email.value, password: password.value })
    .then((response) => {
      console.log(response.data)
      localStorage.setItem("isLogin", true)
      localStorage.setItem("name", response.data[0].name)
      localStorage.setItem("id_user", response.data[0].id_user)
      localStorage.setItem("role", response.data[0].role)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false
    });

    location.reload();
}


</script>

<template>
  <div class="w-full mt-5 flex justify-center items-center">
    <main class="w-full rounded-md bg-brand-blue-50 p-20 flex flex-col justify-center items-center">
      <h1 class="uppercase text-5xl font-semibold mb-3 tracking-wide">login</h1>
      <div class="mt-10 flex flex-col justify-center items-center">
        <label for="">Email</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" placeholder="budixyz@gmail.com" type="text" v-model="email">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">password</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" placeholder="contohPasswordKuat" type="password"
          v-model="password">
      </div>
      <button
        class="rounded-full mt-10 px-8 py-3 w-[560px] uppercase text-center text-xl font-semibold bg-brand-blue-300 text-white hover:shadow-xl hover:shadow-brand-blue-300/70 hover:-translate-y-2 transition-all"
        @click="() => {
          login()
          this.$router.push({ name: 'Home' })
        }">
        login
      </button>
    </main>
  </div>
</template>
