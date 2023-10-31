<script setup>
import { IconTrash } from '@tabler/icons-vue';
import { IconPencil } from '@tabler/icons-vue';
import axios from 'axios'
import { ref, onMounted } from 'vue';
import SuccessToast from '../components/SuccessToast.vue';

const dataCart = ref(null)
const isLoading = ref(true)
const refactorDataCart = ref([])
const isChecked = ref(null)

const isShowToast = ref(false)
const toastMessage = ref('')

const isUpdateModalShow = ref(false)
const detailCartData = ref(null)

function showToast() {
  isShowToast.value = true
  setTimeout(() => {
    isShowToast.value = false;
    location.reload();
  }, 5000)
}

function checkout(paramPaymentMethod) {
  isLoading.value = true
  axios.post(`http://localhost:5020/api/user/checkout/${isChecked.value}/${localStorage.getItem('id_user')}`, {
    paymentMethod: paramPaymentMethod
  }).then((respone) => {
    console.log(respone)
    toastMessage.value = "Berhasil melakukan checkout, cek email anda!"
    showToast()
  }).catch((error) => {
    console.log(error)
  }).finally(() => {
    isLoading.value = false
  })
}

function deleteProduct(paramsCartId) {
  isLoading.value = true
  axios.delete(`http://localhost:5020/api/user/cart/${paramsCartId}`)
    .then((respone) => {
      toastMessage.value = "Berhasil menghapus, tunggu sebentar!"
      showToast()
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      isLoading.value = false
    })
}

function getDetailCard(paramsCartId) {
  isUpdateModalShow.value = true
  axios.get(`http://localhost:5020/api/user/cart/${paramsCartId}`)
    .then((respone) => {
      detailCartData.value = respone.data
      console.log(respone.data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      isLoading.value = false
    })
}

function updateProduct(paramsCartId) {
  isLoading.value = true
  axios.patch(`http://localhost:5020/api/user/cart/${paramsCartId}`, {
    quantity: detailCartData.value[0].cart_quantity,
    price: detailCartData.value[0].product_price,
  })
    .then((respone) => {
      toastMessage.value = "Berhasil mengupdate, tunggu sebentar!"
      showToast()
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      isLoading.value = false
    })
}

onMounted(async () => {
  await axios.get('http://localhost:5020/api/user/carts/' + localStorage.getItem("id_user"))
    .then((respone) => {
      console.log(respone.data)
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
            cart_id: dataCart.value[index].cart_id,
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
        cart_id: dataCart.value[index].cart_id,

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
            cart_id: dataCart.value[index].cart_id,

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
                <div class="p-2 rounded-full cursor-pointer bg-brand-blue-100" @click="() => { getDetailCard(item.cart_id) }">
                  <IconPencil size="24" />
                </div>
                <div class="p-2 rounded-full cursor-pointer bg-rose-300 hover:bg-red-300/50 transition-all"
                  @click="() => { deleteProduct(item.cart_id) }">
                  <IconTrash size="24" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 text-center font-bold text-xl  flex justify-between">
      <button @click="() => {
        checkout('prepaid')
      }" class="flex-1 py-8"
        :class="!isChecked ? 'bg-gray-300 text-gray-600' : 'bg-brand-blue-50 text-brand-blue-400'">
        Prepaid Checkout
      </button>
      <button @click="() => {
        checkout('postpaid')
      }" class="flex-1 py-8" :class="!isChecked ? 'bg-gray-400 text-gray-600' : 'bg-brand-blue-300 text-white'">
        Postpaid Checkout
      </button>
    </div>

    <div v-if="isUpdateModalShow" id="main-container" @click="() => { isUpdateModalShow = false }"
      class="bg-brand-blue-400/80 fixed top-0 bottom-0 left-0 right-0 z-[99] flex justify-center items-center">
      <div class="w-[380px] flex flex-col justify-between bg-brand-white-50 rounded-md p-10" @click.stop>
        <div>
          <h2 class="uppercase mb-2 line-clamp-2 text-center">{{ detailCartData[0].product_name }}</h2>
          <div class="mb-5">
            <label for="">Jumlah</label>
            <input type="number" :value="detailCartData[0].cart_quantity"
              @change="(e) => { detailCartData[0].cart_quantity = e.target.value }"
              class="mt-2 rounded-full w-full px-4 py-2 outline-0 border border-brand-blue-300">
          </div>
          <div class="mb-5">
            <label for="">Harga</label>
            <input type="number" :value="detailCartData[0].product_price" disabled
              class="mt-2 rounded-full w-full px-4 py-2 outline-0 border border-brand-blue-300">
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="() => {
            updateProduct(detailCartData[0].cart_id)
            isUpdateModalShow = false
          }"
            class="block flex-1 capitalize px-3 py-3 rounded-md border border-brand-blue-300 text-brand-white-50 font-bold bg-brand-blue-300 hover:shadow-xl hover:shadow-brand-blue-300/30 hover:-translate-y-2 transition-all mt-5">
            Ubah
          </button>
        </div>
      </div>
    </div>


    <SuccessToast v-if="isShowToast" :detailMsg="toastMessage" />
  </div>
</template>