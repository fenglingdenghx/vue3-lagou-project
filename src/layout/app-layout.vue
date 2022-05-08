<template>
  <el-container>
    <el-aside>
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppMenu from './components/AppMenu.vue'
import AppHeader from './components/AppHeader/index.vue'
</script>
<style lang="scss" scoped>
.el-container{
  width: 100vw;
  height: 100vh;
  .el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 30px;
  }
  .el-header,.el-footer{
    background-color: #fff;
  }
  .el-aside{
    background-color: #304156;
    width: auto;
  }
  .el-main{
    background-color: #e9eef3;
  }
}
</style>
