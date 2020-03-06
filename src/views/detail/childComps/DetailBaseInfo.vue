<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="info-desc" :style="bgColor">{{goods.desc}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
    bgColor(){
      return this.goods.desc ? {backgroundColor: this.goods.bgColor} : {}
    }
  }
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: #000;
}

.info-price {
  margin-top: 10px;
}

.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}

.o-price,
.info-desc {
  margin-left: 5px;
}

.info-price .o-price {
  font-size: 13px;
  /* 使字体为删除状态 */
  text-decoration: line-through;
}

.info-price .info-desc {
  font-size: 12px;
  position: relative;
  top: -8px;
  color:#fff;
  padding: 2px 5px;
  border-radius: 10px;
  
}

.info-other {
  margin-top: 15px;
  line-height: 30px;
  font-size: 13px;
  display: flex;
  /* 使各行之间留有均等的空间 */
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, .1);

}

.info-services{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.info-services-item img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.info-services-item span {
  font-size: 12px;
  color: #333;
}



</style>