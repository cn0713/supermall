<template>
  <div class="cart-list">
    <scroll class="center">
       <cart-list-item 
       v-for="(item,index) in cartList" 
       :key="index" 
       :product="item">
       </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll";

  export default {
    name:'CartList',
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters([
        'cartList'
      ])
    }
  }
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px);
}

.center{
  height: 100%;
  overflow: hidden;
}
</style>