import { combineReducers  } from 'redux'
import userReducer from 'services/user/reducer'
import playlistReducer from 'services/playlist/reducer'
import playerReducer from 'services/player/reducer'
import streamReducer from 'services/stream/reducer'

const rootReducer = combineReducers({
    user: userReducer,
    playlists: playlistReducer,
    player: playerReducer,
    stream: streamReducer
})

export default rootReducer