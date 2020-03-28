import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  [ADD_COUNTER](state, payload) {
    // 当重复添加一个商品的时候，商品的数量自增
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    // 创建一个checked的判断值，为true表示选中商品
    payload.checked = true
    // 将新加入的商品push到cartList中
    state.cartList.push(payload)
  }
}