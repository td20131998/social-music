import { INIT_USER_INFO, SET_AUTHENTICATE, SET_USER_ACTIVE } from "./actions";
import { isExpired, decodeJwt, getToken } from "common/jwt";

function initUserInfo() {
  return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : {}
}

const initialState = {
  isAuthenticated: isExpired(),
  info: initUserInfo(),
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_USER_INFO:
      return { ...state, info: action.userInfo };

    case SET_AUTHENTICATE:
      return { ...state, isAuthenticated: action.isAuthenticated };

    case SET_USER_ACTIVE:
      return { ...state, isActive: action.isActive };
    
    default:
      return state;
  }
}
