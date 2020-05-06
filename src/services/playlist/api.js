import request from '../../common/request'

export function getAllPlaylist() {
    return request({
        url: '/api/playlists',
        method: 'get'
    })
}