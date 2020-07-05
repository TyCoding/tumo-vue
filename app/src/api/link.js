import request from '@/utils/request'

export function getLinkList(data, query) {
  return request({
    url: `/link/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function getLinkFilterList(data) {
  return request({
    url: `/link/filter/list`,
    method: 'post',
    data
  })
}

export function getLinkById(id) {
  return request({
    url: `/link/${id}`,
    method: 'get'
  })
}

export function linkUpdate(data) {
  return request({
    url: `/link`,
    method: 'put',
    data
  })
}

export function linkAdd(data) {
  return request({
    url: `/link`,
    method: 'post',
    data
  })
}

export function linkDel(id) {
  return request({
    url: `/link/${id}`,
    method: 'delete'
  })
}
