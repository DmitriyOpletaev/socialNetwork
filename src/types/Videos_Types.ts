export interface ErrorType {
    code: number
    message: string
}
export interface PreviewVideo{
    videoId:string
    preview:string
    title:string
}


export interface VideoDetails  {
    videoId: string,
    title: string
    channelTitle: string
    description: string
    publishTime: string
    channelId: string
    previewImg:string
    totalViews?:string
    duration:string
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
    answersNextPageToken:string|null
    isLoadingAnswers:boolean
    answers:Array<CommentAnswerType>|null
}
export interface CommentAnswerType{
    commentId:string
    authorChannelId:string
    authorDisplayName:string
    authorProfileImageUrl:string
    likeCount:number
    publishedAt:string
    text:string
}

export interface CurrentVideoDetails{
    videoId:string
    title:string
    description:string
    publishedAt:string
    tags:Array<string>
}
export interface VideoStatistics {
    commentCount: string
    likeCount: string
    dislikeCount: string
    favoriteCount: string
    viewCount: string
}
export interface CurrentVideoChannelDetails{
    channelId:string
    title:string
    channelDescription:string
    imgUrl:string
    subscribersCount:string
}



//--------Current Channel Types
export interface CurrentChannelInfo{
    id:string
    image:string
    title:string
    description:string
    countryISO?:string
    published:string
    channelStatistics:{
        subscriberCount:string
        hiddenSubscriberCount:boolean
        viewCount:string
        videoCount:string
    }
}

export interface MultipleChannelsSections{
    title:string
    channels:Array<MultipleChannel>
}

export interface MultipleChannel{
    channelId:string
    title:string
    logo:string
    subscribersCount:string
}


export interface PlaylistDetails{
    playlistTitle:string
    description:string
    playlistPreview:string
    totalVideoCount:number
    playlistId:string
    resultsPerPage:number
    videos:Array<PreviewVideo>|null
}

export interface PlaylistInfo{
    playlistTitle:string
    description:string
    playlistPreview:string
    totalVideoCount:number
    playlistId:string
    nextPageToken:string
    resultsPerPage:number
}



