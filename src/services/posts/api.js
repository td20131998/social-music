import request from '../../common/request'

export function getListPost(page) {
    return request({
        url: `/api/posts?page=${page}`,
        method: 'get'
    })
}
