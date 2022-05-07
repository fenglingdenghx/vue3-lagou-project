import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api/admin'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户 token
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 同一处理接口响应错误
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return res.data.data as T
  })
}
