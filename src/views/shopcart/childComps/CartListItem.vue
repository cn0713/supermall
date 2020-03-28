<template>
  <div class="cart-list-item">
    <div class="item-button">
      <check-button :isactive="product.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt />
    </div>
    <div class="item-info">
      <div class="info-title">{{product.title}}</div>
      <div class="info-desc">商品描述：{{product.desc}}</div>
      <div class="info-bottom">
        <div class="bottom-price">￥{{product.price}}</div>
        <div class="bottom-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
    checkClick(){
      this.product.checked = !this.product.checked
    }
  }
};
</script>

<style scoped>
.cart-list-item{
  width: 100%;
  display: flex;
  padding: 5px;
  font-size: 0;
  border-bottom: 1px solid #ccc;
}

.item-button{
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.item-img,
.item-info{
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}

.info-title,
.info-desc{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
  position: relative;

}

.item-info .info-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
}

.bottom-price {
  color: orangered;
  float: left;
}

.bottom-count{
  float: right;
}


</style>