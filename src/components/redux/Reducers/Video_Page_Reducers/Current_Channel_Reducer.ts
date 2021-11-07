import {BaseThunkType, InferActionsTypes} from "../../redux-store";
import {YoutubeAPIVideosList} from "../../../api/Youtube_API/Videos_List";
import {
    CurrentChannelInfo,
    ErrorType,
    MultipleChannelsSections, PlaylistDetails, PreviewVideo,
} from "../../../../types/Videos_Types";
import {PlaylistInfoResponse, PlaylistResponse} from "../../../api/Youtube_API/Types_Youtube_API/Playlist_Types";
import {YoutubeChannelsAPI} from "../../../api/Youtube_API/Channels";
import {YoutubeAPIPlaylist} from "../../../api/Youtube_API/Playlists";


let initialState = {
    isLoading: false,
    error: null as ErrorType | null,
    channelInfo: {} as CurrentChannelInfo,
    multipleChannels: [] as Array<MultipleChannelsSections>,
    mainPagePlaylists: [] as Array<PlaylistDetails>,
    allPlaylists:{
        playlists: [] as Array<PlaylistDetails>,
        nextPageToken: null as string | null,
    },
    allVideos:{
        isLoading: false,
        otherDetails:{
            totalVideoCount: null as number|null,
            nextPageTokenChannelVideos:null as string | null,
        },
        channelVideos: [] as Array<PreviewVideo>,
    }
}
type InitialStateType = typeof initialState
type OtherDetails = typeof initialState.allVideos.otherDetails

export const currentChannelReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case 'YOUTUBE/SET_IS_LOADING_CURRENT_CHANNEL':
            return {
                ...state, isLoading: action.payload
            }
        case 'YOUTUBE/SET_CURRENT_CHANNEL_INFO':
            return {
                ...state,
                channelInfo: action.payload,
                multipleChannels: [],
                mainPagePlaylists: [],
                allPlaylists: {
                    nextPageToken: null,
                    playlists: []
                },
                allVideos: {...state.allVideos,
                    channelVideos:[] ,
                    otherDetails: {
                        nextPageTokenChannelVideos: null,
                        totalVideoCount: null
                    }
                }

            }
        case 'YOUTUBE/SET_MULTIPLE_CHANNELS':
            return {
                ...state, multipleChannels: state.multipleChannels.concat(action.payload),
            }
        case 'YOUTUBE/SET_MAIN_PAGE_PLAYLISTS':
            return {
                ...state, mainPagePlaylists: [...state.mainPagePlaylists, action.payload],
            }
        case 'YOUTUBE/SET_ALL_PLAYLISTS':
            return {
                ...state, allPlaylists:{
                    playlists: state.allPlaylists.playlists.concat(action.payload.playlists),
                    nextPageToken: action.payload.nextPageToken
                }
            }
        case 'YOUTUBE/SET_CHANNELS_VIDEOS':
            return {
                ...state,
                allVideos: {...state.allVideos,
                    channelVideos: state.allVideos.channelVideos.concat(action.payload.channelVideos),
                    otherDetails: action.payload.otherDetails,
                }
            }
            case 'YOUTUBE/SET_IS_LOADING_CHANNELS_VIDEOS':
            return {
                ...state,
                allVideos: {...state.allVideos,
                    isLoading: action.isLoading
                }
            }

        default:
            return state

    }
}
export type Actions = InferActionsTypes<typeof actionsCurrentChannel>
export type CurrentChannelThunkType = BaseThunkType<Actions>

export const actionsCurrentChannel = {
    setIsLoading: (isLoading: boolean) => ({
        type: 'YOUTUBE/SET_IS_LOADING_CURRENT_CHANNEL', payload: isLoading
    } as const),
    setChannelInfo: (channelInfo: CurrentChannelInfo) => ({
        type: 'YOUTUBE/SET_CURRENT_CHANNEL_INFO', payload: channelInfo
    } as const),
    setMultipleChannels: (multipleChannels: MultipleChannelsSections) => ({
        type: 'YOUTUBE/SET_MULTIPLE_CHANNELS', payload: multipleChannels
    } as const),
    setMainPagePlaylists: (mainPagePlaylists: PlaylistDetails) => ({
        type: 'YOUTUBE/SET_MAIN_PAGE_PLAYLISTS', payload: mainPagePlaylists
    } as const),
    setAllPlaylists: (playlists: Array<PlaylistDetails>,nextPageToken:string|null) => ({
        type: 'YOUTUBE/SET_ALL_PLAYLISTS', payload: {playlists,nextPageToken}
    } as const),
    setChannelVideos: (channelVideos: Array<PreviewVideo>,otherDetails:OtherDetails) => ({
        type: 'YOUTUBE/SET_CHANNELS_VIDEOS', payload: {channelVideos, otherDetails}
    } as const),
    setIsLoadingChannelVideos: (isLoading: boolean) => ({
        type: 'YOUTUBE/SET_IS_LOADING_CHANNELS_VIDEOS', isLoading
    } as const),
}


export const getMultipleChannels = (channelsId: Array<string>, title: string): CurrentChannelThunkType => async (dispatch) => {
    try {
        const channelsDetailsData = await YoutubeChannelsAPI.getChannelsById(channelsId)
        const channels = channelsDetailsData.items.map(m => {
            return {
                title: m.snippet.title,
                channelId: m.id,
                logo: m.snippet.thumbnails.high.url,
                subscribersCount: m.statistics.subscriberCount
            }
        })
        dispatch(actionsCurrentChannel.setMultipleChannels({title, channels}))
    } catch
        (error) {
        alert('error getMultipleChannels')
    }
}

export const getAllChannelPlaylists = (channelId: string, pageToken:string|null=null): CurrentChannelThunkType => async (dispatch) => {
    try {
        const playlistInfoData = await YoutubeAPIPlaylist.getPlaylistInfo(null, channelId,pageToken)
        const playlists = createPlaylists(playlistInfoData)
        const nextPageToken = playlistInfoData.nextPageToken || null
        dispatch(actionsCurrentChannel.setAllPlaylists(playlists,nextPageToken))

    } catch (error) {
        alert('error getAllChannelPlaylists')
    }
}


function createVideos(playlistVideosData: PlaylistResponse) {
    return playlistVideosData.items.map(v => {
            return {
                videoId: v.snippet.resourceId.videoId,
                preview: v.snippet.thumbnails.high.url,
                title: v.snippet.title,
            }
        }
    )
}

function createPlaylists(playlistInfoData: PlaylistInfoResponse, playlistVideosData: PlaylistResponse | null = null) {
    return playlistInfoData.items.map((p) => {
        return {
            playlistTitle: p.snippet.title,
            description: p.snippet.description,
            playlistPreview: p.snippet.thumbnails.high.url,
            totalVideoCount: p.contentDetails.itemCount,
            playlistId: p.id,
            resultsPerPage: playlistInfoData.pageInfo.resultsPerPage,
            videos: playlistVideosData ? createVideos(playlistVideosData) : null
        }
    })
}

export const getPlaylistWithVideos = (playlistId: string): CurrentChannelThunkType => async (dispatch) => {
    try {
        const playlistVideosData = await YoutubeAPIPlaylist.getPlaylistVideos(playlistId)
        const playlistInfoData = await YoutubeAPIPlaylist.getPlaylistInfo(playlistId,null,null)
        const playlistInfo = createPlaylists(playlistInfoData, playlistVideosData)
        dispatch(actionsCurrentChannel.setMainPagePlaylists(playlistInfo[0]))
    } catch (error) {
        //  alert('error getPlaylistWithVideos')
        console.log('error getPlaylistWithVideos')
    }
}


export const getChannelSections = (channelId: string): CurrentChannelThunkType => async (dispatch) => {
    try {
        const channelSectionsData = await YoutubeChannelsAPI.getChannelSections(channelId)
        channelSectionsData.items.forEach(e => {
            // noinspection SpellCheckingInspection
            switch (e.snippet.type) {
                case 'multiplechannels':
                    dispatch(getMultipleChannels(e.contentDetails.channels, e.snippet.title))
                    break
                case 'singleplaylist':
                    dispatch(getPlaylistWithVideos(e.contentDetails.playlists[0]))
                    break
            }

        })

    } catch (error) {
         alert('error Channel Sections')
    }

}


export const getCurrentChannelInfo = (channelId: string): CurrentChannelThunkType => async (dispatch) => {
    try {
        dispatch(actionsCurrentChannel.setIsLoading(true))
        const channelData = await YoutubeChannelsAPI.getFullInfoChannelById(channelId)
        const {snippet, statistics, brandingSettings, id} = channelData.items[0]
        const channelInfo = {
            id: id,
            image: snippet.thumbnails.high.url,
            title: snippet.title,
            description: snippet.description,
            countryISO: snippet.country,
            published: snippet.publishedAt,
            channelStatistics: {
                subscriberCount: statistics.subscriberCount,
                hiddenSubscriberCount: statistics.hiddenSubscriberCount,
                viewCount: statistics.viewCount,
                videoCount: statistics.videoCount
            }
        }
        dispatch(actionsCurrentChannel.setChannelInfo(channelInfo))
        await dispatch(getChannelSections(channelId))

    } catch (error) {
        alert('error')
        console.log(error)
    } finally {
        dispatch(actionsCurrentChannel.setIsLoading(false))
    }
}


export const getChannelAllVideos = (channelId: string, pageToken:string|null=null): CurrentChannelThunkType => async (dispatch) => {
    try {
        dispatch(actionsCurrentChannel.setIsLoadingChannelVideos(true))
        const data = await YoutubeAPIVideosList.getChannelVideos(channelId,pageToken)
        const videos = data.items.map(v=>{
            return {
                videoId:v.id.videoId,
                preview:v.snippet.thumbnails.high.url,
                title:v.snippet.title
            }
        })
        const otherDetails={
            totalVideoCount: data.pageInfo.totalResults,
            nextPageTokenChannelVideos: data.nextPageToken||null
        }
        dispatch(actionsCurrentChannel.setChannelVideos(videos,otherDetails))
    }
    catch (error){

    }
    finally {
        dispatch(actionsCurrentChannel.setIsLoadingChannelVideos(false))
    }
}











