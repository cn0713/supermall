<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar />
    <scroll class="content">
      <!-- 顶部轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shops="shops"></detail-shop-info>
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <!-- 商品参数信息 -->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!-- 用户评论信息 -->
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shops, GoodsParam } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll
  },
  data() {
    return {
      // 用来存储Home页面传递过来的iid
      iid: null,
      // 用来存储异步获取的swiper
      topImages: [],
      // 用来存储异步获取的itemInfo, columns, services
      goods: {},
      // 用来存储异步获取的店铺信息
      shops: {},
      // 用来存储异步获取的商品的详细信息
      detailInfo: {},
      // 用来存储异步获取的商品的参数信息
      paramInfo: {},
      // 用来存储异步获取的用户评论信息
      commentInfo: {}
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
        // 1.获取数据
        const data = res.result;
        // 将异步获取到的数据抽离出来
        // 2.获取顶部的轮播图数据
        this.topImages = data.itemInfo.topImages;

        // 3.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 4.创建店铺信息的对象
        this.shops = new Shops(data.shopInfo);

        // 5.获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 6.获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 7.获取用户评论信息
        // 判断是否有评论信息，如果有就获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    }
  }
};
</script>

<style scoped>
#detail {
  /* 元素会被屏幕撑开，与屏幕一致 */
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>