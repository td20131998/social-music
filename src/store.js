import { createStore } from 'redux'
import rootReducer from './rootReducer'

const store = createStore(rootReducer)

export function getStore() {
    return store
}

export function getUser() {
    return store.getState().user
}

export function getUserInfo() {
    return getUser().info
}

export function isAuthenticated() {
    return getUser().isAuthenticated
}