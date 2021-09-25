import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {YoutubeAPI} from "../../api/Youtube_API";

type VideoDetails = {

    videoId: string,
    title: string
    channelTitle: string
    description: string
    publishTime: string
    channelId: string
}
let initialState = {
    errorCode:null as number|null,
    searchTerm:'',
    isLoading: false,
    totalResults: null as number | null,
    nextPageToken: null as string | null,
    prevPageToken: null as string | null,
    videosDetails: null as Array<VideoDetails> | null


}
export type InitialStateType = typeof initialState

export const videosReducer = (state = initialState, action: Actions): InitialStateType => {


    switch (action.type) {

        case 'YOUTUBE/SET_IS_LOADING':
            return {

                ...state, isLoading: action.isLoading
            }
            case 'YOUTUBE/ERROR':
            return {

                ...state, errorCode: action.errorCode
            }
        case 'YOUTUBE/TOTAL_RESULT':

            return {
                ...state,
                totalResults: action.totalResults,
                nextPageToken: action.nextPageToken,
                prevPageToken: action.prevPageToken,
            }

        case 'YOUTUBE/VIDEOS_DETAILS':

            debugger


            return {
                ...state,


                videosDetails: !state.videosDetails || state.searchTerm!==action.searchTerm ? action.videoDetails

                    : state.videosDetails.concat(action.videoDetails),



                searchTerm: action.searchTerm

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
        type: 'YOUTUBE/TOTAL_RESULT', totalResults, nextPageToken, prevPageToken
    } as const),

    setVideoDetails: (VideoDetails: Array<VideoDetails>, searchTerm:string) => ({
        type: 'YOUTUBE/VIDEOS_DETAILS', videoDetails: VideoDetails, searchTerm:searchTerm
    } as const),
    setError: (errorCode: number|null) => ({
        type: 'YOUTUBE/ERROR', errorCode: errorCode
    } as const),

}


export const setVideosBySearch = (searchTerm: string, prevPageToken: string | null, nextPageToken: string | null): ThunkType => async (dispatch) => {
    dispatch(actions.setIsLoading(true))
    let data = await YoutubeAPI.getVideosByTerm(searchTerm, prevPageToken, nextPageToken)
    if(data.error){
        dispatch(actions.setError(data.error.code))
        dispatch(actions.setIsLoading(false))
        return
    }

    let VideoDetails = data.items.map((v: any) => {
        return {
            videoId: v.id.videoId,
            title: v.snippet.title,
            channelTitle: v.snippet.channelTitle,
            description: v.snippet.description,
            publishTime: v.snippet.publishTime,
            channelId: v.snippet.channelId
        }
    })

    dispatch(actions.setError(null))
    dispatch(actions.setResponseDetails(data.pageInfo.totalResults, data.nextPageToken, data.prevPageToken))
    dispatch(actions.setVideoDetails(VideoDetails,searchTerm))
    dispatch(actions.setIsLoading(false))


}


export default videosReducer