import request from 'common/request'

export function apiGetListComment(postId, page) {
    return request({
        url: `/api/comments/${postId}?page=${page}`,
        method: 'get'
    })
}

export function apiAddComment(postId, content) {
    return request({
        url: `/api/comments/${postId}`,
        method: 'post',
        data: content
    })
}