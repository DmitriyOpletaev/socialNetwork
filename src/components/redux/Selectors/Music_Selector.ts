import {AppStateType} from "../redux-store";


   export function getSearchPlaylist(state:AppStateType) {
       return state.music.playlist
   }
   export function getIsLoading(state:AppStateType) {
       return state.music.isLoading
   }
   export function getErrorMusic(state:AppStateType) {
       return state.music.error
   }
   export function getNextPageToken(state:AppStateType) {
       return state.music.nextPageToken
   }
   export function getPrevPageToken(state:AppStateType) {
       return state.music.prevPageToken
   }