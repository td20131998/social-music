import MinimapPlugin from "wavesurfer.js/dist/plugin/wavesurfer.minimap";

export const ADD_TO_STACK_PLAYLIST = "ADD_TO_STACK_PLAYLIST";
export const INIT_LIST_AUDIO = "INIT_LIST_AUDIO";
export const PLAY_NEXT = "PLAY_NEXT";
export const PLAY_PREVIOUS = "PLAY_PREVIOUS";
export const PLAY_OR_PAUSE = "PLAY_OR_PAUSE";
export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const TOGGLE_PLAYER_VISIBLE = "TOGGLE_PLAYER_VISIBLE";
export const PLAY_PLAYLIST = "PLAY_PLAYLIST";
export const CHANGE_TRACK = "CHANGE_TRACK";

export const addToStackPlaylist = (post) => ({
  type: ADD_TO_STACK_PLAYLIST,
  post,
});

export const initListAudio = (audios) => ({
  type: INIT_LIST_AUDIO,
  audios,
});

export const playnext = () => ({
  type: PLAY_NEXT,
});

export const playprevious = () => ({
  type: PLAY_PREVIOUS,
});

export const playorpause = () => ({
  type: PLAY_OR_PAUSE,
});

export const play = () => ({ type: PLAY });

export const pause = () => ({ type: PAUSE });

export const togglePlayerVisible = () => ({ type: TOGGLE_PLAYER_VISIBLE });

export const playPlaylist = (playlist) => ({
  type: PLAY_PLAYLIST,
  playlist,
});

export const changeTrack = (trackIndex) => ({
  type: CHANGE_TRACK,
  trackIndex
})