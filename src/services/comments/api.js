import request from '../../common/request'

export function getListComment(postId, page) {
    return request({
        url: `/api/comments/${postId}?page=${page}`,
        method: 'get'
    })
}

export function addComment(postId, content) {
    return request({
        url: `/api/comments/${postId}`,
        method: 'post',
        data: content
    })
}