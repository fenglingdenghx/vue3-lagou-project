/**
 * 公共基础
 */

import request from '../utils/request'
import { ILoginInfo, ILoginResponents } from './types/common'

// interface ResponseData<T = any> {
//   status: number,
//   msg: string
//   data: T
// }

export const getLoginInfo = () => {
  return request<ILoginInfo>({
    method: 'get',
    url: '/login/info'
  })
}

// 获取验证码
export const getCaptcha = () => {
  return request<Blob>({
    method: 'get',
    url: '/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob' // 请求获取图片数据
  })
}

// 登录
export const login = (data: {
  account: string,
  pwd: string,
  imgcode: string
 }) => {
  return request<ILoginResponents>({
    method: 'post',
    url: '/login',
    data
  })
}

// 退出
export const logout = () => {
  return request({
    method: 'get',
    url: '/setting/admin/logout'
  })
}
