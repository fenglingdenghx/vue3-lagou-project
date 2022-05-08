<template>
  <h1>首页</h1>
  <p>{{ store.state.count }}</p>
  <el-button
    type="primary"
  >
    test
  </el-button>
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="Pick a day"
  />
</template>

<script lang="ts" setup>
import { getLoginInfo } from '../../api/common'
import { useStore } from '../../store/index'
import { onMounted, ref } from '@vue/runtime-core'
import { ILoginInfo } from '../../api/types/common'
const store = useStore()
const list = ref<ILoginInfo['slide']>([])
const value1 = ''
console.log(list.value)
onMounted(() => {
  getLoginInfo().then(data => {
    console.log(data)
  })
})
</script>

<style>
</style>
