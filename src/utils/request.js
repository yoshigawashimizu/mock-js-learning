// axios 的二次封装类
import axios from 'axios'

const http = axios.create({
  // 设置访问路径的前缀,即路径里通用的部分
  baseURL: '/api',

  // 请求超时时间 单位毫秒
  timeout: 10000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
// 在方式请求之前做什么
  return config
}, function (error) {
// 在方式请求错误做什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
// Any status code that lie within the range of 2xx cause this function to trigger
// 对响应数据做什么
  return response
}, function (error) {
// Any status codes that falls outside the range of 2xx cause this function to trigger
// 对响应错误做什么
  return Promise.reject(error)
})

export default http
