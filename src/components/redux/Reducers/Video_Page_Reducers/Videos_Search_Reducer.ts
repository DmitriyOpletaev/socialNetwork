import {BaseThunkType, InferActionsTypes} from "../../redux-store";
import {OrderVideoSearch, SearchType, YoutubeAPIVideosList} from "../../../api/Youtube_API/Videos_List";
import {ErrorType} from "../../../../types/Videos_Types";
import {
    CategoryId,
    VideosListItems,
} from "../../../api/Youtube_API/Types_Youtube_API/Videos_Types"
import {YoutubeChannelsAPI} from "../../../api/Youtube_API/Channels"
import {
    ChannelItems,
    ChannelSnippet,
    ChannelStatistics
} from "../../../api/Youtube_API/Types_Youtube_API/Channels_Types";
import {YoutubeAPIPlaylist} from "../../../api/Youtube_API/Playlists";
import {PlaylistInfoItems} from "../../../api/Youtube_API/Types_Youtube_API/Playlist_Types";

let initialState = {
    isLoading: false,
    searchResult:{
        videos: null as Array<Video> | null,
        channels: null as Array<Channel>|null,
        playlists: null as Array<Playlist>|null,
    },
    searchDetails: {
        categoryId: null as CategoryId<'search'>|null,
        totalResults: 0,
        nextPageToken: null as string | null,
    },
    error: null as ErrorType | null,
    //---only for search by searchTerm
    searchByTermDetails: {
        searchTerm: '',
        order: 'relevance' as OrderVideoSearch,
        type: 'all' as SearchType
    },

}
export const videosSearchReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case 'YOUTUBE/SET_IS_LOADING':
            return {

                ...state, isLoading: action.isLoading
            }
        case 'YOUTUBE/ERROR':
            return {
                ...state, error: action.error
            }
        case 'YOUTUBE/SET_SEARCH_RESULT':
            const {videos,playlists,channels, searchDetails, searchByTermDetails} = action
            const {searchTerm, type, order} = searchByTermDetails
            if (searchTerm === state.searchByTermDetails.searchTerm &&
                type === state.searchByTermDetails.type &&
                order === state.searchByTermDetails.order) {
                return {
                    ...state,
                    searchResult: {
                        videos:
                            videos && state.searchResult.videos ?
                                state.searchResult.videos.concat(videos) : videos,
                        playlists:
                            playlists && state.searchResult.playlists ?
                                state.searchResult.playlists.concat(playlists) : playlists,
                        channels:
                            channels && state.searchResult.channels ?
                                state.searchResult.channels.concat(channels) : channels,
                    },
                    searchDetails, searchByTermDetails
                }
            } else {
                return {
                    ...state,
                    searchResult: {
                        videos: action.videos,
                        channels: action.channels,
                        playlists: action.playlists
                    },
                    searchDetails, searchByTermDetails
                }
            }
        case "YOUTUBE/SET_CATEGORY_VIDEOS":
            return {
                ...state,
                searchResult: {
                    videos:
                        action.searchDetails.categoryId !== state.searchDetails.categoryId || !state.searchResult.videos ?
                            action.videos : state.searchResult.videos.concat(action.videos),
                    playlists: null,
                    channels: null

                },
                searchDetails: action.searchDetails
            }
        default:
            return state
    }
}
export const actionsVideosList = {
    setIsLoading: (isLoading: boolean) => ({
        type: 'YOUTUBE/SET_IS_LOADING',
        isLoading
    } as const),
    setSearchResult: (
        searchDetails: typeof initialState.searchDetails,
        searchByTermDetails: typeof initialState.searchByTermDetails,
        videos: Array<Video> | null = null,
        channels: Array<Channel> | null = null,
        playlists: Array<Playlist> | null = null
    ) => ({
        type: 'YOUTUBE/SET_SEARCH_RESULT',
        videos, channels, playlists, searchDetails, searchByTermDetails
    } as const),
    setCategoryVideos: (
        searchDetails: typeof initialState.searchDetails,
        videos: Array<Video>,
    ) => ({
        type: 'YOUTUBE/SET_CATEGORY_VIDEOS',
        videos, searchDetails
    } as const),
    setError: (error: ErrorType | null) => ({
        type: 'YOUTUBE/ERROR',
        error
    } as const),
}

function createVideos(videosListItems: Array<VideosListItems>) {
    return videosListItems.map(({id, snippet, statistics, contentDetails}) => {
        const {title, channelTitle, description, publishedAt, channelId, thumbnails} = snippet
        return {
            videoId: id,
            title, channelTitle, description, channelId,
            publishTime: publishedAt,
            previewImg: thumbnails.high.url,
            totalViews: statistics.viewCount,
            duration: contentDetails.duration
        }
    })
}

function createChannels(channelsItems: ChannelItems<ChannelSnippet, ChannelStatistics, null, null>[]) {
    return channelsItems.map(({id, snippet, statistics}) => {
        const {title, thumbnails} = snippet
        const {hiddenSubscriberCount, subscriberCount} = statistics
        return {
            channelId: id, logo: thumbnails.high.url,
            title, hiddenSubscriberCount, subscriberCount
        }
    })
}

function createPlaylist(playlistItems: PlaylistInfoItems[]) {
    return playlistItems.map(({id, snippet, contentDetails}) => {
        const {title, thumbnails, channelTitle, channelId, publishedAt} = snippet
        return {
            playlistId: id,
            preview: thumbnails.high.url,
            videoCount: contentDetails.itemCount,
            title,publishedAt, channelId, channelTitle
        }
    })
}


export const searchUserVideos = (
    accessToken: string,
    pageToken: string | null = null,
): ThunkType => async (dispatch) => {
    try{
        const searchData = await YoutubeAPIVideosList.searchUserVideos(accessToken,pageToken)
        const videosId = searchData.items.map(item=>(item.id.videoId))
        const {items,nextPageToken,pageInfo} = await YoutubeAPIVideosList.getVideosById(videosId)
        const videos = createVideos(items)
        const searchDetails = {
            categoryId: 'userVideos' as CategoryId,
            totalResults: pageInfo.totalResults,
            nextPageToken: nextPageToken || null,
        }
        dispatch(actionsVideosList.setCategoryVideos(searchDetails,videos))
    }
    catch (error){
        alert('error searchUserVideos')
    }
}

export const getVideosBySearch = (
    searchTerm: string,
    pageToken: string | null = null,
    order: OrderVideoSearch,
    type: SearchType
): ThunkType => async (dispatch) => {
    try {
        dispatch(actionsVideosList.setIsLoading(true))
        const {
            items, nextPageToken, pageInfo
        } = await YoutubeAPIVideosList.searchYoutube(searchTerm, pageToken, order, type)
        const videosId = items.map(item => item.id.videoId).filter((id): id is string => id !== undefined)
        const channelsId = items.map(item => item.id.channelId).filter((id): id is string => id !== undefined)
        const playlistsId = items.map(item => item.id.playlistId).filter((id): id is string => id !== undefined)

        const dataVideos = videosId.length > 0 && await YoutubeAPIVideosList.getVideosById(videosId)
        const videos = dataVideos ? createVideos(dataVideos.items) : null
        const dataChannels = channelsId.length > 0 && await YoutubeChannelsAPI.getChannelsById(channelsId)
        const channels = dataChannels ? createChannels(dataChannels.items) : null
        const dataPlaylists = playlistsId.length > 0 && await YoutubeAPIPlaylist.getPlaylistInfo(playlistsId)
        const playlists = dataPlaylists ? createPlaylist(dataPlaylists.items) : null
        const searchDetails = {
            categoryId: 'search' as CategoryId,
            totalResults: pageInfo.totalResults,
            nextPageToken: nextPageToken || null,
        }
        const searchByTermDetails = {
            searchTerm: searchTerm,
            order: order,
            type: type
        }

        dispatch(actionsVideosList.setSearchResult(searchDetails, searchByTermDetails, videos, channels, playlists))
        dispatch(actionsVideosList.setError(null))
    } catch (error) {
        alert('error')
    } finally {
        dispatch(actionsVideosList.setIsLoading(false))
    }
}
export const getUsersVideos = (
    categoryId: 'likesVideos' | 'dislikesVideos',
    accessToken: string,
    pageToken: string | null = null,
): ThunkType => async (dispatch) => {
    try {
        dispatch(actionsVideosList.setIsLoading(true))
        const {items, nextPageToken, pageInfo} = await YoutubeAPIVideosList.getUserLikedVideos(
                    accessToken,
                    pageToken,
                    categoryId === 'likesVideos' ? 'like' : 'dislike'
                )

        const searchDetails = {
            categoryId: categoryId as CategoryId,
            totalResults: pageInfo.totalResults,
            nextPageToken: nextPageToken || null,
        }
        const videos = createVideos(items)
        dispatch(actionsVideosList.setCategoryVideos(searchDetails, videos))
    } catch (error) {

    }

}
export const getVideosByCategory = (
    categoryId: 'trends' | '1' | '10' | '17' | '20' | '23' | '25',
    pageToken: string | null = null,
): ThunkType => async (dispatch) => {
    try {
        dispatch(actionsVideosList.setIsLoading(true))
        const {items, nextPageToken, pageInfo} =
            categoryId === 'trends' ?
                await YoutubeAPIVideosList.getVideosByCategory(pageToken, null)
                :
                await YoutubeAPIVideosList.getVideosByCategory(pageToken, categoryId)

        const searchDetails = {
            categoryId: categoryId,
            totalResults: pageInfo.totalResults,
            nextPageToken: nextPageToken || null,
        }
        const videos = createVideos(items)
        dispatch(actionsVideosList.setCategoryVideos(searchDetails, videos))

    } catch (error) {

    } finally {
        dispatch(actionsVideosList.setIsLoading(false))
    }
}
export default videosSearchReducer

export type InitialStateType = typeof initialState
type Actions = InferActionsTypes<typeof actionsVideosList>
type ThunkType = BaseThunkType<Actions>


export type Video = {
    videoId: string
    title: string
    channelTitle: string
    publishTime: string
    channelId: string
    previewImg: string
    totalViews: string
    duration: string
}
export type Channel = {
    channelId: string
    title: string
    hiddenSubscriberCount: boolean
    subscriberCount: string
    logo: string
}
export type Playlist = {
    playlistId: string,
    title: string,
    preview: string,
    videoCount: number,
    publishedAt: string,
    channelId: string,
    channelTitle: string
}






