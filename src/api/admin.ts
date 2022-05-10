
import request from '../utils/request'
import { IListParams, IAdmin, AdminPostData } from './types/admin'
import { IFormData } from './types/form'
// 列表
export const getAdmins = (params: IListParams) => {
  return request<{
    count: number
    list: IAdmin[]
  }>({
    method: 'get',
    url: '/setting/admin',
    params
  })
}

// 添加管理员
export const createAdmin = (data: AdminPostData) => {
  return request({
    method: 'post',
    url: '/setting/admin',
    data
  })
}

// 修改管理员
export const updateAdmin = (id: number, data: AdminPostData) => {
  return request({
    method: 'put',
    url: `/setting/admin/${id}`,
    data
  })
}

// 删除管理员
export const deleteAdmin = (id: number) => {
  return request({
    method: 'delete',
    url: `/setting/admin/${id}`
  })
}

// 修改管理员状态
export const updateAdminStatus = (id: number, status: number) => {
  return request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })
}

// 修改管理员状态
export const getRoles = () => {
  return request<IFormData>({
    method: 'get',
    url: '/setting/admin/create'
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options
    }
    return []
  })
}

export const getAdmin = (id: number) => {
  return request<IFormData>({
    method: 'get',
    url: `/setting/admin/${id}/edit`
  }).then(data => {
    const obj: Record<string, any> = {}
    data.rules.forEach(item => {
      obj[item.field] = item.value
      if (item.field === 'roles' && Array.isArray(item.value)) {
        obj[item.field] = item.value.map(item => Number(item))
      }
    })
    return obj as AdminPostData
  })
}
