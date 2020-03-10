import { debounce } from 'components/common/utils/utils'

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