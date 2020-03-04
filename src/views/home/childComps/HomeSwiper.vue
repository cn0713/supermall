<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // 图片是否重复获取的判断索引
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 获取当前图片的状态
    imageLoad() {
      // 1.如果图片为true
      if (!this.isLoad) {
        // 2.就将获取到的图片信息传递出去
        this.$emit('swiperImageLoad')
        // 3.然后将判断索引设为true,就不会重复传递图片信息
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>