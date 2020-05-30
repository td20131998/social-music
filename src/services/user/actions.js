export const INIT_USER_INFO = "INIT_USER_INFO";
export const SET_AUTHENTICATE = "SET_AUTHENTICATE";
export const SET_USER_ACTIVE = "SET_USER_ACTIVE";
export const SET_USER_VISITING = "SET_USER_VISITING";

export const initUserInfo = (userInfo) => ({
  type: INIT_USER_INFO,
  userInfo,
});

export const setAuthenticate = (isAuthenticated) => ({
  type: SET_AUTHENTICATE,
  isAuthenticated,
});

export const setUserActive = (isActive) => ({
  type: SET_USER_ACTIVE,
  isActive,
});
