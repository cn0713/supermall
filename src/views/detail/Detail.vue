<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar />
    <!-- 顶部轮播图 -->
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      // 用来存储Home页面传递过来的iid
      iid: null,
      // 用来存储异步获取的swiper
      topImages: []
    };
  },
  created() {
    // 1.将动态路由中获取到的iid保存到负责存储的iid中
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    this.getDetail(this.iid);
  },
  methods: {
    /***
     * 网络请求相关的方法
     *  */

    // 多写一个函数区分模块，使代码更整洁
    getDetail(iid) {
      getDetail(iid).then(res => {
        console.log(res);
        // 将异步获取到的数据抽离出来
        // 1.获取顶部的轮播图数据
        this.topImages = res.result.itemInfo.topImages;
      });
    }
  }
};
</script>

<style scoped>
</style>