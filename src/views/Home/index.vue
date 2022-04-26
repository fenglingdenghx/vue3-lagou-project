<template>
  <h1>首页</h1>
  <p>{{ store.state.count }}</p>
</template>

<script lang="ts" setup>
import { useStore } from '../../store/index'
const store = useStore()
console.log(store.state.count)
</script>

<style>
</style>
