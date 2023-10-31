<script setup>
import { onMounted, ref } from 'vue';
import Card from '../components/Card.vue';
import axios from 'axios';

const dataProduct = ref(null)
const showPopUpAddToCart = ref(false)
const showPopUpProductId = ref(null)
const showPopUpShopId = ref(null)
const dataPopUp = ref(null)
const quantity = ref(0)

function popUpAddToCart() {
  axios.get(`http://localhost:5020/api/user/product/${showPopUpProductId.value}/${showPopUpShopId.value}`)
    .then((response) => {
      dataPopUp.value = response.data
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      // isLoading.value = false
    })
}

function storeToCart() {
  // isLoading.value = true
  axios.post('http://localhost:5020/api/user/cart', {
    productId: showPopUpProductId.value,
    userId: localStorage.getItem("id_user"),
    shopId: showPopUpShopId.value,
    quantity: quantity.value,
    price: dataPopUp.value[0].product_price
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  }).finally(() => {
    // isLoading.value = false
  })
}

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
  <div class="w-full mt-5 relative">
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
        <Card v-for="item in dataProduct" :dataProduct="item">
          <template #tambahKeranjang>
            <button @click="() => {
              showPopUpAddToCart = true
              showPopUpProductId = item.product_id
              showPopUpShopId = item.user_id
              popUpAddToCart()
            }"
              class="block flex-1 text-center capitalize px-3 py-3 rounded-md border bg-brand-blue-300 border-brand-blue-300 text-brand-white-50 font-semibold hover:shadow-xl hover:shadow-brand-blue-300/70 hover:-translate-y-2 transition-all">
              Tambah ke Keranjang
            </button>
          </template>
        </Card>
      </main>
    </div>

    <div v-if="showPopUpAddToCart" id="main-container" @click="() => { showPopUpAddToCart = false }"
      class="bg-brand-blue-400/80 fixed top-0 bottom-0 left-0 right-0 z-[99] flex justify-center items-center">
      <div class="w-[380px] h-[600px] flex flex-col justify-between bg-brand-white-50 rounded-md p-4" @click.stop>
        <div>
          <div class="p-8 border border-brand-blue-100 rounded-xl w-full aspect-square mb-3">
            <div class="w-full h-full rounded-lg object-cover bg-cover bg-center"
              :style="`background-image: url(${dataPopUp[0].product_thumbnail})`"></div>
          </div>
          <h2 class="uppercase mb-2 line-clamp-2">{{ dataPopUp[0].product_name }}</h2>
          <h2 class="font-bold mb-2">Rp. {{ dataPopUp[0].product_price }}</h2>
          <div class="text-gray-400 mb-2">Lokasi toko <strong>{{ dataPopUp[0].city_name }}</strong></div>
          <div class="text-gray-400 mb-5">Tersisi {{ dataPopUp[0].product_stock }} buah</div>
        </div>
        <div class="flex gap-3">
          <input type="number" name="quantity" id="quantity" v-model="quantity"
            class="rounded-full px-4 py-2 outline-0 border border-brand-blue-300" placeholder="1">
          <button @click="()=>{
            storeToCart()
            showPopUpAddToCart = false
            }"
            class="block flex-1 capitalize px-3 py-3 rounded-md border border-brand-blue-300 text-brand-white-50 font-bold bg-brand-blue-300 hover:shadow-xl hover:shadow-brand-blue-300/30 hover:-translate-y-2 transition-all">
            Tambakan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>