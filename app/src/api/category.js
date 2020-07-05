import request from '@/utils/request'

export function getCategoryList(data, query) {
  return request({
    url: `/category/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function getCategoryFilterList(data) {
  return request({
    url: `/category/filter/list`,
    method: 'post',
    data
  })
}

export function getCategoryById(id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  })
}

export function categoryUpdate(data) {
  return request({
    url: `/category`,
    method: 'put',
    data
  })
}

export function categoryAdd(data) {
  return request({
    url: `/category`,
    method: 'post',
    data
  })
}

export function categoryDel(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}
