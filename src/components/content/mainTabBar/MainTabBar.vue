<template>
  <tab-bar class="tabbar">
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt />
      <div slot="item-title">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="@/assets/img/tabbar/category.svg" alt />
      <img slot="item-icon-active" src="@/assets/img/tabbar/category_active.svg" alt />
      <div slot="item-title">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="@/assets/img/tabbar/cart.svg" alt />
      <img slot="item-icon-active" src="@/assets/img/tabbar/cart_active.svg" alt />
      <div slot="item-title">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" alt />
      <img slot="item-icon-active" src="@/assets/img/tabbar/profile_active.svg" alt />
      <div slot="item-title">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
.tabbar{
  position: relative;
  z-index: 9;
}
</style>