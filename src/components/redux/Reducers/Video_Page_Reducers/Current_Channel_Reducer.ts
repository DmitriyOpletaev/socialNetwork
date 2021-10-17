import {BaseThunkType, InferActionsTypes} from "../../redux-store";
import {YoutubeAPI} from "../../../api/Youtube_API";
import {CurrentChannelInfo, ErrorType} from "../../../../types/Videos_Types";



let initialState = {
    isLoading: false,
    error: null as ErrorType | null,
    channelInfo: {} as CurrentChannelInfo



}
type InitialStateType = typeof initialState

export const currentChannelReducer = (state = initialState, action: Actions): InitialStateType => {

    switch (action.type) {
        case 'YOUTUBE/SET_IS_LOADING_CURRENT_CHANNEL':
            return {
                ...state, isLoading: action.payload
            }
            case 'YOUTUBE/SET_CURRENT_CHANNEL_INFO':
            return {
                ...state, channelInfo: {...action.payload,channelStatistics:action.payload.channelStatistics},
            }


        default:
            return state

    }
}

type Actions = InferActionsTypes<typeof actionsCurrentChannel>
type ThunkType = BaseThunkType<Actions>

export const actionsCurrentChannel = {
    setIsLoading: (isLoading: boolean) => ({
        type: 'YOUTUBE/SET_IS_LOADING_CURRENT_CHANNEL', payload: isLoading
    } as const),
    setChannelInfo: (channelInfo:CurrentChannelInfo) => ({
        type: 'YOUTUBE/SET_CURRENT_CHANNEL_INFO', payload: channelInfo
    } as const),


}






export const getCurrentChannelInfo = (channelId: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actionsCurrentChannel.setIsLoading(true))
        const channelData = await YoutubeAPI.getFullInfoChannelById(channelId)
        const {snippet,statistics,brandingSettings,status,id} = channelData.items[0]
        const channelInfo = {
            id:id,
            image:snippet.thumbnails.high.url,
            banner:brandingSettings.image.bannerExternalUrl,
            title:snippet.title,
            description:snippet.description,
            countryISO:snippet.country,
            published:snippet.publishedAt,
            channelStatistics:{
                subscriberCount:statistics.subscriberCount,
                hiddenSubscriberCount:statistics.hiddenSubscriberCount,
                viewCount:statistics.viewCount,
                videoCount: statistics.videoCount
            }
        }

        dispatch(actionsCurrentChannel.setChannelInfo(channelInfo))
    } catch (error) {

    }
    finally {
        dispatch(actionsCurrentChannel.setIsLoading(false))
    }
}








