<template>
  <div>
    <div class="check-button" :class="{isCheck:isactive}">
      <img src="~assets/img/cart/tick.svg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isactive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.isCheck {
  background-color: #ff8198;
  border: 2px solid #ff8198;
}
</style>