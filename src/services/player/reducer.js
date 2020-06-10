import {
  ADD_TO_STACK_PLAYLIST,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  PLAY_OR_PAUSE,
  PLAY,
  PAUSE,
  TOGGLE_PLAYER_VISIBLE
} from "./actions";

const inittialState = {
  stack: [],
  playingIndex: 0,
  playing: false,
  visible: true,
};

export default function playerReducer(state = inittialState, action) {
  const { stack, playingIndex, visible } = state;
  switch (action.type) {
    case ADD_TO_STACK_PLAYLIST:
      return { stack: [action.audio, ...state.stack], playingIndex: 0, visible };

    case PLAY_NEXT:
      return {
        ...state,
        playingIndex: playingIndex === stack.length - 1 ? 0 : playingIndex + 1,
      };

    case PLAY_PREVIOUS:
      return {
        ...state,
        playingIndex: playingIndex === 0 ? stack.length - 1 : playingIndex - 1,
      };
    case PLAY_OR_PAUSE:
      return { ...state, playing: !state.playing };

    case PLAY:
      return { ...state, playing: true };

    case PAUSE:
      return { ...state, playing: false };
    
    case TOGGLE_PLAYER_VISIBLE:
      return { ...state, visible: !visible, playing: false }

    default:
      return state;
  }
}
