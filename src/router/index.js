import Vue from 'vue'
import RouterVue from 'vue-router'

const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/shopcart/Cart')
const Profile = () => import('@/views/profile/Profile')

Vue.use(RouterVue)

const routes = [
  {
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
  }

]

const router = new RouterVue({
  routes,
  mode:'history'
})


export default router