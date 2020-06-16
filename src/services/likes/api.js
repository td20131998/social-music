import request from 'common/request'
const LIKE = "/api/likes"

export function apiGetListLike(postId, page) {
    return request({
        url: `${LIKE}/${postId}`,
        method: 'get'
    })
}

export function apiLikePost(id) {
    return request({
        url: `${LIKE}/${id}`,
        method: 'post'
    })
}

export function apiUnlikePost(id) {
    return request({
        url: `${LIKE}/${id}`,
        method: 'delete'
    })
}