import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {MusicAPI} from "../../api/Music_API";


type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<Actions>

export type SongType={
    id:number
    title_short:string
    link:string
    preview: string
   // artist: Artist
}
type Artist = {
    name: string
    picture_big: string
    tracklist: string
    album:Album
}
type Album = {
    title:string
    cover_big:string
    tracklist:string

}


let initialState = {
    isLoading: false,
    playlist: [] as Array<SongType>,
    error: null as string|null
}
export const musicReducer = (state = initialState, action: Actions): InitialState => {
    debugger
    switch (action.type) {

        case 'deezer/SET_IS_LOADING' :
            return {
                ...state,
                isLoading: action.payload.isLoading


            }

            case 'deezer/SET_SONGS' :
            return {
                ...state,
                playlist: action.payload.playlist


            }
            case 'deezer/SET_ERROR' :
            return {
                ...state,
                error: action.payload.error===4?'Слишком много запросов':'Некая другая ошибка'


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
    setSongs: (playlist:Array<SongType>)=>({
        type: 'deezer/SET_SONGS',
        payload: {playlist}
    } as const),
    setError: (error:number)=>({
        type: 'deezer/SET_ERROR',
        payload: {error}
    } as const),


}


export const getSongsBySearch = (searchTerm: string): ThunkType => async (dispatch) => {
    dispatch(actions.setIsLoadingNews(true))
    debugger

    let response = await MusicAPI.getMusicBySearch(searchTerm)
    debugger
    if(response.error)dispatch(actions.setError(response.error.code))
    else{
        dispatch(actions.setSongs(response.data))
    }
    debugger


    dispatch(actions.setIsLoadingNews(false))
}


