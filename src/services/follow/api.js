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
