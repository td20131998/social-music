import request from 'common/request'

export function apiLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function apiSignin(data) {
    return request({
        url: '/signup',
        method: 'post',
        data
    })
}

export function apiResendActiveUser(data) {
    return request({
        url: '/resend',
        method: 'post',
        data
    })
}

export function apiGetUserInfoByUsername(username) {
    return request({
        url: `/api/users/${username}`,
        method: 'get',
    })
}