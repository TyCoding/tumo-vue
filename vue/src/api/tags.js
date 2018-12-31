import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/tags/findAll',
        method: 'get',
    })
}

export function findById() {
    return request({
        url: '/tags/findById',
        method: 'post'
    })
}

export function findByPage(pageCode, pageSize) {
    return request({
        url: '/tags/findByPage',
        method: 'post',
        params: {
            pageCode,
            pageSize
        }
    })
}

export function save(obj) {
    return request({
        url: '/tags/save',
        method: 'post',
        data: obj
    })
}

export function update(obj) {
    return request({
        url: '/tags/update',
        method: 'put',
        data: obj
    })
}

export function deleteById(ids) {
    return request({
        url: '/tags/delete',
        method: 'post',
        data: ids
    })
}
