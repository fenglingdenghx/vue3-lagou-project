<template>
  <h1>首页</h1>
  <p>{{ store.state.count }}</p>
</template>

<script lang="ts" setup>
import { getLoginInfo } from '@/api/common'
import { useStore } from '@/store/index'
import { onMounted, ref } from '@vue/runtime-core'
import type { ILoginInfo } from '@/api/types/common'
const store = useStore()
const list = ref<ILoginInfo['slide']>([])
console.log(list)
onMounted(() => {
  getLoginInfo().then(data => {
    console.log(data)
  })
})
console.log(store.state.count)
</script>

<style>
</style>
