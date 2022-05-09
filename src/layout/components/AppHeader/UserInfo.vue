<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handelLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/api/common'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const store = useStore()
const router = useRouter()
const handelLogout = async () => {
  ElMessageBox.confirm('确认退出吗?', {}).then(async () => {
    ElMessage('退出成功')
    await logout()
    store.commit('setUser', null)
    router.push({
      name: 'login'
    })
  }).catch(() => {
    ElMessage('已取消退出')
  })
}
</script>

<style scoped lang='scss'>
.el-dropdown{
  margin-left: 15px;
  cursor: pointer;
}
</style>
