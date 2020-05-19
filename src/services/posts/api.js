import request from 'common/request'

export function getListPost(page) {
    return request({
        url: `/api/posts?page=${page}`,
        method: 'get'
    })
}

export function uploadMusic(file, config) {
    let formData = new FormData()
    formData.append('file', file)
    return request({
        url: '/api/songs/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        ...config
    })
}

export function createPost(data) {
    return request({
        url: '/api/posts',
        method: 'post',
        data: data
    })
}

export function removeMusic(name) {
    return request({
        url: `/api/songs/${name}`,
        method: 'delete'
    })
}