import request from '../utils/request'
import { IRoleParams, IRoleItem, Menu } from './types/role'
// 列表
export const getRoles = (params: IRoleParams) => {
  return request<{
    count: number
    list: IRoleItem[]
  }>({
    method: 'get',
    url: '/setting/role',
    params
  })
}
// 删除
export const deleteRole = (id: number) => {
  return request({
    method: 'delete',
    url: `/setting/role/${id}`
  })
}

// 更新状态
export const updateRoleStatus = (id: number, status: 0 | 1) => {
  return request({
    method: 'put',
    url: `/setting/role/set_status/${id}/${status}`
  })
}
// 获取权限树
export const getMenus = () => {
  return request<{
    menus: Menu[]
  }>({
    method: 'get',
    url: '/setting/role/create'
  })
}
