<template>
  <div id="app">
    <!-- 保存组件的状态，使它不随意销毁 
      exclude="Detail":将Detail组件排除在外
    -->
    <keep-alive exclude="Detail">
      <!-- 显示路由信息 -->
      <router-view />
    </keep-alive>
    <!-- 显示tabbar的内容 -->
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

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
