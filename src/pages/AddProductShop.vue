<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { IconArrowLeft } from '@tabler/icons-vue'
import SuccessToast from '../components/SuccessToast.vue';


const shopId = localStorage.getItem("id_user")
const isLoading = ref(false)
const isShowToast = ref(false)

const categoryId = ref(null)
const name = ref(null)
const price = ref(null)
const description = ref(null)
const thumbnail = ref(null)
const stock = ref(null)


function showToast() {
  isShowToast.value = true

  setTimeout(() => {
    isShowToast.value = false;
    location.reload();
    this.$router.push({ name: 'Home' })

  }, 5000)
}


async function addProduct() {
  isLoading.value = true
  await axios.post('http://localhost:5020/api/shop/product', {
    categoryId: categoryId.value,
    name: name.value,
    price: price.value,
    description: description.value,
    thumbnail: thumbnail.value,
    stock: stock.value,
    shopId: shopId,
  }).then((response) => {
    console.log(response.data)
    showToast();
  }).catch((error) => {
    console.log(error)
  }).finally(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="w-full min-h-screen mt-10">
    <div class="relative">
      <main>
        <header class="flex gap-5 items-center">
          <router-link to="/shop" class="block hover:p-2 hover:bg-brand-blue-400/5 transition-all rounded-full">
            <IconArrowLeft size="32" />
          </router-link>
          <h1 class="text-4xl font-semibold">Tambah Produk</h1>
        </header>
        <div class="w-full rounded-2xl mt-7 bg-brand-blue-50 grid grid-cols-4 p-10 gap-10 grid-flow-row auto-rows-min">
          <div class="flex flex-col justify-start gap-3 items-start col-span-2">
            <label class="font-semibold" for="">Nama</label>
            <input type="text" v-model="name"
              class="outline-none border border-brand-blue-300 rounded-md px-3 py-2 w-full">
          </div>
          <div class="flex flex-col justify-start gap-3 items-start">
            <label class="font-semibold" for="">Category</label>
            <select name="" id="" @change="(e) => { categoryId = e.target.value }"
              class="outline-none border border-brand-blue-300 rounded-md px-3 py-2 w-full">
              <option value="1">diagnostik</option>
              <option value="2">bedah</option>
              <option value="3">terapi</option>
              <option value="4">laboratorium</option>
              <option value="5">mpbilitas</option>
              <option value="6">obat</option>
              <option value="7">injeksi</option>
            </select>
          </div>
          <div class="flex flex-col justify-start gap-3 items-start">
            <label class="font-semibold" for="">Harga</label>
            <input type="number" v-model="price"
              class="outline-none border border-brand-blue-300 rounded-md px-3 py-2 w-full">
          </div>
          <div class="flex flex-col justify-start gap-3 items-start">
            <label class="font-semibold" for="">Stok</label>
            <input type="number" v-model="stock"
              class="outline-none border border-brand-blue-300 rounded-md px-3 py-2 w-full">
          </div>
          <div class="flex flex-col justify-start gap-3 items-start col-span-3">
            <label class="font-semibold" for="">Link</label>
            <input type="text" v-model="thumbnail"
              class="outline-none border border-brand-blue-300 rounded-md px-3 py-2 w-full">
          </div>
          <div class="flex flex-col justify-start gap-3 items-start col-span-4">
            <label class="font-semibold" for="">Deksripsi</label>
            <textarea id="w3review" name="w3review" rows="4" cols="50"
              class="outline-none border border-brand-blue-300 rounded-md px-3 py-2 w-full"
              @change="(e) => { description = e.target.value }"></textarea>
          </div>
          <button @click="addProduct"
            class="col-span-4 py-4 bg-brand-blue-300 rounded-lg text-white font-bold uppercase text-xl">
            Tambah produk
          </button>
        </div>
      </main>
      <SuccessToast v-if="isShowToast" detailMsg="Anda berhasil menambahkan produk!" />
    </div>
  </div>
</template>