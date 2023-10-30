<script setup>
import { IconTrash } from '@tabler/icons-vue';
import { IconPencil } from '@tabler/icons-vue';
import axios from 'axios'
import { ref, onMounted } from 'vue';

const dataCart = ref(null)
const isLoading = ref(true)
const refactorDataCart = ref([])
const isChecked = ref(null)

function checkout(paramPaymentMethod) {
  axios.post(`http://localhost:5020/api/user/checkout/${isChecked.value}/${localStorage.getItem('id_user')}`, {
    paymentMethod: paramPaymentMethod
  }).then((respone) => {
    console.log(respone)
  }).catch((error) => {
    console.log(error)
  })

  location.reload();
}

onMounted(async () => {
  await axios.get('http://localhost:5020/api/user/carts/' + localStorage.getItem("id_user"))
    .then((respone) => {
      dataCart.value = respone.data
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      isLoading.value = false
    })

  for (let index = 0; index < dataCart.value.length; index++) {
    if (index == 0) {
      refactorDataCart.value.push({
        shop_id: dataCart.value[index].shop_id,
        shop_name: dataCart.value[index].user_name,
        product_data: [
          {
            product_id: dataCart.value[index].product_id,
            product_name: dataCart.value[index].product_name,
            quantity: dataCart.value[index].cart_quantity,
            total_price: dataCart.value[index].cart_total_price,
          }
        ]
      })
    }


    else if (dataCart.value[index].shop_id == dataCart.value[index - 1].shop_id) {
      refactorDataCart.value[refactorDataCart.value.length - 1].product_data.push({
        product_id: dataCart.value[index].product_id,
        product_name: dataCart.value[index].product_name,
        quantity: dataCart.value[index].cart_quantity,
        total_price: dataCart.value[index].cart_total_price,
      })
    }

    else {
      refactorDataCart.value.push({
        shop_id: dataCart.value[index].shop_id,
        shop_name: dataCart.value[index].user_name,
        product_data: [
          {
            product_id: dataCart.value[index].product_id,
            product_name: dataCart.value[index].product_name,
            quantity: dataCart.value[index].cart_quantity,
            total_price: dataCart.value[index].cart_total_price,
          }
        ]
      })
    }
  }
})
console.log(refactorDataCart.value)
</script>

<template>
  <div class="w-full mt-10 relative mb-32">
    <div class="border border-brand-blue-200 p-10 mt-10" v-for="item, index in refactorDataCart" :key="index">
      <div class="flex gap-2 border-b border-brand-blue-100 py-3">
        <input type="radio" name="shop" :id="index" :value="item.shop_id" @change="(e) => {
          isChecked = e.target.value
        }">
        <label :for="index" class="text-xl font-semibold">{{ item.shop_name }}</label>
      </div>
      <div class="overflow-auto rounded-lg shadow hidden md:block mt-4">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">No</th>
              <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Nama Produck</th>
              <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Quantity</th>
              <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Total</th>
              <th class="w-20 p-3 text-base font-semibold tracking-wide text-left">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item, index in item.product_data" :key="index">
              <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ ++index }}</td>
              <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ item.product_name }}</td>
              <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ item.quantity }}</td>
              <td class="p-3 text-base text-gray-700 whitespace-nowrap">{{ item.total_price }}</td>
              <td class="p-3 text-base text-gray-700 whitespace-nowrap flex gap-5">
                <div class="p-2 rounded-full cursor-pointer bg-brand-blue-100">
                  <IconPencil size="24" />
                </div>
                <div class="p-2 rounded-full cursor-pointer bg-rose-300">
                  <IconTrash size="24" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 text-center font-bold text-xl  flex justify-between">
      <button 
      @click="() => { 
        checkout('prepaid') 
        this.$router.push({ name: 'Home' }) 
        }" class="flex-1 py-8"
        :class="!isChecked ? 'bg-gray-300 text-gray-600' : 'bg-brand-blue-50 text-brand-blue-400'">
        Prepaid Checkout
      </button>
      <button @click="() => { 
        checkout('postpaid') 
        this.$router.push({ name: 'Home' }) 
        }" class="flex-1 py-8"
        :class="!isChecked ? 'bg-gray-400 text-gray-600' : 'bg-brand-blue-300 text-white'">
        Postpaid Checkout
      </button>
    </div>
  </div>
</template>