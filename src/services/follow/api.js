import request from "common/request";

const FOLLOW = "/api/follows";

export function apiFollow(followerId) {
  const data = { followerId: followerId };
  return request({
    url: `${FOLLOW}`,
    method: "post",
    data,
  });
}

export function apiUnfollow(followerId) {
  return request({
    url: `${FOLLOW}/${followerId}`,
    method: "delete",
  });
}

export function apiFollowersOfUser(userId) {
  return request({
    url: `${FOLLOW}/${userId}`,
    method: "get",
  });
}

export function apiSuggestFollow() {
  return request({
    url: `${FOLLOW}/suggest`,
    method: "get",
  });
}

export function apiGetFollowersOf(userId) {
  return request({
    url: `${FOLLOW}/follower/${userId}`,
    method: "get",
  });
}

export function apiGetFollowingsOf(userId) {
  return request({
    url: `${FOLLOW}/following/${userId}`,
    method: "get",
  });
}
