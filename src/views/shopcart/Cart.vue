<template>
  <div>
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

// Vuex中getter的工具类，将Vuex中的getters映射到computed中
import {mapGetters} from 'vuex'

  export default {
    name:'Cart',
    components:{
      NavBar
    },
    computed:{
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>