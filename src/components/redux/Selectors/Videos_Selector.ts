import {AppStateType} from "../redux-store";


//--------------Search Videos

export function getIsLoading(state:AppStateType){
    return state.videosSearch.isLoading
}
export function getTotalResults(state:AppStateType){
    return state.videosSearch.totalResults
}
export function getVideosDetails(state:AppStateType){
    return state.videosSearch.videosDetails
}
export function getSearchError(state:AppStateType){
    return state.videosSearch.searchError
}
export function getContentCategory(state:AppStateType){
    return state.videosSearch.category
}
export function getSearchTerm(state:AppStateType){
    return state.videosSearch.searchTerm
}
export function getPrevNextPageToken(state:AppStateType){
    return {
        prevPageTokenSearch: state.videosSearch.prevPageTokenSearch,
        nextPageTokenSearch: state.videosSearch.nextPageTokenSearch
    }
}

//-------------Current Video

export function getCurrentVideo(state:AppStateType){
    return state.currentVideo.currentVideo
}
export function getCurrentVideoStatistics(state:AppStateType){
    return state.currentVideo.currentVideoStatistics
}
export function getCurrentVideoChannel(state:AppStateType){
    return state.currentVideo.channelDetails
}
export function getRelatedVideoDetails(state:AppStateType){
    return state.currentVideo.relatedVideoDetails
}
export function getIsLoadingCurrentVideoDetails(state:AppStateType){
    return state.currentVideo.isLoading
}
export function getErrorCurrentVideo(state:AppStateType){
    return state.currentVideo.error
}
export function getVideoCommentsSelector(state:AppStateType){
    return state.currentVideo.commentsDetails
}
export function getVideoCommentAnswers(state:AppStateType){
    return state.currentVideo.answers
}

//------------Current Channel
export function getIsLoadingCurrentChannelSelector(state:AppStateType){
    return state.currentChannel.isLoading
}
export function getErrorCurrentChannelSelector(state:AppStateType){
    return state.currentChannel.error
}
export function getCurrentChannelInfoSelector(state:AppStateType){
    return state.currentChannel.channelInfo
}
