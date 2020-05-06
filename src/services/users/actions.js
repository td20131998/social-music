export const INIT_USER_INFO = 'INIT_USER_INFO'
export const SET_AUTHENTICATE = 'SET_AUTHENTICATE'

export const initUserInfo = userInfo => ({
    type: INIT_USER_INFO,
    userInfo
})

export const setAuthenticate = isAuthenticated => ({
    type: SET_AUTHENTICATE,
    isAuthenticated
})
