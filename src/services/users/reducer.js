import { INIT_USER_INFO, SET_AUTHENTICATE } from './actions'
import { isExpired } from '../../common/jwt'

const initialState = {
    isAuthenticated: isExpired(),
    info: {}
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_USER_INFO:
            return { ...state, info: action.userInfo }

        case SET_AUTHENTICATE: 
            return { ...state, isAuthenticated: action.isAuthenticated }
        
        default:
            return state
    }
}
