import request from '@/utils/request'

export function getQiniuList() {
  return request({
    url: `/qiniu/list`,
    method: 'get'
  })
}

export function qiniuFindByName(name) {
  return request({
    url: `/qiniu?name=${name}`,
    method: 'delete'
  })
}

export function qiniuDel(name) {
  return request({
    url: `/qiniu?name=${name}`,
    method: 'delete'
  })
}

export function qiniuUpdate(oldname, newname) {
  return request({
    url: `/qiniu/update?oldname=${oldname}&newname=${newname}`,
    method: 'put'
  })
}
