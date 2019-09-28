import request from '@/utils/request'

export function getList() {
  return request({
    url: `/api/storage/qiniu/list`,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: `/api/storage/qiniu/${id}`,
    method: 'delete'
  })
}

export function update(oldname, newname) {
  return request({
    url: `/api/storage/qiniu/update?oldname=${oldname}&newname=${newname}`,
    method: 'put'
  })
}

export function download(name) {
  return request({
    url: `/api/storage/qiniu/download?name=${name}`,
    method: 'get'
  })
}
