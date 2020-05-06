import { combineReducers  } from 'redux'
import userReducer from './services/users/reducer'

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer