<template>
  <div class="bottom-bar">
    <div class="check-centext">
      <check-button 
      class="check-bottom" 
      :isactive="isSelectAll"
      @click.native="checkClick"></check-button>全选
    </div>
    <div class="total">合计:{{totalPrice}}</div>
    <div class="calculate" @click="toCalculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 1.用filter遍历数组内部的元素，判断里面的商品是否被选中
    // 2.如果被选中就执行reduce，
    // （reduce的两个参数proValue：保存每次添加的商品价格，
    // item: cartList里面的每一个商品）
    // 3.返回所以商品相加的总价格（.toFixed表示保留两位小数）
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((proValue, item) => {
            return proValue + item.count * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      // 获取选中的商品数量
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll(){
      // 当购物车没有商品时，全选按钮不选中
      if (this.cartList.length === 0) return false;

      // 方法一
      // for (let item of this.cartList) {
      //   // 1.当有一个商品没有选中时，全选按钮就不选中
      //   if (!item.checked) {
      //     return false
      //   }
      // }
      // // 2.否则就选中
      // return true

      // 方法二
      // return !(this.cartList.filter(item => !item.checked).length)

      // 方法三
      // 数组中的find方法的使用
      // find:查找数组中是否有需要查找的值
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      if (this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      }else{ //部分或者全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    toCalculate(){
      if (!this.isSelectAll) {
        this.$toast.show("请选择商品")
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  height: 49px;
  background-color: #eee;
  color: #888;
  font-size: 14px;
  display: flex;
}

.check-centext {
  width: 60px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.check-bottom {
  margin-right: 5px;
}

.total {
  flex: 1;
  line-height: 49px;
  margin-left: 10px;
  color: #666;
  font-size: 16px;
}

.calculate {
  width: 90px;
  background-color: orangered;
  text-align: center;
  color: #fff;
  line-height: 49px;
}
</style>