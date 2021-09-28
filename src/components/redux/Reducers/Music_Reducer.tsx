import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {MusicAPI} from "../../api/Music_API";


type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<Actions>

export type SongType = {
    id: number
    title_short: string
    link: string
    preview: string
    artist: Artist
    album: Album
}
type Artist = {
    name: string
    picture_big: string
    tracklist: string

}
type Album = {
    title: string
    cover_big: string
    tracklist: string

}


let initialState = {
    isLoading: false,
    playlist: [] as Array<SongType>,
    error: null as string | null,
    nextPageToken: null as string | null,
    prevPageToken: null as string | null,

}
export const musicReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {

        case 'deezer/SET_IS_LOADING' :
            return {
                ...state,
                isLoading: action.payload.isLoading


            }

        case 'deezer/SET_SONGS' :
            return {
                ...state,
                playlist: action.payload.playlist,
            }
        case 'deezer/SET_MORE_SONGS' :
            return {
                ...state,
                playlist: state.playlist.concat(action.payload.playlist),
            }

        case 'deezer/SET_ERROR' :
            return {
                ...state,
                error: action.payload.error === 4 ? 'Слишком много запросов' : !action.payload.error ? null : 'Что-то другое'


            }
        case 'deezer/SET_NEXT_PREV_TOKEN' :
            return {
                ...state,
                nextPageToken: action.payload.next,
                prevPageToken: action.payload.prev

            }


        default:
            return state
    }
}


const actions = {
    setIsLoadingNews: (isLoading: boolean) => ({
        type: 'deezer/SET_IS_LOADING',
        payload: {isLoading}
    } as const),
    setSongs: (playlist: Array<SongType>) => ({
        type: 'deezer/SET_SONGS',
        payload: {playlist}
    } as const),
    setMoreSongs: (playlist: Array<SongType>) => ({
        type: 'deezer/SET_MORE_SONGS',
        payload: {playlist}
    } as const),

    setError: (error: number | null) => ({
        type: 'deezer/SET_ERROR',
        payload: {error}
    } as const),
    setNextPrevToken: (next: string | null, prev: string | null) => ({
        type: 'deezer/SET_NEXT_PREV_TOKEN',
        payload: {next, prev}
    } as const)


}


export const getSongsBySearch = (searchTerm: string): ThunkType => async (dispatch) => {
    dispatch(actions.setIsLoadingNews(true))
    let response = await MusicAPI.getMusicBySearch(searchTerm)
    if (response.error) {
        dispatch(actions.setError(response.error.code))
    } else {
        dispatch(actions.setError(null))
        dispatch(actions.setSongs(response.data))
        dispatch(actions.setNextPrevToken(response.next ? response.next : null, response.prev ? response.prev : null))

    }
    dispatch(actions.setIsLoadingNews(false))
}
export const getNextOrPrevPage = (token: string): ThunkType => async (dispatch) => {
    dispatch(actions.setIsLoadingNews(true))
    let response = await MusicAPI.getNextOrPrevPage(token)
    if (response.error) {
        dispatch(actions.setError(response.error.code))
    } else {
        dispatch(actions.setError(null))
        dispatch(actions.setMoreSongs(response.data))
        dispatch(actions.setNextPrevToken(response.next ? response.next : null, response.prev ? response.prev : null))

    }

    dispatch(actions.setIsLoadingNews(false))

}



