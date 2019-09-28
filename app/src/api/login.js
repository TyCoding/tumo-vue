import request from '@/utils/request'

export function login(form) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username: form.username,
      password: form.password
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/user',
    method: 'put',
    data
  })
}
