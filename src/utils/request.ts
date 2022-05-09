import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/index'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户 token
  const user = store.state.user
  const headers = config.headers as AxiosRequestHeaders
  if (user && user.token) {
    headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 控制登录过期的锁
let isRefreshing: boolean = false

// 响应拦截器
request.interceptors.response.use(function (response) {
  const status = response.data.status
  if (!status || status === 200) {
    // 正确的情况
    return response
  }

  // 错误情况
  // 统一处理登录过期
  if (status === 41000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm('您的登录状态已过期，你可以取消停留在此页面，或重新登录', '登录过期', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      // 确定
      // 清除过期的本地状态
      store.commit('setUser', null)
      // 跳转到 登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).finally(() => {
      isRefreshing = false
    })
    // 在内部消化掉这个业务异常
    return Promise.reject(response)
  }
  // 其他情况
  ElMessage.error(response.data.msg || '请求失败请稍后重试')
  // 手动返回一个 Promise 异常
  return Promise.reject(response.data)
  // if (response.data.status && response.data.status !== 200) {
  //   ElMessage.error(response.data.msg || '请求失败请稍后重试')
  //   // 手动返回一个 Promise 异常
  //   return Promise.reject(response.data)
  // }
  // // 同一处理接口响应错误
  // return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
