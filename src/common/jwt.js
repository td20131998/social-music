import jwtDecode from 'jwt-decode'

export function getToken() {
    const token = localStorage.getItem('token')
    return token
}

export function setToken(token) {
    return localStorage.setItem('token', token)
}

export function resetToken() {
    return localStorage.removeItem('token')
}

export function decodeJwt() {
    const token = getToken()
    if (token) {
        return jwtDecode(token)
    }
    return false
}

export function isExpired() {
    const decodedJwt = decodeJwt()
    if (decodedJwt && decodedJwt.exp > (Date.now() / 1000)) {
        return true
    }
    return false
}