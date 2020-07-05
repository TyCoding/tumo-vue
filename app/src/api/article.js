import request from '@/utils/request'

export function getArticleList(data, query) {
  return request({
    url: `/article/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function findByCategory(id) {
  return request({
    url: `/article/findByCategory/${id}`,
    method: 'get'
  })
}

export function findByTag(id) {
  return request({
    url: `/article/findByTag/${id}`,
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

export function articleUpdate(data) {
  return request({
    url: `/article`,
    method: 'put',
    data
  })
}

export function articleAdd(data) {
  return request({
    url: `/article`,
    method: 'post',
    data
  })
}

export function articleDel(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  })
}
