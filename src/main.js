import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 将事件总线方法加入Vue中
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
