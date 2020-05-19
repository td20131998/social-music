import request from 'common/request'

export function getListLike(postId, page) {
    return request({
        url: `/api/likes/${postId}`,
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