import request from '@/utils/request'

export function getCommentList(data, query) {
  return request({
    url: `/api/comment/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function findAllComment() {
  return request({
    url: `/api/comment/findAll`,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: `/api/comment/${id}`,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: `/api/comment`,
    method: 'post',
    data
  })
}

export function getListForArticle(articleId, page) {
  return request({
    url: `/api/comment/listForArticle?articleId=${articleId}&page=${page}`,
    method: 'get'
  })
}

export function getListForAbout(page) {
  return request({
    url: `/api/comment/listForAbout?page=${page}`,
    method: 'get'
  })
}

export function getListForLink(page) {
  return request({
    url: `/api/comment/listForLink?page=${page}`,
    method: 'get'
  })
}
