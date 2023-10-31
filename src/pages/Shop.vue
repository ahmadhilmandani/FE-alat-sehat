<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const dataProduct = ref(null)
const shopId = localStorage.getItem("id_user")
const isLoading = ref(true)

onMounted(() => {
  axios.get(`http://localhost:5020/api/shop/products/${shopId}`)
    .then((response) => {
      dataProduct.value = response.data.data
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
      dataProduct.value = null
    })
    .finally(() => {
      isLoading.value = false
    })
})

</script>


<template>
  <div class="w-full min-h-screen mt-10">
    <div class="relative w-full">
      <main>
        <header class="flex justify-between">
          <h1 class="text-4xl font-semibold">Produk</h1>
          <router-link to="/shop/add"
            class="flex gap-3 items-center font-semibold px-6 p-3 mb-5 bg-brand-blue-300 rounded-md text-white">
            Tambah Produk +
          </router-link>
        </header>
        <div class="w-full rounded-2xl h-screen mt-7">
          <div class="overflow-auto rounded-lg shadow hidden md:block mt-4">
            <table class="w-full">
              <thead class="bg-brand-blue-50 border-b-2 border-gray-200">
                <tr>
                  <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">No</th>
                  <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Nama Produck</th>
                  <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Price</th>
                  <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Stock</th>
                  <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Link Thumbnail</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-if="!isLoading" v-for="item, index in dataProduct" :key="index">
                  <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ ++index }}</td>
                  <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ item.product_name }}</td>
                  <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ item.product_price }}</td>
                  <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ item.product_stock }}</td>
                  <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ item.product_thumbnail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-slate-50 px-5 py-3 rounded-md
}
</style>