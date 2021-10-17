import {BaseThunkType, InferActionsTypes} from "../../redux-store";
import {YoutubeAPI} from "../../../api/Youtube_API";
import {ErrorType, VideoDetails} from "../../../../types/Videos_Types";
import {VideosListBySearchItems, VideosListItems} from "../../../../types/Types_Youtube_API/Videos_Types";


let initialState = {
    searchError: null as ErrorType | null,
    searchTerm: '',
    isLoading: false,
    totalResults: null as number | null,
    nextPageTokenSearch: null as string | null,
    prevPageTokenSearch: null as string | null,
    videosDetails: [] as Array<VideoDetails>,
    category:null as 'trends'|'search'|null
}
export type InitialStateType = typeof initialState

export const videosSearchReducer = (state = initialState, action: Actions): InitialStateType => {


    switch (action.type) {
        case 'YOUTUBE/SET_IS_LOADING':
            return {

                ...state, isLoading: action.isLoading
            }
        case 'YOUTUBE/ERROR':
            return {
                ...state, searchError: action.error
            }
        case 'YOUTUBE/TOTAL_RESULT':
            return {
                ...state,
                totalResults: action.totalResults,
                nextPageTokenSearch: action.nextPageToken,
                prevPageTokenSearch: action.prevPageToken,
            }
        case 'YOUTUBE/SET_SEARCH_VIDEOS_DETAILS':
            return {
                ...state,
                videosDetails: !state.videosDetails || state.searchTerm !== action.searchTerm ? action.videoDetails
                    : state.videosDetails.concat(action.videoDetails),
                searchTerm: action.searchTerm,
                category: 'search'
            }
            case 'YOUTUBE/SET_CATEGORY_VIDEOS_DETAILS':
            return {
                ...state,
                videosDetails: state.category !== action.category ? action.videoDetails
                    : state.videosDetails.concat(action.videoDetails),
                category: action.category
            }
        default:
            return state
    }
}

type Actions = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<Actions>


export const actions = {

    setIsLoading: (isLoading: boolean) => ({type: 'YOUTUBE/SET_IS_LOADING', isLoading} as const),
    setResponseDetails: (totalResults: number | null, nextPageToken: string | null, prevPageToken: string | null) => ({
        type: 'YOUTUBE/TOTAL_RESULT', totalResults, nextPageToken: nextPageToken, prevPageToken: prevPageToken
    } as const),

    setSearchVideoDetails: (VideoDetails: Array<VideoDetails>, searchTerm: string) => ({
        type: 'YOUTUBE/SET_SEARCH_VIDEOS_DETAILS', videoDetails: VideoDetails, searchTerm: searchTerm
    } as const),
    setCategoryVideoDetails: (VideoDetails: Array<VideoDetails>, category:'trends') => ({
        type: 'YOUTUBE/SET_CATEGORY_VIDEOS_DETAILS', videoDetails: VideoDetails, category: category
    } as const),
    setError: (error:ErrorType|null) => ({
        type: 'YOUTUBE/ERROR', error: error
    } as const),

}


export const getVideosBySearch = (searchTerm: string, prevPageToken: string | null=null, nextPageToken: string | null=null): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsLoading(true))
        const dataSearch = await YoutubeAPI.getVideosByTerm(searchTerm, prevPageToken||nextPageToken)
        const videosId = dataSearch.items.map((v:VideosListBySearchItems)=>{
            return v.id.videoId
        })
        const dataVideosDetails = await YoutubeAPI.getVideosById(videosId)
        const videoDetails = dataVideosDetails.items.map((v:VideosListItems ) => {
            return {
                videoId: v.id,
                title: v.snippet.title,
                channelTitle: v.snippet.channelTitle,
                description: v.snippet.description,
                publishTime: v.snippet.publishedAt,
                channelId: v.snippet.channelId,
                videoPreviewImg: v.snippet.thumbnails.high.url,
                totalViews: v.statistics.viewCount,
                videoDuration: v.contentDetails.duration
            }
        })
        dispatch(actions.setError(null))
        dispatch(actions.setResponseDetails(dataSearch.pageInfo.totalResults, dataSearch.nextPageToken || null, dataSearch.prevPageToken || null))
        dispatch(actions.setSearchVideoDetails(videoDetails, searchTerm))
    } catch (error:any){
        let code = error.response.data.error.code
        let message = error.response.data.error.message
        dispatch(actions.setError({code,message}))
    }
    finally {
        dispatch(actions.setIsLoading(false))
    }
}


export const getMostPopularVideos = (nextPageToken = null as string | null): ThunkType => async (dispatch) => {
    try{
        dispatch(actions.setIsLoading(true))
        const data = await YoutubeAPI.getMostPopularVideos(nextPageToken)
        const VideoDetails = data.items.map((v: VideosListItems) => {
            return {
                videoId: v.id,
                title: v.snippet.title,
                channelTitle: v.snippet.channelTitle,
                description: v.snippet.description,
                publishTime: v.snippet.publishedAt,
                channelId: v.snippet.channelId,
                videoPreviewImg: v.snippet.thumbnails.high.url,
                totalViews: v.statistics.viewCount,
                videoDuration: v.contentDetails.duration
            }
        })
        dispatch(actions.setError(null))
        dispatch(actions.setResponseDetails(data.pageInfo.totalResults, data.nextPageToken || null, data.prevPageToken || null))
        dispatch(actions.setCategoryVideoDetails(VideoDetails, 'trends'))
    }
    catch (error:any){
        let code = error.response.data.error.code
        let message = error.response.data.error.message
        dispatch(actions.setError({code,message}))
    }
    finally {
        dispatch(actions.setIsLoading(false))
    }
}


export default videosSearchReducer