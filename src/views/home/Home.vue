<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners" />
    <!-- 推荐图 -->
    <home-recommends :recommends="recommends" />
    <!-- 本周流行 -->
    <home-feature />
    <!-- 商品导航 -->
    <tab-control class="tab-control" :titles="titles"></tab-control>
    <!-- 商品栏 -->
    <goods-list :goods="goods['pop'].list"></goods-list>

    <ul>
      <li>1001</li>
      <li>1002</li>
      <li>1003</li>
      <li>1004</li>
      <li>1005</li>
      <li>1006</li>
      <li>1007</li>
      <li>1008</li>
      <li>1009</li>
      <li>10010</li>
      <li>10011</li>
      <li>10012</li>
      <li>10013</li>
      <li>10014</li>
      <li>10015</li>
      <li>10016</li>
      <li>10017</li>
      <li>10018</li>
      <li>10019</li>
      <li>10020</li>
      <li>10021</li>
      <li>10022</li>
      <li>10023</li>
      <li>10024</li>
      <li>10025</li>
      <li>10026</li>
      <li>10027</li>
      <li>10028</li>
      <li>10029</li>
      <li>10030</li>
      <li>10031</li>
      <li>10032</li>
      <li>10033</li>
      <li>10034</li>
      <li>10035</li>
      <li>10036</li>
      <li>10037</li>
      <li>10038</li>
      <li>10039</li>
      <li>10040</li>
      <li>10041</li>
      <li>10042</li>
      <li>10043</li>
      <li>10044</li>
      <li>10045</li>
      <li>10046</li>
      <li>10047</li>
      <li>10048</li>
      <li>10049</li>
      <li>10050</li>
      <li>10051</li>
      <li>10052</li>
      <li>10053</li>
      <li>10054</li>
      <li>10055</li>
      <li>10056</li>
      <li>10057</li>
      <li>10058</li>
      <li>10059</li>
      <li>10060</li>
      <li>10061</li>
      <li>10062</li>
      <li>10063</li>
      <li>10064</li>
      <li>10065</li>
      <li>10066</li>
      <li>10067</li>
      <li>10068</li>
      <li>10069</li>
      <li>10070</li>
      <li>10071</li>
      <li>10072</li>
      <li>10073</li>
      <li>10074</li>
      <li>10075</li>
      <li>10076</li>
      <li>10077</li>
      <li>10078</li>
      <li>10079</li>
      <li>10080</li>
      <li>10081</li>
      <li>10082</li>
      <li>10083</li>
      <li>10084</li>
      <li>10085</li>
      <li>10086</li>
      <li>10087</li>
      <li>10088</li>
      <li>10089</li>
      <li>10090</li>
      <li>10091</li>
      <li>10092</li>
      <li>10093</li>
      <li>10094</li>
      <li>10095</li>
      <li>10096</li>
      <li>10097</li>
      <li>10098</li>
      <li>10099</li>
      <li>100100</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommends from "./childComps/HomeRecommends";
import HomeFeature from "./childComps/HomeFeature";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList"

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    HomeFeature,
    TabControl,
    GoodsList
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
      }
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
  methods: {
    // 多写一个函数区分模块，是代码更整洁
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
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  position: sticky;
  top: 44px;
}
</style>