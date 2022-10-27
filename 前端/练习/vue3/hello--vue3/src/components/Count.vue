<script setup lang="ts">
import { ref,computed } from 'vue'
import { useStore } from "vuex";
const store = useStore();
const count = computed(() => store.state.count)
const a = computed(() => store.state.a.a)
function increment() {
  store.commit('increment')
}

function changeA() {
  store.commit('a/changeA')
}
</script>

<template>
  <h1>COUNT</h1>
  <p>{{count}}</p>
  <p>{{a}}</p>
  <button @click="increment">increment</button>
  <button @click="changeA">changeA</button>
</template>

<style scoped lang="scss">
</style>