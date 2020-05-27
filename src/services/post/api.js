import request from "common/request";

const POST = '/api/posts'

export function apiGetListPost(page) {
  return request({
    url: `${POST}?page=${page}`,
    method: "get",
  });
}

export function apiGetListPostOfUser({ userId, page }) {
  return request({
    url: `${POST}/${userId}?page=${page}`,
    method: "post",
  });
}

export function apiGetListPostLikedByUser({ page }) {
  console.log("like: ", page)
  return request({
    url: `${POST}/like?page=${page}`,
    method: "get",
  });
}

export function apiUploadMusic(file, config) {
  let formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/api/songs/upload",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });
}

export function apiCreatePost(data) {
  return request({
    url: "/api/posts",
    method: "post",
    data: data,
  });
}

export function apiRemoveMusic(name) {
  return request({
    url: `/api/songs/${name}`,
    method: "delete",
  });
}
