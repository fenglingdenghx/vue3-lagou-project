<template>
  <el-icon
    @click="handleCollapse"
    class="toggle-icon"
  >
    <expand v-if="store.state.isCollapse" />
    <fold v-else />
  </el-icon>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

const store = useStore()

const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style scoped lang='scss'>
.toggle-icon {
  font-size: 20px;
  cursor: pointer;
}
</style>
