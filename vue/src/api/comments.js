import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/comments/findAll',
        method: 'get',
    })
}

export function findByPage(pageCode, pageSize) {
    return request({
        url: '/comments/findByPage',
        method: 'post',
        params: {
            pageCode,
            pageSize
        }
    })
}
