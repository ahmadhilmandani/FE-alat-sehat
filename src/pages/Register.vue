<script setup>
import SuccessToast from '../components/SuccessToast.vue';
const props = defineProps(['role'])

import axios from 'axios';
import { ref } from 'vue';

const isLoading = ref(false)
const isError = ref(null)

const email = ref(null)
const name = ref(null)
const dateBirth = ref(null)
const paypalId = ref(null)
const password = ref(null)
const confPassword = ref(null)
const addreas = ref(null)
const cityId = ref(null)
const contact = ref(null)
const isShowToast = ref(false)

function showToast() {
  isShowToast.value = true

  setTimeout(() => {
    isShowToast.value = false;
    this.$router.push({ name: 'Home' })
  }, 5000)
}


const register = async () => {
  isLoading.value = true
  await axios.post('http://localhost:5020/api/auth/register/' + props.role,
    {
      email: email.value,
      password: password.value,
      name: name.value,
      confPassword: confPassword.value,
      dateBirth: dateBirth.value,
      addreas: addreas.value,
      cityId: cityId.value,
      contact: contact.value,
      paypalId: paypalId.value,
    })
    .then((response) => {
      console.log(response)
      isError.value = false

      showToast()
    })
    .catch((error) => {
      isError.value = true
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false
    });
}

</script>


<template>
  <div class="w-full mt-5 flex justify-center items-center relative">
    <main class="w-full rounded-md bg-brand-blue-50 p-20 flex flex-col justify-center items-center">
      <h1 class="uppercase text-5xl font-semibold mb-3 tracking-wide">Daftar sebagai {{ props.role }}</h1>
      <div class="mt-10 flex flex-col justify-center items-center">
        <label for="">Email</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" placeholder="budixyz@gmail.com" type="text" v-model="email">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">Name</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" placeholder="Budi Andi" type="text" v-model="name">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">Tanggal lahir</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" type="date" v-model="dateBirth">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">Alamat</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" type="text" v-model="addreas">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="cityId">Kota</label>
        <select name="cityId" id="cityId" @change="(e) => { cityId = e.target.value }"
          class="rounded-full mt-3 px-8 py-3 w-[560px]">
          <option value="null">pilih kota..</option>
          <option value="8">jakarta</option>
          <option value="9">malang</option>
          <option value="10">medan</option>
          <option value="6">sumenep</option>
          <option value="11">Surabaya</option>
        </select>
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">Kontak</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" type="text" v-model="contact">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">Paypal Id</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" type="text" v-model="paypalId">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">password</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" placeholder="contohPasswordKuat" type="password"
          v-model="password">
      </div>
      <div class="mt-5 flex flex-col justify-center items-center">
        <label for="">confPassword</label>
        <input class="rounded-full mt-3 px-8 py-3 w-[560px]" placeholder="contohPasswordKuat" type="password"
          v-model="confPassword">
      </div>
      <button
        class="rounded-full mt-10 px-8 py-3 w-[560px] uppercase text-center text-xl font-semibold bg-brand-blue-300 text-white hover:shadow-xl hover:shadow-brand-blue-300/70 hover:-translate-y-2 transition-all"
        @click="() => {
          register()
          // this.$router.push({ name: 'Home' })
        }">
        Register
      </button>
      <SuccessToast v-if="isShowToast == true" detailMsg="Akun anda berhasil dibuat! silahkan login" />
    </main>

  </div>
</template>
