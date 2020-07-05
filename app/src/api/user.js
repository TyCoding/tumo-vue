import request from '@/utils/request'

export function login(data) {
  return request({
    url: `/login?username=${data.username}&password=${data.password}`,
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function findUserByName(username) {
  return request({
    url: `/user/findByName?username=${username}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: '/user/',
    method: 'put',
    data: data
  })
}

export function changePass(data) {
  return request({
    url: '/user/changePass',
    method: 'put',
    data: data
  })
}
