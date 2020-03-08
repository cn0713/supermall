<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="info-size" v-for="(table,index) in paramInfo.sizes" :key="index">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(param,index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{param.key}}</td>
        <td class="param-value">{{param.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-top: 5px solid #f2f5f8;
}

.param-info table {
  width: 100%;
  /* 合并边框，均等分配 */
  border-collapse: collapse;
}

.param-info table tr {
  height: 42px;
}

.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.param-value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
</style>