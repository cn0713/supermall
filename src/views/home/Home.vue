<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
         <a :href="item.link" >
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
    <!-- 推荐图 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      // 保存首页导航栏数据
      banners: [],
      // 保存首页推荐栏数据
      recommends: []
    };
  },
  // vue生命周期，当vue运行时调用
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      // 将网络请求到的数据保存到data中，防止数据被垃圾回收机制回收
      // 获取导航栏list的信息
      this.banners = res.data.banner.list;
      // 获取推荐栏list的信息
      this.recommends = res.data.recommend.list;
    });
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>