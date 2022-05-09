import { ElForm } from 'element-plus'
import type { FormItemRule } from 'element-plus/es/tokens/form'
export type IElForm = InstanceType<typeof ElForm>
export type IElFormRule = Record<string, FormItemRule[]>
