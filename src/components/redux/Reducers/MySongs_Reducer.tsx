import {AppStateType, BaseThunkType, InferActionsTypes} from "../redux-store";




type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actionsMySongsPlaylist>
type ThunkType = BaseThunkType<Actions>

export type Song = {
    id:  number
    title_short:string
    preview: string
    trackLink:string
    artist: string
    artistLink:string
    album:string
    albumCover:string
    albumLink:string
}
export function getMySongsPlaylist(state:AppStateType){
    return state.mySongs.mySongsPlaylist
}
let initialState = {
    isLoading: false,
    mySongsPlaylist: [
        {
            id:  1109731,
            title_short:'Lose Yourself',
            preview: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            trackLink:"https://www.deezer.com/track/1109731",
            artist: 'Eminem',
            artistLink:"https://www.deezer.com/artist/13",
            album:'Curtain Call: The Hits',
            albumCover:"https://cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
            albumLink:"https://api.deezer.com/album/119606/tracks"
        }
    ]  ,


}
export const mySongsReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {

        case 'SET_NEW_MY_SONG' :
            return {
                ...state,
                mySongsPlaylist: state.mySongsPlaylist.concat(action.payload.newSong)

            }
            case 'REMOVE_NEW_MY_SONG' :
            return {
                ...state,
                mySongsPlaylist: state.mySongsPlaylist.filter((song)=>song.id!== action.payload.idRemoverSong)

            }


        default:
            return state
    }
}


export const actionsMySongsPlaylist = {

    setNewMySong: (newSong:Song) => ({
        type: 'SET_NEW_MY_SONG',
        payload: {newSong}
    } as const),
    removeMySong: (idRemoverSong:number) => ({
        type: 'REMOVE_NEW_MY_SONG',
        payload: {idRemoverSong}
    } as const),

}









