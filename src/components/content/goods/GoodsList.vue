<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods{
  /* 设置浮动定位 */
  display: flex;
  /* 设置弹性容器为多行，根据子标签的宽度决定行数 */
  flex-wrap: wrap;
  /* 内容居中对齐 */
  justify-content: space-around;
  padding: 2px;
}
</style>