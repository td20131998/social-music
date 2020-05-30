import request from "common/request";

const POST = '/api/posts'

export function apiGetListPost(page) {
  return request({
    url: `${POST}?page=${page}`,
    method: "get",
  });
}

export function apiGetListPostOfUser(userId, page) {
  return request({
    url: `${POST}/${userId}?page=${page}`,
    method: "post",
  });
}

export function apiGetListPostLikedByUser({ page }) {
  return request({
    url: `${POST}/like?page=${page}`,
    method: "get",
  });
}

export function apiCreatePost(data) {
  return request({
    url: POST,
    method: "post",
    data: data,
  });
}

export function apiGetPopularPosts() {
  return request({
    url: `${POST}/popular`,
    method: 'get'
  })
}