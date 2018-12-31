import request from '@/utils/request'

export function domain() {
    return request({
        url: '/qiniu/domain',
        method: 'get'
    })
}

export function getToken() {
    return request({
        url: '/qiniu/upload/token', // 假地址 自行替换
        method: 'get'
    })
}

export function list() {
    return request({
        url: '/qiniu/list',
        method: 'get'
    })
}

export function upload(file) {
    return request({
        url: '/qiniu/upload',
        method: 'post',
        data: file
    })
}

export function download(name) {
    return request({
        url: '/qiniu/download',
        method: 'get',
        params: {
            name
        }
    })
}

export function deleteOne(name) {
    return request({
        url: '/qiniu/delete',
        method: 'get',
        params: {
            name
        }
    })
}

export function findOne(name) {
    return request({
        url: '/qiniu/find',
        method: 'get',
        params: {
            name
        }
    })
}

export function updateOne(oldname, newname) {
    return request({
        url: '/qiniu/update',
        method: 'get',
        params: {
            oldname,
            newname
        }
    })
}
