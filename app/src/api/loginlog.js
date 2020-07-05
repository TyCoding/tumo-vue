import request from '@/utils/request'

export function getLoginLogList(data, query) {
  return request({
    url: `/loginlog/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function loginLogDel(id) {
  return request({
    url: `/loginlog/${id}`,
    method: 'delete'
  })
}
