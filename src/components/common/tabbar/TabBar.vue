<template>
  <div id="tab-bar">
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
#tab-bar {
  /* 利用flex进行布局 */
  display: flex;
      /* 定位相关 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* 本身的样式 */
  height: 50px;
  background-color: #f6f6f6;
  border-top: 1px solid #eee;
  box-shadow: 0px -1px 1px rgba(150,150,150,.08);
}


</style>