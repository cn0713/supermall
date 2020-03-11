import { debounce } from 'components/common/utils/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      // 保存监听的事件
      itemImageListener: null,
      // 保存防抖刷新的次数 
      newRefresh: null
    }
  },
  mounted() {
    // 调用防抖方法，降低refresh刷新的次数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    // 对监听的事件进行保存
    this.itemImageListener = () => {
      this.newRefresh()
    }
    // 监听item中图片加载完成
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  }
}

export const BackTopMinxin = {
  data() {
    return {
      // 点击回到顶部按钮的条件判断索引
      isShowBackTop: false
    }
  },
  components: {
    BackTop

  },
  methods: {
    // 点击回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      // 当滚动的位置大于1000,为true时，显示回到顶部按钮
      this.isShowBackTop = -position.y > 1000;
    }
  }
}