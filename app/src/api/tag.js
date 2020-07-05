import request from '@/utils/request'

export function getTagList(data, query) {
  return request({
    url: `/tag/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function getTagFilterList(data) {
  return request({
    url: `/tag/filter/list`,
    method: 'post',
    data
  })
}

export function getTagById(id) {
  return request({
    url: `/tag/${id}`,
    method: 'get'
  })
}

export function tagUpdate(data) {
  return request({
    url: `/tag`,
    method: 'put',
    data
  })
}

export function tagAdd(data) {
  return request({
    url: `/tag`,
    method: 'post',
    data
  })
}

export function tagDel(id) {
  return request({
    url: `/tag/${id}`,
    method: 'delete'
  })
}
