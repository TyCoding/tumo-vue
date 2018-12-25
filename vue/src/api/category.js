import request from '@/utils/request'

export function findArchives() {
    return request({
        url: '/article/findArchives',
        method: 'get',
    })
}

