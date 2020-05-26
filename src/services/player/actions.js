export const ADD_NEW_SONG = 'ADD_NEW_SONG'
export const INIT_LIST_AUDIO = 'INIT_LIST_AUDIO' 

export const addNewSong = (audio) => ({
    type: ADD_NEW_SONG,
    audio
})

export const initListAudio = (audios) => ({
    type: INIT_LIST_AUDIO,
    audios
})