import Vue from "vue";
import App from "./App.vue";
import ReactiveSearch from "@appbaseio/reactivesearch-vue";

Vue.use(ReactiveSearch);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
