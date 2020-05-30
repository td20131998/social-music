import request from "common/request";

const USER = "/api/users";

export function apiLogin(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function apiSignin(data) {
  return request({
    url: "/signup",
    method: "post",
    data,
  });
}

export function apiResendActiveUser(data) {
  return request({
    url: "/resend",
    method: "post",
    data,
  });
}

export function apiGetUserInfoByUsername(username) {
  return request({
    url: `${USER}/${username}`,
    method: "get",
  });
}

export function apiChangeUserInfo(data) {
  return request({
    url: USER,
    method: "put",
    data,
  });
}

export function apiChangeUserAvatar(data) {
  return request({
    url: `${USER}/changeAvatar`,
    method: "put",
    data,
  });
}

export function apiChangePassword(data) {
  return request({
    url: `${USER}/changePassword`,
    method: 'put',
    data
  })
}
