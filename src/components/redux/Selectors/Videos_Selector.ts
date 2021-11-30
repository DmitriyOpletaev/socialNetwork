import {AppStateType} from "../redux-store";


export const MainVideoSelector={
    userChannel:({videoMainReducer}:AppStateType)=>videoMainReducer.userChannel,
    subscriptionsChannels:({videoMainReducer}:AppStateType)=>videoMainReducer.subscriptionsChannels,
    openedModalWindow:({videoMainReducer}:AppStateType)=>videoMainReducer.openedModalWindow,
    loadingSubscribeId:({videoMainReducer}:AppStateType)=>videoMainReducer.loadingSubscribeId,
}
export const SearchVideosSelector= {
    isLoading: ({videosSearch}: AppStateType) => videosSearch.isLoading,
    error: ({videosSearch}: AppStateType) => videosSearch.error,
    searchByTermDetails: ({videosSearch}: AppStateType) => videosSearch.searchByTermDetails,
    searchDetails: ({videosSearch}: AppStateType) => videosSearch.searchDetails,
    searchResult: ({videosSearch}: AppStateType) => videosSearch.searchResult,
}
export const CurrentVideoSelector={
    isLoading:({currentVideo}:AppStateType)=>currentVideo.isLoading,
    videoDetails:({currentVideo}:AppStateType)=>currentVideo.currentVideo,
    videoStatistics:({currentVideo}:AppStateType)=>currentVideo.currentVideoStatistics,
    currentUserRating:({currentVideo}:AppStateType)=>currentVideo.userRating,
    channel:({currentVideo}:AppStateType)=>currentVideo.channelDetails,
    relatedVideoDetails:({currentVideo}:AppStateType)=>currentVideo.relatedVideoDetails,
    videoAbuseReasons:({currentVideo}:AppStateType)=>currentVideo.videoAbuse,
    errorCurrentVideo:({currentVideo}:AppStateType)=>currentVideo.error,
    videoComments:({currentVideo}:AppStateType)=>currentVideo.commentsDetails,
}
export const CurrentChannelSelector={
    isLoading:({currentChannel}:AppStateType)=>currentChannel.isLoading,
    error:({currentChannel}:AppStateType)=>currentChannel.error,
    channelInfo:({currentChannel}:AppStateType)=>currentChannel.channelInfo,
    multipleChannels:({currentChannel}:AppStateType)=>currentChannel.multipleChannels,
    mainPagePlaylists:({currentChannel}:AppStateType)=>currentChannel.mainPagePlaylists,
    allPlaylists:({currentChannel}:AppStateType)=>currentChannel.allPlaylists,
    allVideos:({currentChannel}:AppStateType)=>currentChannel.allVideos,
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
export function getMultipleChannelsSelector(state:AppStateType){
    return state.currentChannel.multipleChannels
}
export function getMainPagePlaylistsSelector(state:AppStateType){
    return state.currentChannel.mainPagePlaylists
}
export function getAllChannelPlaylistsSelector(state:AppStateType){
    return state.currentChannel.allPlaylists
}
export function getAllChannelVideos(state:AppStateType){
    return state.currentChannel.allVideos
}







//-------------
export function getCurrentVideo(state:AppStateType){
    return state.currentVideo.currentVideo
}
export function getCurrentVideoStatistics(state:AppStateType){
    return state.currentVideo.currentVideoStatistics
}
export function getCurrentUserRating(state:AppStateType){
    return state.currentVideo.userRating
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



