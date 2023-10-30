<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="bg-brand-white-50 w-full min-h-screen px-20 py-10 relative">
    <Navbar />
    <router-view />
  </div>
</template>
