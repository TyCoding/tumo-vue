import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/article/findAll',
        method: 'get',
    })
}

export function findById(id) {
    return request({
        url: '/article/findById?id=' + id,
        method: 'get'
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
