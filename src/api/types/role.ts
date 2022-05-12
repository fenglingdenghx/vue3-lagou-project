export interface IRoleParams {
  page: number
  limit: number
  status: 0 | 1 | ''
  role_name: string
}

export interface IRoleItem {
  id: number
  level: number
  role_name: string
  rules: string
  status: 0 | 1
}

export interface Menu {
  pid: number
  id: number
  title: string
  expand: boolean
  children?: Menu[]
}

export interface IRoleBody {
  role_name: string
  status: 0 | 1
  checked_menus: number[]
}

export interface EditRoleInfo {
  id: number
  level: number
  role_name: string
  rules: string
  status: 0 | 1
}
