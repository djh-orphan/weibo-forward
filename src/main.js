import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// axios.defaults.withCredentials = true

const vm = createApp(App).use(store).use(router).use(ElementPlus)
axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  // 这个是处理响应失败的，也就是响应错误的，在这个箭头函数中，才能拿到401状态下的包
  if (error.response.status === 401) {
    router.replace({
      path: '/home',
    })
  }
  return Promise.reject(error);
})
vm.use(VueAxios, axios).mount('#app')
