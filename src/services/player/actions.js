export const ADD_TO_STACK_PLAYLIST = 'ADD_TO_STACK_PLAYLIST'
export const INIT_LIST_AUDIO = 'INIT_LIST_AUDIO' 
export const PLAY_NEXT = 'PLAY_NEXT' 
export const PLAY_PREVIOUS = 'PLAY_PREVIOUS'
export const PLAY_OR_PAUSE ='PLAY_OR_PAUSE'
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'

export const addToStackPlaylist = (audio) => ({
    type: ADD_TO_STACK_PLAYLIST,
    audio
})

export const initListAudio = (audios) => ({
    type: INIT_LIST_AUDIO,
    audios
})

export const playnext = () => ({
    type: PLAY_NEXT
})

export const playprevious = () => ({
    type: PLAY_PREVIOUS
})

export const playorpause = () => ({
    type: PLAY_OR_PAUSE
})

export const play = () => ({ type: PLAY })
export const pause = () => ({ type: PAUSE })