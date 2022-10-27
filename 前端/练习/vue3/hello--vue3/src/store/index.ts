import { createStore } from "vuex";
import a from "./moudles/a";
export default createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state: abc) {
      state.count++;
    },
  },
  modules: {
    a,
  },
});

type abc = {
  count: number;
};
