import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 将三个异步获取的数据整个成一个对象
export class Goods {
  constructor(itemInfo, columns, services) {
    // 商品介绍
    this.title = itemInfo.title
    // 折扣背景色
    this.bgColor = itemInfo.discountBgColor
    // 折扣信息
    this.desc = itemInfo.discountDesc
    // 新的价格
    this.newPrice = itemInfo.price
    // 旧的价格
    this.oldPrice = itemInfo.oldPrice
    // 销量和收藏
    this.columns = columns
    // 服务
    this.services = services

  }
}

// 店铺信息的对象
export class Shops {
  constructor(shopInfo) {
    // 店铺logo
    this.shopLogo = shopInfo.shopLogo
    // 店铺名称
    this.shopName = shopInfo.name
    // 总销量
    this.cSells = shopInfo.cSells
    // 总商品
    this.cGoods = shopInfo.cGoods
    // 评分
    this.score = shopInfo.score

  }
}

// 参数信息的对象
export class GoodsParam {
  constructor(info, rule) {
    // images可能没有值(某些商品有，某些没有)
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables      
  }
}