import { createApp } from "vue";
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "./store";
console.log("🚀 ~ file: main.ts ~ line 3 ~ App", App)
// import App from "./newComponents/App";
// App.mount("#app")

const vm = createApp(App).use(createRouter({
  history:createWebHistory(),
  routes,
})).use(store).mount("#app");
console.log("🚀 ~ file: main.ts ~ line 7 ~ vm", vm)
