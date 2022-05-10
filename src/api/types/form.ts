import type { FormItemRule } from 'element-plus/es/tokens/form'

export interface ISelectOptions {
  label: string
  value: number
}

export interface IFormRule {
  title: string
  field: string
  props?: Record<string, any>
  type: string
  validate?: FormItemRule[]
  value: string | string[]
  options?: ISelectOptions[]
}

export interface IFormData {
  action: string
  info: string
  method: string
  status: boolean
  title: string
  rules: IFormRule[]
}
