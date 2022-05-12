import { ElForm, ElDialog, ElTree } from 'element-plus'
import type { FormItemRule } from 'element-plus/es/tokens/form'
export type IElForm = InstanceType<typeof ElForm>
export type IElFormRule = Record<string, FormItemRule[]>
export type IElDialog = InstanceType<typeof ElDialog>
export type IFormRule = Record<string, FormItemRule[]>
export type IElTree = InstanceType<typeof ElTree>
