import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 将事件总线方法加入Vue中
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast);

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  // 图片未加载时，使用的图片
  // loading: require('./assets/img/common/collect.svg')
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
