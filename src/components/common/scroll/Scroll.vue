<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    // 获取从父组件传递过来的侦听数字
    probeType: {
      type: Number,
      default: 0
    },
    // 获取从父组件传递过来的判断类型
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 是否实时侦听滚动位置,
      // 0,1: 不侦听
      // 2:   只侦听鼠标滑动位置
      // 3:   只要滚动就侦听
      probeType: this.probeType,
      // 侦听上拉加载更多
      pullUpLoad: this.pullUpLoad,
      // 使better-scroll插件中的点击事件有效果
      click: true
    });

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        // 将获取到的滚动信息传递出去
        this.$emit("scroll", position);
      });
    }

    // 3.监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 将上拉加载功能传递出去
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 三个参数分别是：x轴位置，Y轴位置，响应的默认时间
    scrollTo(x, y, time = 500) {
      // 调用绑定的scroll属性的scrollTo方法，实现回到顶部效果
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 重复触发上拉加载事件
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    /**
     *  重新计算better-scroll插件，
     * 当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
     *  */
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
</style>