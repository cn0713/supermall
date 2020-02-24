import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL:'http://106.54.54.237:8000/api/hy',
    timeout:5000
  })

  // 响应拦截
  instance.interceptors.response.use(res => {

    //返回拦截的信息
    return res.data
  },err =>{
    console.log(err + '拦截失败');
    
  })

  // 发送网络请求
  return instance(config)
}