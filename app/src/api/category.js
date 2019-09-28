import request from '@/utils/request'

export function getList(data, query) {
  return request({
    url: `/api/category/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function getAllCategory() {
  return request({
    url: `/api/category/findAll`,
    method: 'get'
  })
}

export function findById(id) {
  return request({
    url: `/api/category/${id}`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `/api/category`,
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: `/api/category`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/api/category/${id}`,
    method: 'delete'
  })
}
