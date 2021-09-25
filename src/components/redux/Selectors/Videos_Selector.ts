import {AppStateType} from "../redux-store";



export function getIsLoading(state:AppStateType){
    return state.video.isLoading
}
export function getTotalResults(state:AppStateType){
    return state.video.totalResults
}
export function getVideosDetails(state:AppStateType){
    return state.video.videosDetails
}
export function getError(state:AppStateType){
    return state.video.errorCode
}
export function getPrevNextPageToken(state:AppStateType){
    return {
        prevPageToken: state.video.prevPageToken,
        nextPageToken: state.video.nextPageToken
    }
}
