<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 商品导航 默认隐藏，当TabControl吸顶时显示-->
    <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixd"></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐图 -->
      <home-recommends :recommends="recommends" />
      <!-- 本周流行 -->
      <home-feature />
      <!-- 商品导航 -->
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <!-- 商品栏 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 返回最上层按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
// Home封装的组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommends from "./childComps/HomeRecommends";
import HomeFeature from "./childComps/HomeFeature";

// 公共封装的组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 网络封装的组件
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "components/common/utils/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // 保存首页导航栏数据
      banners: [],
      // 保存首页推荐栏数据
      recommends: [],
      // 管理导航的数据
      titles: ["流行", "新款", "精选"],
      // 保存所有商品的数据
      goods: {
        // 保存流行的数据
        pop: { page: 0, list: [] },
        // 保存新款的数据
        new: { page: 0, list: [] },
        // 保存精选的数据
        sell: { page: 0, list: [] }
      },
      // 当前默认的商品类型
      currentType: "pop",
      // 点击回到顶部按钮的条件判断索引
      isShowBackTop: false,
      // 保存tabControl到顶部的距离
      tabOffsetTop: 0,
      // TabControl是否吸顶的条件判断索引
      isTabFixd: false,
      // 当离开Home组件时，保存当时的位置
      saveY: 0
    };
  },
  // vue生命周期，当vue运行时调用
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  // vue生命周期，当html模板创建完成后调用
  mounted() {
    // 监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      // 调用防抖方法，降低refresh刷新的次数
      debounce(this.$refs.scroll.refresh, 200);
    });
  },
  // vue生命周期，当Home组件处于活跃时调用
  activated() {
    console.log(this.saveY);

    // 使Home组件跳转到上次不活跃时保存的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 重新加载better-scroll插件，解决自动跳转回顶部的bug
    this.$refs.scroll.refresh();
  },
  // vue生命周期，当Home组件不活跃时调用
  deactivated() {
    console.log(this.$refs.scroll.getScrollY());

    // 将当时的Y轴的位置保存到saveY中
    this.saveY = this.$refs.scroll.getScrollY();
  },

  computed: {
    showGoods() {
      // 返回对应商品的list数据
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      // 使两个TabControl的索引相同，
      // 当点击其中一个TabControl的title时，
      // 动态使另一个TabControl的title值变成相同的title
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // 调用scroll组件中的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 当滚动的位置大于1000,为true时，显示回到顶部按钮
      this.isShowBackTop = -position.y > 1000;

      // 当滚动的位置大于TabControl到顶部的位置时，使TabControl吸顶
      this.isTabFixd = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      /**
       * 当能使用上拉加载更多功能时，再次调用getHomeGoods方法，
       * 从网络中获取对应的商品数据
       */

      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop的值
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /***
     * 网络请求相关的方法
     *  */

    // 多写一个函数区分模块，使代码更整洁
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 将网络请求到的数据保存到data中，防止数据被垃圾回收机制回收
        // 获取导航栏list的信息
        this.banners = res.data.banner.list;
        // 获取推荐栏list的信息
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 创建一个索引，新建的page等于data中goods的page数+1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        // 将网络获取到的数据push到goods中对应type的list中
        // ...：解析语法：将数组中的数据依次解析出来，然后通过push存入另一个数组中
        this.goods[type].list.push(...res.data.list);
        // 当获取到新数据时，更新goods中对应type的page值
        this.goods[type].page = page;

        // 调用scroll组件中的finishPullUp方法
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  /* 元素会被屏幕撑开，与屏幕一致 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  /**
    吸顶效果
    但是使用了better-scroll插件后，效果就无效了  
   */
  position: sticky;
  top: 44px;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>