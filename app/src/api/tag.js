import request from '@/utils/request'

export function getList(data, query) {
  return request({
    url: `/api/tag/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function getAllTag() {
  return request({
    url: `/api/tag/findAll`,
    method: 'get'
  })
}

export function findById(id) {
  return request({
    url: `/api/tag/${id}`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `/api/tag`,
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: `/api/tag`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/api/tag/${id}`,
    method: 'delete'
  })
}
