<template>
  <div class="goods-list" @click="itemClick">
    <!-- @load: 监听每一个img图片 -->
    <img v-lazy="showGoods" @load="imageLoads"/>
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
        return {};
      }
    },
  },
  computed:{
    showGoods(){
      // 此时异步获取到了两个推荐栏图片，但是两个数据的位置不一样
      // 所以使用此方法来根据需求获取推荐栏的数据
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
      imageLoads(){
        // 通过事件总线方法，将异步获取的img发送出去
        this.$bus.$emit('itemImageLoad')    
      },
      itemClick(){
        // 点击商品信息跳转到详情页,并获取点击图片的id 
        this.$router.push('/detail/'+ this.goodsItem.iid)
      }
    }
};
</script>

<style scoped>
.goods-list {
  /* 使内容分成两行布局 */
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}

.goods-list img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.goods-info {
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

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  bottom: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>