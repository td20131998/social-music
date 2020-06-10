import { TOGGLE_STREAMING } from './actions'

const initialState = {
    streaming: false
}

export default function streamReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_STREAMING:
            return { ...state, streaming: !state.streaming }
            
        default: 
            return state
    }
}