import request from 'common/request'

export function getPlaylistUser() {
    return request({
        url: '/api/playlists/forUser',
        method: 'get'
    })
}

export function savePostToPlaylist(playlistId, postId) {
    const data = { postId: postId }
    return request({
        url: `/api/playlists/${playlistId}/addPostToPlaylist`,
        method: 'put',
        data: data
    })
}