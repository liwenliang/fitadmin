import request from '@/utils/request'

export function login(mobile, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      mobile,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
    params: {}
  })
}
