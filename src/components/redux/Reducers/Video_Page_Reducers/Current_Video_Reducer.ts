import {BaseThunkType, InferActionsTypes} from "../../redux-store";
import {YoutubeAPI} from "../../../api/Youtube_API";
import {
    CommentsAnswers,
    CommentType,
    CurrentVideoChannelDetails, CurrentVideoDetails, ErrorType, RelatedVideosType,
    VideoStatistics
} from "../../../../types/Videos_Types";
import {
    RelatedVideosByCategoryListResponse,
    VideosListResponse
} from "../../../../types/Types_Youtube_API/Videos_Types";
import {CommentAnswersThread, CommentThread} from "../../../../types/Types_Youtube_API/Comments_Types";
import {Channels_Types, ChannelSnippet, ChannelStatistics} from "../../../../types/Types_Youtube_API/Channels_Types";


let initialState = {
    isLoading: false,
    error: null as ErrorType | null,
    currentVideo: {} as CurrentVideoDetails,
    channelDetails: {} as CurrentVideoChannelDetails,
    currentVideoStatistics: {} as VideoStatistics,
    relatedVideoDetails: [] as Array<RelatedVideosType>,
    commentsDetails: {
        commentsStatus: null as string|null,
        comments: [] as Array<CommentType>,
        nextPageCommentsToken: null as string | null,
    },
    answers: {
        loadingAnswers: null as string | null,
        commentAnswers: [] as Array<CommentsAnswers>,
    },


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
                ...state, currentVideo: action.payload.currentVideo
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
            if (action.payload.isNewVideo) {
                return {
                    ...state,
                    commentsDetails: {
                        commentsStatus: null,
                        nextPageCommentsToken: action.payload.nextPageToken,
                        comments: action.payload.comments
                    },
                    answers: {
                        commentAnswers: [],
                        loadingAnswers: null
                    }
                }
            } else {
                return {
                    ...state,
                    commentsDetails: {
                        commentsStatus: null,
                        nextPageCommentsToken: action.payload.nextPageToken,
                        comments: state.commentsDetails.comments.concat(action.payload.comments)
                    }
                }
            }
        case 'YOUTUBE/SET_COMMENTS_STATUS':
            if(action.payload.status === 'commentsDisabled'){
                return {
                    ...state,
                    commentsDetails:{
                        commentsStatus: action.payload.status ,
                        comments: [],
                        nextPageCommentsToken: null
                    }
                }
            }else{
                return{
                    ...state,
                    commentsDetails:{
                        commentsStatus:  action.payload.status,
                        nextPageCommentsToken: state.commentsDetails.nextPageCommentsToken,
                        comments: state.commentsDetails.comments
                    },

                }
            }


        case 'YOUTUBE/SET_COMMENT_ANSWERS':
            let index = state.answers.commentAnswers.findIndex(a => a.parentId === action.payload.commentAnswers.parentId)
            let newArray = [...state.answers.commentAnswers]
            if (index !== -1) {
                newArray[index] = {
                    ...newArray[index],
                    answersArray: newArray[index].answersArray.concat(action.payload.commentAnswers.answersArray),
                    nextPageToken: action.payload.commentAnswers.nextPageToken
                }
            } else {
                newArray = [...state.answers.commentAnswers, action.payload.commentAnswers]
            }
            return {
                ...state,
                answers: {
                    ...state.answers,
                    commentAnswers: newArray
                }

            }
        case
        'YOUTUBE/SET_IS_LOADING_CURRENT_VIDEO_ANSWERS':
            return {
                ...state,
                answers: {
                    ...state.answers,
                    loadingAnswers: action.loadingAnswers
                }
            }
        case
        'YOUTUBE/SET_CHANNEL_DETAILS' :
            return {
                ...state,
                channelDetails: action.payload.channelDetails
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
    setUserRating: (statistics: VideoStatistics) => ({
        type: 'YOUTUBE/SET_USER_RATING', payload: {statistics}
    } as const),
    setRelatedVideos: (videoDetails: Array<RelatedVideosType>) => ({
        type: 'YOUTUBE/SET_RELATED_VIDEOS', payload: {videoDetails}
    } as const),
    setComments: (comments: Array<CommentType>, isNewVideo: boolean, nextPageToken: string | null, totalCount: number) => ({
        type: 'YOUTUBE/SET_COMMENTS', payload: {comments, isNewVideo, nextPageToken, totalCount}
    } as const),
    setCommentsStatus: (status:null|string) => ({
        type: 'YOUTUBE/SET_COMMENTS_STATUS', payload: {status}
    } as const),
    setCommentAnswers: (commentAnswers: CommentsAnswers) => ({
        type: 'YOUTUBE/SET_COMMENT_ANSWERS', payload: {commentAnswers}
    } as const),

}

export const getVideoComments = (
    videoId: string, pageToken = null as string | null, order: 'relevance' | 'time' = 'relevance'
): ThunkType => async (
    dispatch) => {
    try{
        dispatch(actionsCurrentVideo.setCommentsStatus('loading'))
        const data: CommentThread = await YoutubeAPI.getVideoComments(videoId, pageToken, order)
        const comments = data.items.map((c) => {
            const {
                authorChannelId,
                authorDisplayName,
                authorProfileImageUrl,
                textDisplay,
                likeCount,
                publishedAt,
            } = c.snippet.topLevelComment.snippet
            return {
                commentId: c.snippet.topLevelComment.id,
                authorChannelId: authorChannelId.value,
                authorDisplayName: authorDisplayName,
                authorProfileImageUrl: authorProfileImageUrl,
                likeCount: likeCount,
                publishedAt: publishedAt,
                text: textDisplay,
                totalReplyCount: c.snippet.totalReplyCount,
                videoId: c.snippet.videoId
            }
        })
        const isNewVideo = !pageToken
        const nextPageToken = data.nextPageToken || null
        dispatch(actionsCurrentVideo.setComments(comments, isNewVideo, nextPageToken, data.pageInfo.totalResults))
    }
    catch (error){
        alert('Error Comments')
    }
    finally {
            dispatch(actionsCurrentVideo.setCommentsStatus(null))
    }

}

export const getCommentAnswers = (commentId: string, nextPageAnswersToken = null as string | null): ThunkType => async (dispatch) => {
    try {
        dispatch(actionsCurrentVideo.setIsLoadingAnswers(commentId))
        const data: CommentAnswersThread = await YoutubeAPI.getCommentAnswers(commentId, nextPageAnswersToken)
        const answersDetails = data.items.map((c) => {
            const {
                authorChannelId,
                authorDisplayName,
                authorProfileImageUrl,
                textDisplay,
                likeCount,
                publishedAt
            } = c.snippet
            return {
                commentId: c.id,
                authorChannelId: authorChannelId.value,
                authorDisplayName: authorDisplayName,
                authorProfileImageUrl: authorProfileImageUrl,
                likeCount: likeCount,
                publishedAt: publishedAt,
                text: textDisplay,
            }

        })
        const answers = {
            parentId: data.items[0].snippet.parentId,
            nextPageToken: data.nextPageToken ? data.nextPageToken : null,
            answersArray: answersDetails
        }
        dispatch(actionsCurrentVideo.setCommentAnswers(answers))
    } catch (error) {
        alert('error Load Answers')
    } finally {
        dispatch(actionsCurrentVideo.setIsLoadingAnswers(null))
    }
}


const getCurrentVideoChannel = (channelId: string): ThunkType => async (dispatch) => {
    try {
        const dataChannel: Channels_Types<ChannelSnippet,ChannelStatistics> = await YoutubeAPI.getChannelsById(channelId)
        const {snippet, statistics, id} = dataChannel.items[0]
        const channelDetails = {
            channelId: id,
            title: snippet.title,
            channelDescription: snippet.description,
            imgUrl: snippet.thumbnails.medium.url,
            subscribersCount: statistics.subscriberCount,
        }
        dispatch(actionsCurrentVideo.setChannelDetails(channelDetails))
        const a = dataChannel.items[3]
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
        const dataRelatedVideos: RelatedVideosByCategoryListResponse = await YoutubeAPI.getVideosByCategory(categoryId)
        const relatedVideoDetails: Array<RelatedVideosType> = dataRelatedVideos.items.filter((v) => !!v.snippet).map((v) => {
            return {
                videoId: v.id,
                title: v.snippet.title,
                channelTitle: v.snippet.channelTitle,
                channelId: v.snippet.channelId,
                videoPreviewImg: v.snippet.thumbnails.medium.url,
            }
        })
        dispatch(actionsCurrentVideo.setRelatedVideos(relatedVideoDetails))
    } catch (error) {

    }
}


//---------Полная информация о видео (при открытии видео для просмотра)
export const setCurrentVideo = (id: string, /*access_token = null as string | null*/): ThunkType => async (
    dispatch) => {
    try {
        dispatch(actionsCurrentVideo.setIsLoading(true))
        const dataCurrentVideo: VideosListResponse = await YoutubeAPI.getVideosById(id)
        const {snippet, statistics,status} = dataCurrentVideo.items[0]

        //-----Общие детали выбранного видео
        const currentVideo = {
            id: dataCurrentVideo.items[0].id,
            title: snippet.title,
            description: snippet.description,
            publishedAt: snippet.publishedAt,
            tags: snippet.tags
        }
        dispatch(actionsCurrentVideo.setCurrentVideo(currentVideo))

        //----Статистика выбранного видео
        const statisticsCurrentVideo = {
            commentCount: statistics.commentCount,
            dislikeCount: statistics.dislikeCount,
            favoriteCount: statistics.favoriteCount,
            likeCount: statistics.likeCount,
            viewCount: statistics.viewCount
        }
        dispatch(actionsCurrentVideo.setStatistics(statisticsCurrentVideo))

        //----Детали Канала выбраного видео
        const channelId = snippet.channelId
        await dispatch(getCurrentVideoChannel(channelId))

        //---комментарии выбраного видео
        if(status.publicStatsViewable){
            await dispatch(getVideoComments(id))
        }else{
            dispatch(actionsCurrentVideo.setCommentsStatus('commentsDisabled'))
        }


        //--------Похожие видео (стоимость квоты 100 ЕДИНИЦ !!!)
        //  await dispatch(getRelatedVideosByVideoId(id))

        //--------Видео из такой-же категории (стоимость квоты 1 единица =)
        const categoryId = snippet.categoryId
        await dispatch(getRelatedVideosByCategoryId(categoryId))


    } catch (error: any) {
        let e = error as any
        dispatch(actionsCurrentVideo.setError({
            code: e.response.code,
            message: e.response.message
        }))
    } finally {
        dispatch(actionsCurrentVideo.setIsLoading(false))
    }

}


export default currentVideoReducer