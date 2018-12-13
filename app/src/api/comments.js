import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/comments/findAll',
        method: 'get',
    })
}
