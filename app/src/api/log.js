import request from '@/utils/request'

export function getLogList(data, query) {
  return request({
    url: `/log/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function logDel(id) {
  return request({
    url: `/log/${id}`,
    method: 'delete'
  })
}
