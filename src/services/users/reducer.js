import { INIT_USER_INFO, SET_AUTHENTICATE } from "./actions";
import { isExpired, decodeJwt, getToken } from "../../common/jwt";

function initUserInfo() {
  let decodedJwt = decodeJwt(getToken());

  if (decodedJwt && decodedJwt.userInfo) {
    delete decodedJwt.userInfo.comments;
    delete decodedJwt.userInfo.likes;
    delete decodedJwt.userInfo.password;
    return decodedJwt.userInfo
  }
  return {}
}

const initialState = {
  isAuthenticated: isExpired(),
  info: initUserInfo()
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_USER_INFO:
      return { ...state, info: action.userInfo };

    case SET_AUTHENTICATE:
      return { ...state, isAuthenticated: action.isAuthenticated };

    default:
      return state;
  }
}
