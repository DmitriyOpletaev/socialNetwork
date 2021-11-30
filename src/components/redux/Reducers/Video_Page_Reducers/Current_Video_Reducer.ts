import {BaseThunkType, InferActionsTypes} from "../../redux-store"
import {YoutubeAPIVideosList} from "../../../api/Youtube_API/Videos_List"
import {
    CommentAnswerType,
    CommentType,
    CurrentVideoChannelDetails, CurrentVideoDetails, ErrorType, PreviewVideo,
    VideoStatistics
} from "../../../../types/Videos_Types"
import {
    VideosListByCategoryResponse,
    VideosListResponse
} from "../../../api/Youtube_API/Types_Youtube_API/Videos_Types"
import {
    Channels_Types,
    ChannelSnippet,
    ChannelStatistics
} from "../../../api/Youtube_API/Types_Youtube_API/Channels_Types"
import {UserVideoRating} from "../../../api/Youtube_API/Types_Youtube_API/Auth_Requests_Types"
import {YoutubeChannelsAPI} from "../../../api/Youtube_API/Channels"
import {YoutubeAPIComments} from "../../../api/Youtube_API/Commenst"
import {YoutubeAPIVideoInteraction} from "../../../api/Youtube_API/Video_Interaction"
import {createComments, setNewAnswersInComment} from "./VideoReducers_ObjectHelpers"


let initialState = {
    isLoading: false,
    error: null as ErrorType | null,
    currentVideo: {} as CurrentVideoDetails,
    userRating: 'none' as UserVideoRating,
    channelDetails: {} as CurrentVideoChannelDetails,
    currentVideoStatistics: {} as VideoStatistics,
    relatedVideoDetails: [] as Array<PreviewVideo>,
    commentsDetails: {
        commentsStatus: null as string | null,
        comments: [] as Array<CommentType>,
        nextPageCommentsToken: null as string | null,
    },
    videoAbuse: {
        videoAbuseReasons: null as null | Array<VideoAbuseReportReason>,
        status: null as Status,
        error: null as string | null
    }
}
type Status = null | 'loading' | 'completed' | 'loadingReasonsList' | 'errorLoadingList' | 'errorAbuseVideo'
export type VideoAbuseReportReason = {
    id: string
    label: string
    secondaryReasons: Array<{
        id: string
        label: string
    }> | null
}
type InitialStateType = typeof initialState

const currentVideoReducer = (state = initialState, action: Actions): InitialStateType => {

    switch (action.type) {
        case 'YOUTUBE/SET_IS_LOADING_CURRENT_VIDEO':
            return {
                ...state, isLoading: action.payload.isLoading
            }
        case 'YOUTUBE/SET_IS_ERROR_CURRENT_VIDEO':
            return {
                ...state, error: action.payload.error
            }
        case 'YOUTUBE/SET_NEW_CURRENT_VIDEO':
            return {
                ...state, currentVideo: action.payload.currentVideo,
            }
        case 'YOUTUBE/SET_CURRENT_VIDEO_STATISTICS':
            return {
                ...state, currentVideoStatistics: action.payload.statistics
            }
        case 'YOUTUBE/SET_RELATED_VIDEOS':
            return {
                ...state,
                relatedVideoDetails: action.payload.videoDetails
            }
        case 'YOUTUBE/SET_COMMENTS':
                return {
                    ...state,
                    commentsDetails: {
                        commentsStatus: null,
                        nextPageCommentsToken: action.payload.nextPageToken,
                        comments: action.payload.isNewVideo ?
                            action.payload.comments
                            :
                            state.commentsDetails.comments.concat(action.payload.comments)
                    }
                }
        case 'YOUTUBE/SET_COMMENTS_STATUS':
            if (action.payload.status === 'commentsDisabled') {
                return {
                    ...state,
                    commentsDetails: {
                        commentsStatus: action.payload.status,
                        comments: [],
                        nextPageCommentsToken: null
                    }
                }
            } else {
                return {
                    ...state,
                    commentsDetails: {
                        commentsStatus: action.payload.status,
                        nextPageCommentsToken: state.commentsDetails.nextPageCommentsToken,
                        comments: state.commentsDetails.comments
                    },

                }
            }
        case 'YOUTUBE/SET_ANSWERS':
            return {
                ...state,
                commentsDetails: {...state.commentsDetails,
                    comments: setNewAnswersInComment(
                        state.commentsDetails.comments,action.answers,action.parentId,action.pageToken
                    )
                }
            }
        case
        'YOUTUBE/SET_CHANNEL_DETAILS' :
            return {
                ...state,
                channelDetails: action.payload.channelDetails
            }
        case
        'YOUTUBE/SET_USER_RATING' :
            return {
                ...state,
                userRating: action.payload
            }
        case
        'YOUTUBE/SET_VIDEO_ABUSE_STATUS' :
            return {
                ...state,
                videoAbuse: {
                    ...state.videoAbuse,
                    status: action.payload
                }
            }
        case
        'YOUTUBE/SET_VIDEO_ABUSE_REPORT_REASONS' :
            return {
                ...state,
                videoAbuse: {
                    ...state.videoAbuse,
                    videoAbuseReasons: action.payload
                }
            }

        default:
            return state
    }
}

type Actions = InferActionsTypes<typeof actionsCurrentVideo>
type ThunkType = BaseThunkType<Actions>

export const actionsCurrentVideo = {
    setIsLoading: (isLoading: boolean) => ({
        type: 'YOUTUBE/SET_IS_LOADING_CURRENT_VIDEO', payload: {isLoading}
    } as const),
    setError: (error: ErrorType) => ({
        type: 'YOUTUBE/SET_IS_ERROR_CURRENT_VIDEO', payload: {error}
    } as const),
    setIsLoadingAnswers: (loadingAnswers: null | string) => ({
        type: 'YOUTUBE/SET_IS_LOADING_CURRENT_VIDEO_ANSWERS', loadingAnswers: loadingAnswers
    } as const),
    setCurrentVideo: (currentVideo: CurrentVideoDetails) => ({
        type: 'YOUTUBE/SET_NEW_CURRENT_VIDEO', payload: {currentVideo}
    } as const),
    setStatistics: (statistics: VideoStatistics) => ({
        type: 'YOUTUBE/SET_CURRENT_VIDEO_STATISTICS', payload: {statistics}
    } as const),
    setChannelDetails: (channelDetails: CurrentVideoChannelDetails) => ({
        type: 'YOUTUBE/SET_CHANNEL_DETAILS', payload: {channelDetails}
    } as const),
    setUserRating: (userRating: UserVideoRating) => ({
        type: 'YOUTUBE/SET_USER_RATING', payload: userRating
    } as const),
    setRelatedVideos: (videoDetails: Array<PreviewVideo>) => ({
        type: 'YOUTUBE/SET_RELATED_VIDEOS', payload: {videoDetails}
    } as const),
    setComments: (comments: Array<CommentType>, isNewVideo: boolean, nextPageToken: string | null) => ({
        type: 'YOUTUBE/SET_COMMENTS', payload: {comments, isNewVideo, nextPageToken}
    } as const),
    setAnswers: (answers: Array<CommentAnswerType>, parentId: string, pageToken?: string | null) => ({
        type: 'YOUTUBE/SET_ANSWERS', answers,parentId, pageToken
    } as const),
    setCommentsStatus: (status: null | string) => ({
        type: 'YOUTUBE/SET_COMMENTS_STATUS', payload: {status}
    } as const),
    setAbuseListReasons: (videoAbuseReportReason: Array<VideoAbuseReportReason>) => ({
        type: 'YOUTUBE/SET_VIDEO_ABUSE_REPORT_REASONS', payload: videoAbuseReportReason
    } as const),
    setAbuseStatus: (abuseStatus: Status) => ({
        type: 'YOUTUBE/SET_VIDEO_ABUSE_STATUS', payload: abuseStatus
    } as const),

}
type OrderType = 'relevance' | 'time'
export const getVideoComments = (
    videoId: string, pageToken = null as string | null, order: OrderType = 'relevance'
): ThunkType => async (
    dispatch) => {
    try {
        dispatch(actionsCurrentVideo.setCommentsStatus('loading'))
        const {items,nextPageToken} = await YoutubeAPIComments.getVideoComments(videoId, pageToken, order)
        const comments = createComments(items)
        const isNewVideo = !pageToken
        dispatch(actionsCurrentVideo.setComments(comments, isNewVideo, nextPageToken||null))
    } catch (error) {
        alert('ErrorNotification Comments')
    } finally {
        dispatch(actionsCurrentVideo.setCommentsStatus(null))
    }

}

export const insertComment=(videoId:string,channelId:string,text:string,accessToken:string):ThunkType=> async (dispatch)=>{
   try{
       dispatch(actionsCurrentVideo.setCommentsStatus('loadingInsertComment'))
       const item= await YoutubeAPIComments.insertComment(videoId,channelId,text,accessToken)
       const comment = createComments([item])
       dispatch(actionsCurrentVideo.setComments(comment,false, null))
   }
   catch (error){
       alert('error InsertComment')
   }
   finally {
       dispatch(actionsCurrentVideo.setCommentsStatus('commentInsert'))
   }
}
export const insertAnswer=(parentId:string,text:string,accessToken:string):ThunkType=> async (dispatch)=>{
    try{
        dispatch(actionsCurrentVideo.setCommentsStatus('loadingInsertAnswer'))
        const {snippet,id}= await YoutubeAPIComments.insertAnswer(parentId,text,accessToken)
        const {authorChannelId,authorDisplayName,authorProfileImageUrl,likeCount,publishedAt,textDisplay}=snippet
        const answer = [{commentId: id,
            authorChannelId: authorChannelId.value,
            authorDisplayName, authorProfileImageUrl, likeCount, publishedAt,
            text: textDisplay}]
        dispatch(actionsCurrentVideo.setAnswers(answer,parentId))
    }
    catch (error){
        alert('error InsertAnswer')
    }
    finally {
        dispatch(actionsCurrentVideo.setCommentsStatus('answerInsert'))
    }
}
export const markCommentAsSpam=(commentId:string,accessToken:string):ThunkType=>async (dispatch)=>{
    dispatch(actionsCurrentVideo.setCommentsStatus('loadingAbuseComment'))
    const status = await YoutubeAPIComments.markAsSpam(commentId,accessToken)
    if(status === 204){
        dispatch(actionsCurrentVideo.setCommentsStatus('abuseCommentCompleted'))
    }
    else{
        dispatch(actionsCurrentVideo.setCommentsStatus('abuseCommentError'))
    }

}



export const getCommentAnswers = (commentId: string, nextPageAnswersToken = null as string | null): ThunkType => async (dispatch) => {
    try {
        dispatch(actionsCurrentVideo.setIsLoadingAnswers(commentId))
        const {items,nextPageToken} = await YoutubeAPIComments.getCommentAnswers(commentId, nextPageAnswersToken)
        const answers:Array<CommentAnswerType> = items.map(({id,snippet}) => {
            const {authorChannelId, authorDisplayName, authorProfileImageUrl, textDisplay, likeCount, publishedAt} = snippet
            return {
                commentId: id,
                authorChannelId: authorChannelId.value,
                authorDisplayName, authorProfileImageUrl, likeCount, publishedAt,
                text: textDisplay,
            }
        })
        dispatch(actionsCurrentVideo.setAnswers(answers,commentId,nextPageToken||null))
    } catch (error) {
        alert('error Load Answers')
    } finally {
        dispatch(actionsCurrentVideo.setIsLoadingAnswers(null))
    }
}


const getCurrentVideoChannel = (channelId: string): ThunkType => async (dispatch) => {
    try {
        const dataChannel: Channels_Types<ChannelSnippet, ChannelStatistics> = await YoutubeChannelsAPI.getChannelsById(channelId)
        const {snippet, statistics, id} = dataChannel.items[0]
        const channelDetails = {
            channelId: id,
            title: snippet.title,
            channelDescription: snippet.description,
            imgUrl: snippet.thumbnails.default.url,
            subscribersCount: statistics.subscriberCount,
        }
        dispatch(actionsCurrentVideo.setChannelDetails(channelDetails))
    } catch (error) {
    }
}

/*const getRelatedVideosByVideoId = (id: string): ThunkType => async (dispatch) => {
    try {
        const dataRelatedVideos: RelatedVideosListResponse = await YoutubeAPI.getRelatedVideos(id)
        const relatedVideoDetails: Array<RelatedVideosType> = dataRelatedVideos.items.filter((v) => !!v.snippet).map((v) => {
            return {
                videoId: v.id.videoId,
                title: v.snippet.title,
                channelTitle: v.snippet.channelTitle,
                channelId: v.snippet.channelId,
                videoPreviewImg: v.snippet.thumbnails.medium.url,
            }
        })
        dispatch(actionsCurrentVideo.setRelatedVideos(relatedVideoDetails))
    } catch (error) {

    }
}*/

const getRelatedVideosByCategoryId = (categoryId: string): ThunkType => async (dispatch) => {
    try {
        const dataRelatedVideos: VideosListByCategoryResponse = await YoutubeAPIVideosList.getVideosByCategory___RelatedVideos(categoryId)
        const relatedVideoDetails = dataRelatedVideos.items.filter((v) => !!v.snippet).map((v) => {
            return {
                videoId: v.id,
                title: v.snippet.title,
                preview: v.snippet.thumbnails.medium.url,
            }
        })
        dispatch(actionsCurrentVideo.setRelatedVideos(relatedVideoDetails))
    } catch (error) {

    }
}


//---------Полная информация о видео (при открытии видео для просмотра)
export const setCurrentVideo = (videoId: string, access_token: string | null = null): ThunkType => async (
    dispatch) => {
    try {
        dispatch(actionsCurrentVideo.setIsLoading(true))

        //-----Общие детали выбранного видео
        const dataCurrentVideo: VideosListResponse = await YoutubeAPIVideosList.getVideosById(videoId)
        const {snippet, statistics, status, id} = dataCurrentVideo.items[0]
        const {title, description, publishedAt, tags} = snippet
        const currentVideo = {videoId: id, title, description, publishedAt, tags}
        dispatch(actionsCurrentVideo.setCurrentVideo(currentVideo))

        //----Статистика выбранного видео
        const {dislikeCount, favoriteCount, likeCount, viewCount, commentCount} = statistics
        const statisticsCurrentVideo = {commentCount, likeCount, dislikeCount, favoriteCount, viewCount}
        dispatch(actionsCurrentVideo.setStatistics(statisticsCurrentVideo))

        //----Детали Канала выбраного видео
        const channelId = snippet.channelId
        await dispatch(getCurrentVideoChannel(channelId))


        //---комментарии выбраного видео
        if (!status.publicStatsViewable || !statisticsCurrentVideo.commentCount) {
            dispatch(actionsCurrentVideo.setCommentsStatus('commentsDisabled'))
        } else {
            await dispatch(getVideoComments(videoId))
        }


        //--------Похожие видео (стоимость квоты 100 ЕДИНИЦ !!!)
        //  await dispatch(getRelatedVideosByVideoId(id))

        //----Выбрать нужное: сверху или снизу

        //--------Видео из такой-же категории (стоимость квоты 1 единица =)
        const categoryId = snippet.categoryId
        await dispatch(getRelatedVideosByCategoryId(categoryId))


        //---Рейтинг видео аутентифицированого пользователя
        if (access_token) {
            await dispatch(getUserVideoRating(videoId, access_token))
        } else {
            dispatch(actionsCurrentVideo.setUserRating('none'))
        }


    } catch (error) {
        let e = error as any
        dispatch(actionsCurrentVideo.setError({
            code: e.response.code,
            message: e.response.message
        }))
    } finally {
        dispatch(actionsCurrentVideo.setIsLoading(false))
    }
}


//---Рейтинг видео аутентифицированого пользователя
const getUserVideoRating = (videoId: string, access_token: string): ThunkType => async (dispatch) => {
    const dataUserRating = await YoutubeAPIVideoInteraction.getUserRating(videoId, access_token)
    dispatch(actionsCurrentVideo.setUserRating(dataUserRating.items[0].rating))
}

//---Лайк, дизлайк, удалить оценку
export const setUserRating = (videoId: string, rating: 'none' | 'like' | 'dislike', access_token: string): ThunkType => async (dispatch) => {
    const statusCode = await YoutubeAPIVideoInteraction.setUserRating(videoId, rating, access_token)
    if (statusCode === 204) {
        dispatch(actionsCurrentVideo.setUserRating(rating))
    } else {
        alert('error setUserRating =(')
    }
}

export const getAbuseReasonList = (access_token: string): ThunkType => async (
    dispatch
) => {
    try {
        dispatch(actionsCurrentVideo.setAbuseStatus('loadingReasonsList'))
        const data = await YoutubeAPIVideoInteraction.reportAbuseList(access_token)
        const abuseReasons = data.items.map(({id, snippet}) => {
            return {
                id,
                label: snippet.label,
                secondaryReasons: snippet.secondaryReasons ? snippet.secondaryReasons.map(s => {
                    return {
                        id: s.id,
                        label: s.label
                    }
                }) : null
            }
        })
        dispatch(actionsCurrentVideo.setAbuseListReasons(abuseReasons))
        dispatch(actionsCurrentVideo.setAbuseStatus(null))
    } catch (error: any) {
        console.log(error.toJSON)
    }
}

export const reportAbuseVideo = (
    access_token: string, videoId: string, reasonId: string, secondaryReasonId: null | string, comments: string | null
): ThunkType => async (dispatch) => {
    dispatch(actionsCurrentVideo.setAbuseStatus('loading'))
    const status = await YoutubeAPIVideoInteraction.reportAbuseVideo(access_token, videoId, reasonId, secondaryReasonId, comments)
    if (status === 204) {
        dispatch(actionsCurrentVideo.setAbuseStatus('completed'))
    }
}

export default currentVideoReducer