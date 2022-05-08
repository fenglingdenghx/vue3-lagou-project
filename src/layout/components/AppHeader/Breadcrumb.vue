<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in routes"
      :key="item.path"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => {
    return item.meta.title
  })
})
console.log(routes.value)
</script>

<style scoped lang='scss'>
.el-breadcrumb{
  margin-left: 15px;
}
</style>
