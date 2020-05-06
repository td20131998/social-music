import request from '../../common/request'

export function getListPost(page) {
    return request({
        url: `/api/posts?page=${page}`,
        method: 'get'
    })
}

export function likePost(id) {
    return request({
        url: `/api/likes/${id}`,
        method: 'post'
    })
}

export function unlikePost(id) {
    return request({
        url: `/api/likes/${id}`,
        method: 'delete'
    })
}