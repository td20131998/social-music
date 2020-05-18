import { savePostToPlaylist } from './api'

export const ADD_PLAYLIST_USER = 'INIT_PLAYLIST_USER'
export const ADD_POST_TO_PLAYLIST = 'ADD_POST_TO_PLAYLIST' 

export const initPlaylistUser = playlist => ({
    type: ADD_PLAYLIST_USER,
    playlist
})

export const addPostToPlaylist = (postId, playlistId) => {
    return function(dispatch) {
        return savePostToPlaylist(playlistId, postId)
            .then(playlist => dispatch({
                type: ADD_POST_TO_PLAYLIST,
                postId,
                playlistId
            }))
    }
}