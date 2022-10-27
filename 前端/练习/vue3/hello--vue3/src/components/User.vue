<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink,useLink } from "vue-router";
console.log("🚀 ~ file: User.vue ~ line 4 ~ RouterLink", RouterLink)
const link = useLink(RouterLink.props)
console.log("🚀 ~ file: User.vue ~ line 6 ~ link", link)
</script>

<template>
  <h1>User</h1>
  <router-link :to="{name:'Profile'}">Profile</router-link>
  <br>
  <router-link :to="{name:'Posts'}">Posts</router-link>

  <router-view></router-view>
</template>

<style scoped lang="scss">
</style>