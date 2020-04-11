import { request } from './request'

// 请求分类页面导航栏的信息
export function getCategory() {
  return request({
    url: '/category'
  })
}

// 请求分类页面详细信息
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
