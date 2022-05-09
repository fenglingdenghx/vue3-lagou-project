<template>
  <div class="header-left">
    <ToggleSidebar />
    <Breadcrumb />
  </div>
  <div class="header-right">
    <FullScreen />
    <UserInfo />
  </div>
</template>

<script lang="ts" setup>
import ToggleSidebar from './ToggleSidebar.vue'
import Breadcrumb from './Breadcrumb.vue'
import FullScreen from './FullScreen.vue'
import UserInfo from './UserInfo.vue'
</script>

<style scoped lang='scss'>
.header-left,
.header-right{
  display: flex;
  align-items: center;
}
</style>
