<template>
  <nav-bar class="detail-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        class="title-item"
        :class="{active: index === currentIndex}"
        @click="itemClick(index)"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('itemClick',index)
    },
    backClick() {
      // 返回上一层
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.detail-bar{
  position: relative;
  z-index: 9;
}

.title {
  display: flex;
  font-size: 13px;
  padding: 0 10px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 10px;
}
</style>