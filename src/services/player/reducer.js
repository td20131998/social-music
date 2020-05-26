import { ADD_NEW_SONG } from "./actions";

export default function playerReducer(
  state = ["1589962749543-4c7b4108f32.mp3", "1589978112678-8bea698d56.mp3"],
  action
) {
  switch (action.type) {
    case ADD_NEW_SONG:
      return [action.audio, ...state];

    default:
      return state;
  }
}
