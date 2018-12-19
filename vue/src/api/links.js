import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/links/findAll',
        method: 'get',
    })
}

export function findById() {
    return request({
        url: '/links/findById',
        method: 'post'
    })
}

export function findByPage(pageCode, pageSize) {
    return request({
        url: '/links/findByPage',
        method: 'post',
        params: {
            pageCode,
            pageSize
        }
    })
}
