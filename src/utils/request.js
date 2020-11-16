/**
 * 基于axios封装的请求模块
*/

import axios from 'axios'

// 创建一个案凶手实例
// 通过实例去发请求，把需要的配置配置给这个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request
