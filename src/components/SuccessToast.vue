<script setup>
const props = defineProps(['detailMsg'])

</script>

<template>
  <div class="bg-brand-blue-400/60 fixed top-0 left-0 right-0 bottom-0 h-screen z-[999]">
    <div class="fixed top-10 left-5 z-[1000] rounded-lg bg-emerald-300 px-8 py-4 shadow-2xl text-xl">
      {{ detailMsg }}
    </div>
  </div>
</template>