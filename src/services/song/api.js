import request from "common/request";

const SONG = "/api/songs"
export function apiGetMusic(source) {
  return request({
    url: `${SONG}/${source}/play`,
    method: "get",
    // responseType: 'arrayBuffer',
  });
}

export function apiUploadMusic(file, config) {
  let formData = new FormData();
  formData.append("file", file);
  return request({
    url: `${SONG}/upload`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });
}

export function apiRemoveMusic(name) {
  return request({
    url: `${SONG}/${name}`,
    method: "delete",
  });
}
