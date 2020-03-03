<template>
  <div class="tab-control">
    <!-- :class 当前谁处于index状态就调用active样式 -->
    <div v-for="(item,index) in titles" 
         class="tab-control-item" 
         :class="{active:index==currentIndex}"
         @click="itemClick(index)"
         >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // 设置索引
      currentIndex: 0
    };
  },
  methods: {
    // 当前点击到谁，谁就处于活跃状态，然后调用active样式
    itemClick(index){
      // 将点击到的index赋值给currentIndex,然后再:active里面进行判断
      this.currentIndex=index;
      // 将子组件的index传给父组件
      this.$emit('tabClick',index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  /* 添加商品导航的权重 */
  position: relative;
  z-index: 9;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span{
  padding: 3px;
}

.active{
  color: var(--color-high-text);
}

.active span{
  border-bottom: 2px solid var(--color-tint)
}
</style>