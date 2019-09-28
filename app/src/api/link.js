import request from '@/utils/request'

export function getList(data, query) {
  return request({
    url: `/api/link/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function findAllLink() {
  return request({
    url: `/api/link/findAll`,
    method: 'get'
  })
}

export function findById(id) {
  return request({
    url: `/api/link/${id}`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `/api/link`,
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: `/api/link`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/api/link/${id}`,
    method: 'delete'
  })
}
