import { combineReducers  } from 'redux'
import userReducer from 'services/users/reducer'
import playlistReducer from 'services/playlist/reducer'

const rootReducer = combineReducers({
    user: userReducer,
    playlists: playlistReducer
})

export default rootReducer