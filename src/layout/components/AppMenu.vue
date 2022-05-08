<template>
  <el-menu
    active-text-color="#2d8cf0"
    background-color="#304156"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :collapse="$store.state.isCollapse"
    router
  >
    <el-menu-item index="/">
      <el-icon>
        <home-filled />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/product">
      <template #title>
        <el-icon><goods-filled /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <el-icon><list /></el-icon>
        商品列表
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <el-icon><shopping-cart-full /></el-icon>
        商品分类
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <el-icon><shop /></el-icon>
        商品规格
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        <el-icon><chat-dot-square /></el-icon>
        商品评论
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/order">
      <template #title>
        <el-icon><grid /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/order_list">
        <el-icon><list /></el-icon>
        <span>订单列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <el-icon><picture-filled /></el-icon>
      <span>媒体</span>
    </el-menu-item>
    <el-sub-menu index="/permission">
      <template #title>
        <el-icon><turn-off /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/permission_role">
        <el-icon><user-filled /></el-icon>
        <span>角色</span>
      </el-menu-item>
      <el-menu-item index="/permission/permission_admin">
        <el-icon><user /></el-icon>
        <span>管理员</span>
      </el-menu-item>
      <el-menu-item index="/permission/permission_rule">
        <el-icon><share /></el-icon>
        <span>权限规则</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
