import { ADD_TO_STACK_PLAYLIST, PLAY_NEXT, PLAY_PREVIOUS, PLAY_OR_PAUSE } from "./actions";

const inittialState = {
  stack: ['1589962749543-4c7b4108f32.mp3'],
  playingIndex: 0,
  playing: false
};

export default function playerReducer(state = inittialState, action) {
  const { stack, playingIndex } = state
  switch (action.type) {
    case ADD_TO_STACK_PLAYLIST:
      return { stack: [action.audio, ...state.stack], playingIndex: 0 };

    case PLAY_NEXT:
      return { ...state, playingIndex: playingIndex === stack.length - 1 ? 0 : playingIndex + 1 }
    
    case PLAY_PREVIOUS:
      return { ...state, playingIndex: playingIndex === 0 ? stack.length - 1 : playingIndex - 1 }
    case PLAY_OR_PAUSE: 
      return { ...state, playing: !state.playing }

    default:
      return state;
  }
}
