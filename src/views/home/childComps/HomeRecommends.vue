<template>
  <div class="recommends">
    <div v-for="(item,value) in recommends" :key="value" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommends",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommends {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}

.recommends-item {
  flex: 1;
}

.recommends-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
  vertical-align: middle
}
</style>