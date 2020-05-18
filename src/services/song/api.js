import request from '../../common/request'

export function getMusic(source) {
    return request({
        url: `/api/songs/${source}/play`,
        method: 'get',
        // responseType: 'arrayBuffer',
    })
}