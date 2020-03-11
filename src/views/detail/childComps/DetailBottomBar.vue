<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar"
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #fff;
  position: relative;
  display: flex;
  text-align: center;
  border-top: 1px solid rgb(100, 100, 100, 0.1);
}

.bar-item {
  flex: 1;
}

.bar-left {
  display: flex;
  font-size: 13px;
}

.bar-left div {
  flex: 1;
}

.icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.service {
  background-position: 0 -54px;
}

.shop {
  background-position: 0 -98px;
}

.bar-right {
  display: flex;
  line-height: 49px;
  color: #fff;
  font-size: 14px;
}

.bar-right div {
  flex: 1;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}
</style>