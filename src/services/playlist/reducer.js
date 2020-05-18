import { ADD_PLAYLIST_USER, ADD_POST_TO_PLAYLIST } from './actions'

export default function playlistReducer(state = [], action) {
    switch (action.type) {
        case ADD_PLAYLIST_USER:
            return [ ...state, ...action.playlist ]
        
        case ADD_POST_TO_PLAYLIST:
            const { playlistId, postId } = action
            return state.map(playlist => playlist._id === playlistId
                ? {
                    ...playlist, 
                    posts: [...playlist.posts, { _id: postId }], 
                    countSong: playlist.countSong + 1 
                } : playlist)
            
        default:
            return state
    }
}