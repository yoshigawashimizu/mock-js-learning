import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 以下的 mock 模块在打包上线是必须去除
import '@/mock/mockjs的基础语法.js' // 全局导入 mockjs 基础语法的练习文件
import '@/mock/index.js' // 将 mock/index.js 文件在 main.js 中导入

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
