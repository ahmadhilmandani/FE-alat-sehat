<script setup>
import { onMounted, ref } from 'vue';
import Card from '../components/Card.vue';
import axios from 'axios';

const dataProduct = ref(null)

onMounted(() => {
  axios.get('http://localhost:5020/api/user/products')
    .then((response) => {
      dataProduct.value = response.data
    })
    .catch((error) => {
      console.log(error)
      dataProduct.value = null
    })
    .finally(() => {

    })
})
</script>

<template>
  <div class="w-full min-h-[300vh] mt-5">
    <header class="bg-brand-blue-50 rounded-xl text-center py-20 text-brand-blue-400 mb-10">
      <h1 class="uppercase text-5xl font-semibold mb-8 tracking-wide">Selamat datang!</h1>
      <p class="w-[50%] mx-auto text-xl"> Kami siap memberikan layanan terbaik dan produk berkualitas untuk menjaga
        kesehatan Anda. Yuk kita <i>scroling-scrolling</i> bareng untuk menemukan alat alat kesehatan terbaik untuk kita!
        👇</p>
    </header>

    <div class="flex gap-3 relative w-full">
      <aside class="w-1/4 border-r border-brand-blue-100 h-[400px] overflow-y-auto px-10 mr-5">
        <h2 class="font-bold">FILTER KATEGORI PRODUK</h2>
        <div class="flex gap-3 mt-2 text-lg">
          <input type="radio" name="category" id="1" value="1">
          <label for="1">diagnostik</label>
        </div>
        <div class="flex gap-3 mt-2 text-lg">
          <input type="radio" name="category" id="2" value="2">
          <label for="2">bedah</label>
        </div>
        <div class="flex gap-3 mt-2 text-lg">
          <input type="radio" name="category" id="3" value="3">
          <label for="3">laboratorium</label>
        </div>
        <div class="flex gap-3 mt-2 text-lg">
          <input type="radio" name="category" id="4" value="4">
          <label for="4">mobilitas</label>
        </div>
        <div class="flex gap-3 mt-2 text-lg">
          <input type="radio" name="category" id="5" value="5">
          <label for="5">obat</label>
        </div>
        <div class="flex gap-3 mt-2 text-lg">
          <input type="radio" name="category" id="6" value="6">
          <label for="6">injeksi</label>
        </div>
      </aside>
      <main class="grid grid-cols-3 gap-8">
        <Card v-for="item in dataProduct" :dataProduct="item" />
      </main>
    </div>
  </div>
</template>