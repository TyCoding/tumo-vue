import request from '@/utils/request'

export function findAllArticle() {
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

export function findByPageForSite(pageCode, pageSize) {
    return request({
        url: '/article/findByPageForSite',
        method: 'post',
        params: {
            pageCode,
            pageSize
        }
    })
}

export function deleteById(ids) {
    return request({
        url: '/article/delete',
        method: 'post',
        data: ids
    })
}

export function findCountByArticleId(id) {
    return request({
        url: '/comments/findCountByArticleId?articleId=' + id,
        method: 'get',
    })
}
