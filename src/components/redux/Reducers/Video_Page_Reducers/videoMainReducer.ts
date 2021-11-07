import {AppStateType, BaseThunkType, InferActionsTypes} from "../../redux-store";
import {OrderChannelType} from "../../../api/Youtube_API/Videos_List";
import {YouTubeApiSubscriptions} from "../../../api/Youtube_API/Subscriptions";
import {YoutubeChannelsAPI} from "../../../api/Youtube_API/Channels";

type OpenedModalWindowType = null | 'channel' | 'video'
let initialState = {
    openedModalWindow: null as OpenedModalWindowType,
    loadingSubscribeId: null as null | string,
    subscriptionsChannels: [] as Array<SubscriptionChannel>,
    userChannel: null as UserChannel | null
}
export type SubscriptionChannel = {
    channelId: string
    subscriptionId: string
    title: string
    channelLogo: string
    newItemCount: number
}
type UserChannel ={
    title: string
    channelId: string
    channelLogo: string
}


export function getSubscriptionsChannels(state: AppStateType) {
    return state.videoMainReducer.subscriptionsChannels
}

export function getOpenedModalWindowSelector(state: AppStateType) {
    return state.videoMainReducer.openedModalWindow
}

export function getIsLoadingSubscribe(state: AppStateType) {
    return state.videoMainReducer.loadingSubscribeId
}

type InitialStateType = typeof initialState
export const videoMainReducer = (state = initialState, action: Actions): InitialStateType => {


    switch (action.type) {
        case 'VIDEO_PAGE/SET_OPENED_MODAL_WINDOW':
            return {
                ...state, openedModalWindow: action.payload
            }
        case 'YOUTUBE/SET_SUBSCRIPTIONS_CHANNELS':
            return {
                ...state, subscriptionsChannels: action.payload ? state.subscriptionsChannels.concat(action.payload):[]
            }
        case 'YOUTUBE/DELETE_SUBSCRIPTIONS_CHANNELS':
            return {
                ...state,
                subscriptionsChannels: action.payload === 'all' ?
                    [] : state.subscriptionsChannels.filter(s => s.subscriptionId !== action.payload)
            }
        case 'YOUTUBE/SET_IS_LOADING_SUBSCRIBE':
            return {
                ...state,
                loadingSubscribeId: action.payload
            }
        case 'YOUTUBE/SET_USER_CHANNEL':
            return {
                ...state,
                userChannel: action.userChannel
            }

        default:
            return state
    }
}

type Actions = InferActionsTypes<typeof actionsMainVideoReducer>
type ThunkType = BaseThunkType<Actions>

export const actionsMainVideoReducer = {
    setOpenedModalWindow: (openedModalWindow: OpenedModalWindowType) => ({
        type: 'VIDEO_PAGE/SET_OPENED_MODAL_WINDOW', payload: openedModalWindow
    } as const),
    setSubscriptionChannels: (subscriptionsChannels: Array<SubscriptionChannel>|null) => ({
        type: 'YOUTUBE/SET_SUBSCRIPTIONS_CHANNELS', payload: subscriptionsChannels
    } as const),
    deleteSubscriptionChannel: (subscriptionId: string|'all') => ({
        type: 'YOUTUBE/DELETE_SUBSCRIPTIONS_CHANNELS', payload: subscriptionId
    } as const),
    setIsLoadingSubscribe: (loadingSubscribeId: null | string) => ({
        type: 'YOUTUBE/SET_IS_LOADING_SUBSCRIBE', payload: loadingSubscribeId
    } as const),
    setUserChannel: (userChannel: null | UserChannel) => ({
        type: 'YOUTUBE/SET_USER_CHANNEL', userChannel
    } as const),
}

export const getUserChannel = (access_token: string): ThunkType => async (dispatch) => {
    try {
        const {items} = await YoutubeChannelsAPI.getUserYoutubeChannel(access_token)
        const {id,snippet} = items[0]
        const {title,thumbnails,}=snippet
        const channelDetails = {
            channelId: id,
            title: title,
            channelLogo: thumbnails.default.url,
        }
        dispatch(actionsMainVideoReducer.setUserChannel(channelDetails))

    } catch (error) {

    }
}


//------Подписаться на канал
export const subscribeChannel = (channelId: string, access_token: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actionsMainVideoReducer.setIsLoadingSubscribe(channelId))
        const data = await YouTubeApiSubscriptions.subscribeChannel(channelId, access_token)
        const {snippet, id, contentDetails} = data
        dispatch(actionsMainVideoReducer.setSubscriptionChannels([{
            channelId: snippet.resourceId.channelId,
            subscriptionId: id,
            title: snippet.title,
            channelLogo: snippet.thumbnails.default.url,
            newItemCount: contentDetails.newItemCount
        }]))
    } catch (error) {
        alert('error setSubscription')
    } finally {
        dispatch(actionsMainVideoReducer.setIsLoadingSubscribe(null))
    }
}
//----Отписаться от канала
export const unSubscribeChannel = (subscriptionChannel: SubscriptionChannel, access_token: string): ThunkType => async (dispatch) => {
    const {subscriptionId, channelId} = subscriptionChannel
    try {
        dispatch(actionsMainVideoReducer.setIsLoadingSubscribe(channelId))
        const status = await YouTubeApiSubscriptions.unSubscribeChannel(subscriptionId, access_token)
        if (status === 204) dispatch(actionsMainVideoReducer.deleteSubscriptionChannel(subscriptionId))
    } catch (err) {
        alert('not delete subscription')
    } finally {
        dispatch(actionsMainVideoReducer.setIsLoadingSubscribe(null))
    }
}


//---Все каналы на которые подписан пользователь
export const getSubscribesChannels = (access_token: string,
                                      order: OrderChannelType = null,
                                      pageToken: string | null = null
): ThunkType => async (dispatch) => {

    try {

        const {items,nextPageToken} = await YouTubeApiSubscriptions.getSubscriptionsList(access_token, pageToken, order)
        const channels = items.map(c => {
            const {snippet, id, contentDetails} = c
            return {
                channelId: snippet.resourceId.channelId,
                subscriptionId: id,
                title: snippet.title,
                channelLogo: snippet.thumbnails.default.url,
                newItemCount: contentDetails.newItemCount
            }
        })
        dispatch(actionsMainVideoReducer.setSubscriptionChannels(channels))
        if(nextPageToken){
           await dispatch(getSubscribesChannels(access_token,order,nextPageToken))
        }
    } catch (error) {

    } finally {

    }
}

//--- Проверить подписан ли пользователь на канал (для кнопки 'подписаться' при её начальной загрузки)
export const isUserSubscribe = (access_token: string, channelId: string): ThunkType => async (dispatch) => {
    try {
        const data = await YouTubeApiSubscriptions.getSubscriptionsList(access_token, null, null, channelId)
        if (data.items.length === 0) return
        else {
            const {snippet, id, contentDetails} = data.items[0]
            const channel = {
                channelId: snippet.resourceId.channelId,
                subscriptionId: id,
                title: snippet.title,
                channelLogo: snippet.thumbnails.default.url,
                newItemCount: contentDetails.newItemCount
            }
            dispatch(actionsMainVideoReducer.setSubscriptionChannels([channel]))
        }
    } catch (error) {
        alert('error isUserSubscribe')
    }
}

export default videoMainReducer