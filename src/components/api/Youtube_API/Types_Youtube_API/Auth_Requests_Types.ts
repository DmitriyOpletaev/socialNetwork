import {PageInfo, PreviewImg} from "./Videos_Types";




//------------------AUTH USER VIDEO RATING
export interface GetRatingResponse{
    kind: "youtube#videoGetRatingResponse",
    etag: string,
    items: [
        {
            videoId: string
            rating: UserVideoRating
        }
    ]
}
export type UserVideoRating = 'dislike' | 'like' | 'none' | 'unspecified'


//---------------SUBSCRIPTIONS RESOURCE
export interface SubscriptionsListResponse<SN={},CD={},SSN={}>{
    kind: string
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: PageInfo
    items: Array<SubscriptionsResource<SN,CD,SSN>>
}

export  interface SubscriptionsResource<SN={},CD={},SSN={}>{
    kind: string
    etag: string
    id: string   // идентификатор подписки, требуется только для отписки
    snippet: SN
    contentDetails: CD
    subscriberSnippet:SSN
}
export interface SubscriptionsSnippet{
    publishedAt: number
    channelTitle: string
    title: string
    description: string
    resourceId: {
        kind: string
        channelId: string // id канала на который подписался пользователь !!!
    },
    channelId: string  // id канала пользователя, который подписуется !!!
    thumbnails: {
        default:PreviewImg
        medium:PreviewImg
        high:PreviewImg
    }
}
export interface SubscriptionsContentDetails {
    totalItemCount: number
    newItemCount: number
    activityType: string
}
export interface SubscriptionsSubscriberSnippet {
    title: string
    description: string
    channelId: string
    thumbnails: {
        default:PreviewImg
        medium:PreviewImg
        high:PreviewImg
    }

}

