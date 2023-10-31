<template>
  <div class="w-full mt-5 flex justify-center items-center">
    <main class="w-full rounded-md bg-brand-blue-50 p-20 flex flex-col justify-center items-center">
      <h1 class="uppercase text-5xl font-semibold mb-3 tracking-wide">Pilih dulu yuk, mau daftar sebagai apa nih!</h1>
      <div class="mt-5 flex gap-5 items-center justify-center">
        <router-link to="/register/user"
          class="px-9 py-3 rounded-full uppercase border bg-brand-blue-200 border-brand-blue-200 text-brand-blue-400 font-bold hover:bg-brand-blue-300 transition-all">
          user biasa
        </router-link>
        atau....
        <router-link to="/register/shop"
          class="px-9 py-3 rounded-full uppercase border bg-brand-blue-200 border-brand-blue-200 text-brand-blue-400 font-bold hover:bg-brand-blue-300 transition-all">
          toko
        </router-link>
      </div>
    </main>
  </div>
</template>
