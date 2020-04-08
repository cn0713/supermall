<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar @itemClick="itemClick" ref="navBar" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 顶部轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shops="shops"></detail-shop-info>
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <!-- 商品参数信息 -->
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <!-- 用户评论信息 -->
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <!-- 商品推荐栏信息 -->
      <detail-recommend-info ref="recommend" :recommends="recommends"></detail-recommend-info>
    </scroll>
    <!-- 底部导航栏 -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import { itemListenerMixin, BackTopMinxin } from "common/mixins";
import { debounce } from "components/common/utils/utils";

import Scroll from "components/common/scroll/Scroll";
import { mapActions } from "vuex";

import {
  getDetail,
  getRecommend,
  Goods,
  Shops,
  GoodsParam
} from "network/detail";

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
    DetailRecommendInfo,
    DetailBottomBar,
    getRecommend,
    Scroll,
  },
  mixins: [itemListenerMixin, BackTopMinxin],
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
      commentInfo: {},
      // 用来存储异步获取的详情页推荐栏数据
      recommends: [],
      // 用来保存navbar四个点击事件对应的内容的位置
      themeTopY: [],
      // 用来处理navbar四个点击事件对应的内容的位置的防抖函数
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.将动态路由中获取到的iid保存到负责存储的iid中
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    this.getDetail(this.iid);

    // 3.请求推荐栏数据
    this.getRecommend();

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      // 初始化四个点击事件的位置
      this.themeTopY = [];

      // 获取四个点击事件的位置
      this.themeTopY.push(this.$refs.navBar.$el.offsetTop);
      this.themeTopY.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      // 添加一个最大值，方便联动效果的判断
      this.themeTopY.push(Number.MAX_VALUE);
    }, 200);
  },
  destroyed() {
    //取消全局监听事件
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    // 将vuex中的active中的方法映射过来
    ...mapActions(["addCart"]),
    /**
     * 点击事件相关的方法
     */
    // 点击加入购物车，将商品数据传入购物车页面
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.descDetail;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;

      // 2.将商品的数据传入Vuex中
      // 方法一
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // });

      // 方法二
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res , 1000)
      });
    },

    contentScroll(position) {
      // 1.监听BackTop的滚动
      this.listenShowBackTop(position);

      // 2.监听滚动到哪个主题
      this.listenScrollTheme(-position.y);
    },
    listenScrollTheme(positionY) {
      // positionY和主题中的值进行对比
      // 获取themeTopY的长度
      let length = this.themeTopY.length;
      for (let index = 0; index < length; index++) {
        /**
           * 判断的方案:
           *  方案一:
           *    条件: ((index < length - 1 && 
           *            positionY >= this.themeTopY[index] &&
                        positionY < this.themeTopY[index + 1]) ||
                        (index === length - 1 && positionY >= this.themeTopY[index])),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTopY最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           */

        // 方法一
        // if (
        //   this.currentIndex !== index &&
        //   ((index < length - 1 &&
        //     positionY >= this.themeTopY[index] &&
        //     positionY < this.themeTopY[index + 1]) ||
        //     (index === length - 1 && positionY >= this.themeTopY[index]))
        // ) {
        //   this.currentIndex = index;
        //   this.$refs.navBar.currentIndex = this.currentIndex;
        // }
        // 方法二
        if (
          this.currentIndex !== index &&
          positionY >= this.themeTopY[index] &&
          positionY < this.themeTopY[index + 1]
        ) {
          this.currentIndex = index;
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }
    },

    // 接受子组件传递过来的图片信息
    detailImageLoad() {
      // 通过防抖，只获取最后一次刷新图片的数据
      this.newRefresh();
      // 通过防抖，只获取最后一次刷新图片后的navbar四个点击事件对应的内容的位置
      this.getThemeTopY();
    },
    // 接受子组件传递过来的navbar点击事件
    itemClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },
    /***
     * 网络请求相关的方法
     *  */

    // 多写一个函数区分模块，使代码更整洁
    getDetail(iid) {
      getDetail(iid).then(res => {
        // console.log(res);
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
    },

    // 多写一个函数区分模块，使代码更整洁
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res);
        // 获取详情页推荐栏数据
        this.recommends = res.data.list;
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
  height: calc(100% - 44px - 49px);
  /* 隐藏多余的部分，使浏览器原始的滚动效果无法使用 */
  overflow: hidden;
}
</style>