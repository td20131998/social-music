export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST' 

export function addToPlaylist = (source) => {
    return ({
        type: ADD_TO_PLAYLIST,
        source
    })
}