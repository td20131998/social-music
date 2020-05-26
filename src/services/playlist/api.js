import request from 'common/request'

const PLAYLIST = '/api/playlists'

export function apiGetPlaylistUser() {
    return request({
        url: `${PLAYLIST}/forUser`,
        method: 'get'
    })
}

export function apiSavePostToPlaylist(playlistId, postId) {
    const data = { postId: postId }
    return request({
        url: `${PLAYLIST}/${playlistId}/addPostToPlaylist`,
        method: 'put',
        data: data
    })
}

export function apiCreatePlaylist(playlistName) {
    const data = { name: playlistName }
    return request({
        url: `${PLAYLIST}`,
        method: 'post',
        data
    })
}

export function apiRemovePlaylist(playlistId) {
    return request({
        url: `${PLAYLIST}/${playlistId}`,
        method: 'delete',
    })
}

export function apiUpdatePlaylist(playlistId, newPlaylistName) {
    const data = { name: newPlaylistName }
    return request({
        url: `${PLAYLIST}/${playlistId}`,
        method: 'put',
        data
    })
}