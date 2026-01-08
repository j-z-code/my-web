import axios from 'axios'

// 创建axios实例，配置基础URL和超时时间
const request = axios.create({
  baseURL: 'https://your-mock-api.com/api', // 后期可替换为真实后端地址
  timeout: 10000 // 10秒超时
})

// 请求拦截器：可在发送请求前做点什么（如添加token）
request.interceptors.request.use(
  (config) => {
    // 示例：从localStorage读取token并添加到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：对响应数据做统一处理
request.interceptors.response.use(
  (response) => {
    // 如果后端有统一的数据包装，可在这里解构
    return response.data
  },
  (error) => {
    // 统一错误处理，如401跳登录页
    if (error.response?.status === 401) {
      console.error('未授权，请重新登录')
      // 可在此触发登出逻辑
    }
    return Promise.reject(error)
  }
)

export default request