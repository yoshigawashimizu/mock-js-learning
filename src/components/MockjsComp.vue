<template>
  <div>
    我是mockjscomp
  </div>
</template>

<script>
import axios from 'axios'// 导入 axios, 用于发送请求

export default {
  name: 'mock-js-component',
  methods: {
    /** 发送 get 请求, 获取数据 */
    async getDataByGet () {
      const { data } = await axios.get('/api/get/news') // 发送 get 请求, 获取数据
      console.log(data)
    },

    /** 发送 post 请求, 获取数据 */
    async getDataByPost () {
      const { data } = await axios.post('/api/post/news') // 发送 post 请求, 获取数据
      console.log(data)
    }
  },
  mounted () {
    this.getDataByGet() // 页面加载完成时获取调用 getDataByGet方法
    this.getDataByPost() // 页面加载完成时获取调用 getDataByPost方法
  }
}
</script>

<style>

</style>
