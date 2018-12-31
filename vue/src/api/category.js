import request from '@/utils/request'

export function findArchives() {
    return request({
        url: '/article/findArchives',
        method: 'get',
    })
}

export function findAll() {
    return request({
        url: '/category/findAll',
        method: 'get',
    })
}

export function findById() {
    return request({
        url: '/category/findById',
        method: 'post'
    })
}

export function findByPage(pageCode, pageSize) {
    return request({
        url: '/category/findByPage',
        method: 'post',
        params: {
            pageCode,
            pageSize
        }
    })
}

export function save(obj) {
    return request({
        url: '/category/save',
        method: 'post',
        data: obj
    })
}

export function update(obj) {
    return request({
        url: '/category/update',
        method: 'put',
        data: obj
    })
}

export function deleteById(ids) {
    return request({
        url: '/category/delete',
        method: 'post',
        data: ids
    })
}


