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
        <el-form-item label="管理员名称">
          <el-input
            v-model="listParams.name"
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
          添加管理员
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
          prop="real_name"
          label="姓名"
        />
        <el-table-column
          prop="account"
          label="账号"
        />
        <el-table-column
          prop="roles"
          label="身份"
          min-width="180"
        >
          <template #default="scope">
            <el-space wrap>
              <el-tag
                class="role-tag"
                v-for="(item) in scope.row.roles.split(',')"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column
          label="最后一次登录时间"
          prop="last_time"
        />
        <el-table-column
          label="最后一次登录IP"
          prop="last_ip"
        />
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleStatusChange($event ,scope.row)"
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
  <admin-form
    v-model="formVisible"
    v-model:admin-id="adminId"
    @success="handelFormSuccess"
  />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getAdmins, deleteAdmin, updateAdminStatus } from '@/api/admin'
import { IListParams, IAdmin } from '@/api/types/admin'
import { ElMessage } from 'element-plus'
import AdminForm from './AdminForm.vue'

const list = ref<IAdmin[]>([]) // 列表数据
const adminId = ref<number | null>(null)
const listParams = reactive<IListParams>({
  status: '',
  name: '',
  page: 1,
  limit: 10,
  roles: ''
})
const listCount = ref<number>(0)
const formVisible = ref<boolean>(false)
const listLoading = ref<boolean>(false)

onMounted(() => {
  loadList()
})

const loadList = async () => {
  listLoading.value = true
  const data = await getAdmins(listParams).finally(() => {
    listLoading.value = false
  })
  data.list.forEach(item => {
    item.statusLoading = false
  })
  list.value = data.list
  listCount.value = data.count
}
const handleQuery = () => {
  loadList()
}
const handleStatusChange = async (value: number, item: IAdmin) => {
  item.statusLoading = true
  await updateAdminStatus(item.id, value).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${value === 1 ? '启用' : '禁用'}成功`)
}
const handleUpdate = (id: number) => {
  formVisible.value = true
  adminId.value = id
}
const handleDelete = async (id: number) => {
  await deleteAdmin(id)
  ElMessage.success('删除成功')
  loadList()
}

const handelFormSuccess = () => {
  formVisible.value = false
  loadList()
}
</script>

<style scoped lang='scss'>

</style>
