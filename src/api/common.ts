/**
 * 公共基础
 */

import request from '../utils/request'
import { ILoginInfo } from './types/common'

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
