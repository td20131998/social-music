import { apiSavePostToPlaylist } from "./api";

export const ADD_PLAYLIST_USER = "INIT_PLAYLIST_USER";
export const ADD_POST_TO_PLAYLIST = "ADD_POST_TO_PLAYLIST";
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const SUB_PLAYLIST = "SUB_PLAYLIST" 
export const EDIT_PLAYLIST = "EDIT_PLAYLIST"

export const initPlaylistUser = (playlists) => ({
  type: ADD_PLAYLIST_USER,
  playlists,
});

export const addPostToPlaylist = (postId, playlistId) => {
  return function (dispatch) {
    return apiSavePostToPlaylist(playlistId, postId).then((playlist) =>
      dispatch({
        type: ADD_POST_TO_PLAYLIST,
        postId,
        playlistId,
      })
    );
  };
};

export const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST_USER,
  playlists: [playlist]
});

export const subPlaylist = (playlistId) => ({
    type: SUB_PLAYLIST,
    playlistId
})

export const editPlaylist = (playlist) => ({
  type: EDIT_PLAYLIST,
  playlist
})