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
    <!-- 使用svg小图标 -->
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";
import Icon from "components/content/Icon/Icon.vue";
import SvgIcon from "components/content/Icon/svg.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
};
</script>

<style>
/* 导入默认的CSS样式 */
@import "./assets/css/base.css";
</style>
