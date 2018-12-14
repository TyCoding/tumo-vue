import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/article/findAll',
        method: 'get',
    })
}

export function findById() {
    return request({
        url: '/article/findById',
        method: 'post'
    })
}

export function findByPage(pageCode, pageSize) {
    return request({
        url: '/article/findByPage',
        method: 'post',
        params: {
            pageCode,
            pageSize
        }
    })
}
