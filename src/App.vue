<template>
  <div id="app">
    <!-- 显示路由信息 -->
    <router-view/>
    <!-- 显示tabbar的内容 -->
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
/* 导入默认的CSS样式 */
@import "./assets/css/base.css";
</style>
