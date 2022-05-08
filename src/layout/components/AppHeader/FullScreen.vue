<template>
  <el-icon
    class="full-icon"
    @click="toggleFullScreen"
  >
    <full-screen />
  </el-icon>
</template>

<script lang="ts" setup>
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style scoped lang='scss'>
.full-icon{
  font-size: 20px;
  cursor: pointer;
}
</style>
