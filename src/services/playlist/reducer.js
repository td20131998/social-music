import {
  ADD_PLAYLIST_USER,
  ADD_POST_TO_PLAYLIST,
  SUB_PLAYLIST,
  EDIT_PLAYLIST,
} from "./actions";

export default function playlistReducer(state = [], action) {
  switch (action.type) {
    case ADD_PLAYLIST_USER:
      return [...state, ...action.playlists];

    case ADD_POST_TO_PLAYLIST:
      const { playlistId, post } = action;
      return state.map((playlist) =>
        playlist._id === playlistId
          ? {
              ...playlist,
              posts: [...playlist.posts, post],
              // countSong: playlist.countSong + 1,
            }
          : playlist
      );

    case SUB_PLAYLIST:
      return state.filter((playlist) => playlist._id !== action.playlistId);

    case EDIT_PLAYLIST:
      const { _id, name } = action.playlist;
      return state.map((playlist) =>
        playlist._id === _id ? { ...playlist, name: name } : playlist
      );

    default:
      return state;
  }
}
