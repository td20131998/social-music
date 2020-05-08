import request from '../../common/request'

export function getListComment(postId, page) {
    return request({
        url: `/api/comments/${postId}`,
        method: 'get'
    })
}

export function addComment(postId, content) {
    console.log(content)
    return request({
        url: `/api/comments/${postId}`,
        method: 'post',
        data: content
    })
}