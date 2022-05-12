<template>
  <app-dialog-form
    :title="props.roleId ? '编辑角色' : '添加角色'"
    :confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          v-model="formData.role_name"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          ref="tree"
          node-key="id"
          show-checkbox
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import type { PropType } from 'vue'
import { getMenus, saveRole, getRoleInfo } from '@/api/role'
import type { IFormRule, IElForm, IElTree } from '@/types/element-plus'
import type { Menu } from '@/api/types/role'
import { ElMessage } from 'element-plus'
const formData = reactive({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: [] as number[]
})
const formRules = ref<IFormRule>({
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
})
const formLoading = ref<boolean>(false)
const menus = ref<Menu[]>([])
const form = ref<IElForm | null>(null)
const tree = ref<IElTree | null>(null)
const props = defineProps({
  roleId: {
    type: Number as PropType<number | null>,
    default: null
  }
})
interface EmitsType {
  (e: 'success'): void
  (e: 'update:role-id', value: number | null): void
}

const emit = defineEmits<EmitsType>()
const loadMenus = async () => {
  const res = await getMenus()
  menus.value = res.menus
}

const loadRole = async () => {
  if (props.roleId) {
    const { menus: menusData, role } = await getRoleInfo(props.roleId)
    menus.value = menusData
    await nextTick() // 等待菜单树渲染完成后处理后面的操作
    formData.role_name = role.role_name
    formData.status = role.status
    console.log(role)
    setCheckedMenus(role.rules.split(',').map(id => Number.parseInt(id)))
  }
}

const setCheckedMenus = (menus: number[]) => {
  menus.forEach(menuId => {
    const treeNode = tree.value?.getNode(menuId)
    if (treeNode && treeNode.isLeaf) {
      tree.value?.setChecked(menuId, true, false)
    }
  })
}

const handleSubmit = async () => {
  const valid = await form.value?.validate()
  if (!valid) {
    return false
  }
  // 获取选中节点的id
  formData.checked_menus = [
    ...tree.value?.getCheckedKeys() as number[],
    ...tree.value?.getHalfCheckedKeys() as number[]
  ]
  await saveRole(formData, props.roleId || 0)
  ElMessage.success(`${props.roleId === 0 ? '添加' : '修改'}成功`)
  emit('success')
}
const handleDialogClosed = () => {
  emit('update:role-id', null)
  form.value?.clearValidate() // 清除验证结果
  form.value?.resetFields() // 清除表单数据
}
const handleDialogOpen = () => {
  formLoading.value = true
  if (props.roleId) {
    loadRole().finally(() => {
      formLoading.value = false
    })
  } else {
    loadMenus().finally(() => {
      formLoading.value = false
    })
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}

.el-tree {
  height: 250px;
  overflow: auto;
  width: 100%;
}
</style>
