import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 检测数组中是否有当前数据
      // 方法一
      // let oldproduct = null
      // for (const item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldproduct = item
      //   }
      // }

      // 方法二
      // 1.查找之前数组中是否有该商品
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断ordproduct
      if (oldproduct) {
        // 如果之前有该商品，那么商品数量加一
        context.commit(ADD_COUNTER, oldproduct)
        resolve('当前商品数量+1')
      } else {
        // 如果没有，就创建一个count，给商品一个数量
        payload.count = 1
        // 并且将该商品添加到数组中
        context.commit(ADD_TO_CART, payload)
        resolve('已添加了新的商品')
      }
    })

  }
}