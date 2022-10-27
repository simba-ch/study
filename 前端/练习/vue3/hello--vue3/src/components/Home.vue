<script setup lang="ts">
import { ref, computed, } from 'vue'
import { useRouter, useRoute } from "vue-router";
const Router = useRouter();
console.log("🚀 ~ file: Home.vue ~ line 5 ~ Router", Router)
console.log(Router.getRoutes())
const Route = useRoute();
console.log("🚀 ~ file: Home.vue ~ line 7 ~ Route", Route)
const username = computed(() => Route.params.username)
</script>

<template>
  <h1>Home</h1>
  <p>{{ username }}</p>
</template>

