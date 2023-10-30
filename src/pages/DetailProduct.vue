<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { IconArrowLeft, IconBuildingStore, IconFileDescription, IconCurrencyDollar } from '@tabler/icons-vue';

const props = defineProps(['productId', 'shopId'])

const detailProductData = ref(null)
const isLoading = ref(true)
const quantity = ref(null)

onMounted(() => {
  axios.get(`http://localhost:5020/api/user/product/${props.productId}/${props.shopId}`)
    .then((response) => {
      detailProductData.value = response.data
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      isLoading.value = false
    })
})


function storeToCart() {
  isLoading.value = true
  axios.post('http://localhost:5020/api/user/cart', {
    productId: detailProductData.value[0].product_id,
    userId: localStorage.getItem("id_user"),
    shopId: detailProductData.value[0].user_id,
    quantity: quantity.value,
    price: detailProductData.value[0].product_price
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  }).finally(() => {
    isLoading.value = false
  })
}

</script>

<template>
  <div v-if="isLoading"></div>
  <div v-else class="lg:flex items-start gap-10 w-full lg:p-12 p-4 lg:relative">
    <div class="lg:w-[50vw] lg:sticky z-[10] top-10 left-0">
      <h1 class="text-3xl md:text-4xl lg:text-5xl text-brand-blue font-semibold flex items-center gap-5">
        <router-link to="/" class="block hover:p-2 hover:bg-brand-blue-400/5 transition-all rounded-full">
          <IconArrowLeft size="32" />
        </router-link>
        {{ detailProductData[0].product_name }}
      </h1>
      <div class="flex flex-wrap items-center mt-10 gap-5">
        <div class="flex items-center gap-2 border-r pr-5 border-brand-blue-400">
          <div>stok:</div>
          <div class="font-semibold text-xl">{{ detailProductData[0].product_stock }}
          </div>
        </div>
        <div class="flex items-center gap-2 border-r pr-5 border-brand-blue-400">
          <div>terjual:</div>
          <div class="font-semibold text-xl">{{ detailProductData[0].product_sold }}</div>
        </div>
        <div class="flex items-center gap-2 pr-5">
          <div>Kategori :</div>
          <div class="font-semibold text-xl">{{ detailProductData[0].category_name }}</div>
        </div>
      </div>
      <div class="w-full aspect-video bg-cover bg-no-repeat bg-center mt-8"
        :style="`background-image: url(${detailProductData[0].product_thumbnail})`">
      </div>
    </div>
    <div class="flex-1">
      <div class="mt-6">
        <small class="text-lg tracking-wide">Price:</small>
        <div class="text-brand-blue-400 font-semibold text-4xl px-6 py-4 bg-brand-blue-50 mt-2">Rp.
          {{ detailProductData[0].product_price }}
        </div>
      </div>

      <div class="mt-10">
        <small class="text-lg tracking-wide flex items-center gap-3 text-brand-blue-400">
          Nama Toko:
        </small>
        <div class="text-brand-blue-400 font-semibold text-2xl mt-3 flex items-center gap-2">
          <div class="p-3 rounded-full bg-brand-blue-50 w-fit">
            <IconBuildingStore size="32" />
          </div>
          {{ detailProductData[0].user_name }}
        </div>
      </div>

      <div class="mt-10">
        <small class="text-lg tracking-wide flex items-center gap-3 text-brand-blue-400 mb-2">
          Deksripsi Product:
        </small>
        <p class="flex gap-3 items-start">
        <div class="p-3 rounded-full bg-brand-blue-50 w-fit">
          <IconFileDescription size="32" />
        </div>
        {{ detailProductData[0].product_description }}
        </p>
      </div>

      <div class="mt-10 flex gap-3 items-center">
        <label for="quantity" class="">
          Mau beli berapa banyak?
        </label>
        <input type="number" name="quantity" id="quantity" v-model="quantity"
          class="rounded-full px-4 py-2 outline-0 border border-brand-blue-300" placeholder="1">
      </div>

      <div class="mt-14">
        <button
          class="block w-full text-center capitalize px-3 py-3 rounded-md border bg-brand-blue-300 border-brand-blue-300 text-brand-white-50 font-semibold hover:shadow-xl hover:shadow-brand-blue-300/70 hover:-translate-y-2 transition-all"
          @click="() => {
            storeToCart()
            this.$router.push({ name: 'Home' })
          }">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  </div>
</template>