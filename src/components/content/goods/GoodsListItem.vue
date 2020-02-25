<template>
  <div class="goods-list">
    <img :src="goodsItem.show.img" alt />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    },
  }
};
</script>

<style scoped>
.goods-list{
  /* 使内容分成两行布局 */
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}

.goods-list img {
  width: 100%;
  border-radius: 10px;
}

.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  /* 溢出隐藏 */
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  /* 显示省略符号来代表被修剪的文本 */
  text-overflow: ellipsis;
  /* 	文本不会换行，文本会在在同一行上继续 */
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect{
  position: relative;
}

.goods-info .collect::before{
  content: '';
  position: absolute;
  left: -15px;
  top: 0;
  bottom: 0;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>