import { ADD_TO_PLAYLIST } from './actions'

export function songReducer(state=[], actions) {
    switch (actions.type) {
        case ADD_TO_PLAYLIST:
            return [...state, actions.source]

        default:
            return state
    }
}