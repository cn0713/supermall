import Vue from 'vue'
import RouterVue from 'vue-router'

// 导入views文件，并进行懒加载
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/shopcart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')

// 1.安装插件
Vue.use(RouterVue)

// 2.创建路由
const routes = [
  {
    // 创建默认显示地址
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }

]

const router = new RouterVue({
  routes,
  // 将url转换成history模式
  mode:'history'
})

// 3.导出
export default router