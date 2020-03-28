<template>
  <div id="cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// Vuex中getter的工具类，将Vuex中的getters映射到computed中
import {mapGetters} from 'vuex'

  export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    }
  }
</script>

<style scoped>
#cart{
  height: 100vh;
}

.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>