import request from "common/request";

const STREAM = "/api/streams";
export function apiCreateStream(data) {
  return request({
    url: STREAM,
    method: "post",
    data,
  });
}

export function apiGetStreams(userId) {
  return request({
    url: `${STREAM}/${userId}`,
    method: "get",
  });
}
