import request from '@/utils/request'

export function getList() {
  return request({
    url: `/qiniu/list`,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: `/qiniu/${id}`,
    method: 'delete'
  })
}

export function update(oldname, newname) {
  return request({
    url: `/qiniu/update?oldname=${oldname}&newname=${newname}`,
    method: 'put'
  })
}

export function download(name) {
  return request({
    url: `/qiniu/download?name=${name}`,
    method: 'get'
  })
}
