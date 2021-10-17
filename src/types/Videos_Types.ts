export interface ErrorType {
    code: number
    message: string
}
export interface VideoDetails  {
    videoId: string,
    title: string
    channelTitle: string
    description: string
    publishTime: string
    channelId: string
    videoPreviewImg:string
    totalViews?:string
    videoDuration?:string
}
export  interface CommentType {
    commentId:string
    authorChannelId:string
    authorDisplayName:string
    authorProfileImageUrl:string
    likeCount:number
    publishedAt:string
    text:string
    totalReplyCount:number
    videoId:string
}
export  interface CommentsAnswers {
    parentId:string
    nextPageToken: string|null
    answersArray: Array<{
        commentId:string
        authorChannelId:string
        authorDisplayName:string
        authorProfileImageUrl:string
        likeCount:number
        publishedAt:string
        text:string
    }>
}

export interface CurrentVideoDetails{
    id:string
    title:string
    description:string
    publishedAt:string
    tags:Array<string>
}
export interface VideoStatistics {
    commentCount: string
    dislikeCount: string
    favoriteCount: string
    likeCount: string
    viewCount: string
}
export interface CurrentVideoChannelDetails{
    channelId:string
    title:string
    channelDescription:string
    imgUrl:string
    subscribersCount:string
}
export interface RelatedVideosType {
    videoId: string
    title: string
    channelTitle: string
    channelId: string
    videoPreviewImg:string
}



//--------Current Channel Types
export interface CurrentChannelInfo{
    id:string
    image:string
    banner:string
    title:string
    description:string
    countryISO:string
    published:string
    channelStatistics:{
        subscriberCount:string
        hiddenSubscriberCount:boolean
        viewCount:string
        videoCount:string
    }
}