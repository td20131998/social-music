import request from 'common/request'

export function apiLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function apiSignin(data) {
    request({
        url: '/signup',
        method: 'post',
        data
    })
}