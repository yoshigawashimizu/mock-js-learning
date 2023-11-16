import Vue from 'vue'
import VueRouter from 'vue-router'
import MockjsComp from '@/components/MockjsComp.vue'// 导入组件: mockjs练习用组件页面
import FormComp from '@/components/FormComp.vue' // 导入组件: 新闻列表的增删改查页面

Vue.use(VueRouter)

// 配置路由
const routes = [
  { path: '/mockjs', name: 'mock-js-comp', component: MockjsComp }, // mockjs练习用组件页面
  { path: '/', name: 'form-comp', component: FormComp } // 新闻列表的增删改查页面
]

const router = new VueRouter({
  routes
})

export default router
