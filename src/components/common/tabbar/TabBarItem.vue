<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777"
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      // $route当前活跃的路由
      // 当前活跃的组件的path和动态获取的path相同时，indexOf的值不等于-1,则为true
      // indexOf: 返回指定字符串在字符串中首次出现的位子
      return this.$route.path.indexOf(this.path) != -1;
    },
    // 动态改变字体颜色
    activeStyle() {
      // 当isActive处于活跃是调用{color:this.activeColor}，否则调用{}
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>