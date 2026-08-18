import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import store from '@/store'
import 'mavon-editor/dist/css/index.css'
import { OnesayApi } from "@/api";
// use
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

async function getOnesay() {
  const res = await OnesayApi;
  // console.log(res)
  store.commit('getOnesay', res.data.hitokoto);
}
getOnesay()


// import { timeLineApi } from '@/api'
// async function myfun() {
//   const res = await timeLineApi({userId:1});
//   console.log('----------------------------------')
//   console.log(res.data.data);
// }
// myfun()
