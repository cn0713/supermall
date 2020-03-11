<template>
  <div class="recommend-info">
    <div class="recommend-title">热门推荐</div>
    <goods-list :goods="recommends"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "DetailRecommendInfo",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsList
  }
};
</script>

<style scoped>
.recommend-info{
  padding: 5px;
}

.recommend-title {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #000;
}
</style>