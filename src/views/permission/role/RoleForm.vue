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
import { ref, reactive } from 'vue'
import { getMenus } from '@/api/role'
import type { IFormRule } from '@/types/element-plus'
import type { Menu } from '@/api/types/role'
const formData = reactive({
  role_name: '',
  status: 0
})
const formRules = ref<IFormRule>({
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
})
const formLoading = ref<boolean>(false)
const menus = ref<Menu[]>([])
const props = defineProps({
  roleId: {
    type: Number,
    default: 0
  }
})
const loadMenus = async () => {
  const res = await getMenus()
  menus.value = res.menus
}
const handleSubmit = () => {}
const handleDialogClosed = () => {}
const handleDialogOpen = () => {
  formLoading.value = true
  loadMenus().finally(() => {
    formLoading.value = false
  })
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
