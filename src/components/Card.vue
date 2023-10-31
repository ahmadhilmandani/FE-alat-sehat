<script setup>
defineProps({
  dataProduct: Object
})
</script>

<template>
  <div class="w-[320px] h-[540px] flex flex-col justify-between">
    <div>
      <div class="p-8 border border-brand-blue-100 rounded-xl w-full aspect-square mb-3">
        <div class="w-full h-full rounded-lg object-cover bg-cover bg-center"
          :style="`background-image: url(${dataProduct.product_thumbnail})`"></div>
      </div>
      <h2 class="uppercase mb-2 line-clamp-2">{{ dataProduct.product_name }}</h2>
      <h2 class="font-bold mb-2">Rp. {{ dataProduct.product_price }}</h2>
      <div class="text-gray-400 mb-2">Lokasi toko <strong>{{ dataProduct.city_name }}</strong></div>
      <div class="text-gray-400 mb-5">Tersisi {{ dataProduct.product_stock }} buah</div>
    </div>
    <div class="flex gap-3">
      <router-link :to="`/product/${dataProduct.product_id}/${dataProduct.user_id}`"
        class="block capitalize px-3 py-3 rounded-md border border-brand-blue-300 text-brand-blue-300 bg-brand-white-50 hover:shadow-xl hover:shadow-brand-blue-300/30 hover:-translate-y-2 transition-all">
        Lihat Detail
      </router-link>

      <slot name="tambahKeranjang" />
    </div>
  </div>
</template>