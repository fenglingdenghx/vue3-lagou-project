<template>
  <page-container>
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        :disabled="listLoading"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="状态">
          <el-select
            v-model="listParams.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              label="显示"
              :value="1"
            />
            <el-option
              label="不显示"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="身份昵称">
          <el-input
            v-model="listParams.role_name"
            clearable
            placeholder="请输入身份昵称"
          />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button
          type="primary"
          @click="formVisible = true"
        >
          添加角色
        </el-button>
      </template>
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="role_name"
          label="身份昵称"
        />
        <el-table-column
          prop="rules"
          label="权限"
        >
          <template #default="scope">
            <div
              class="text-nowrap"
              :title="scope.row.rules"
            >
              {{ scope.row.rules }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="text"
              @click="handleUpdate(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <app-pagination
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :list-count="listCount"
        :load-list="loadList"
        :disabled="listLoading"
      />
    </app-card>
  </page-container>
  <role-form
    v-model="formVisible"
  />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
// api
import { getRoles, deleteRole, updateRoleStatus } from '@/api/role'
// types
import type { IRoleParams, IRoleItem } from '@/api/types/role'
import { ElMessage } from 'element-plus'
import RoleForm from './RoleForm.vue'

const listParams = reactive<IRoleParams>({
  status: '',
  role_name: '',
  page: 1,
  limit: 10
})
const listCount = ref<number>(0)
const list = ref<IRoleItem[]>([])
const listLoading = ref<boolean>(false)
const formVisible = ref<boolean>(false)
onMounted(() => {
  loadList()
})
const loadList = async () => {
  listLoading.value = true
  const res = await getRoles(listParams).finally(() => {
    listLoading.value = false
  })
  list.value = res.list
  listCount.value = res.count
}
const handleQuery = () => {
  listParams.page = 1
  loadList()
}
const handleDelete = async (id: number) => {
  await deleteRole(id)
  ElMessage.success('删除成功')
  loadList()
}
const handleUpdate = (id: number) => {}
const handleStatusChange = async (item: IRoleItem) => {
  await updateRoleStatus(item.id, item.status)
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
}
</script>

<style lang="scss" scoped>
.text-nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
