/**
 * 用户相关请求模块
*/
import request from '@/utils/request'

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    // data 用来设置POST请求体
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/user/profile',
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzcwNjA0ODUsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.sFyS-KRQZQoRxniFVKaHXBqQgKGsgLkWbxNgk_xQo-o'
    }
  })
}
