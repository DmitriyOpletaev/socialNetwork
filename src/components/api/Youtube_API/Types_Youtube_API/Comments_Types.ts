


interface CommentsPageInfo {
    totalResults: number
    resultsPerPage: number
}




//------------Comments-Types
export interface CommentThread{
    kind: string
    etag: string
    nextPageToken?: string
    pageInfo: CommentsPageInfo
    items: Array<CommentItems>
}
export interface CommentItems{
    kind: string,
    etag: string
    id: string
    snippet: CommentSnippet
}
export interface CommentSnippet {
    channelId: string
    videoId: string
    topLevelComment: TopLevelComment
    canReply: boolean
    totalReplyCount: number
    isPublic: boolean
}
export interface TopLevelComment {
    kind: string,
    etag: string
    id: string
    snippet:SnippetTopLevelComment
}
export interface SnippetTopLevelComment{
    authorDisplayName: string
    authorProfileImageUrl: string
    authorChannelUrl: string
    authorChannelId: {
        value: string
    }
    channelId: string
    videoId: string
    textDisplay: string
    textOriginal: string
    parentId: string
    canRate: boolean
    viewerRating: string
    likeCount: number,
    moderationStatus: string
    publishedAt: string
    updatedAt: string
}


//-----------Comment Answers Types
export interface CommentAnswersThread{
    kind: string
    etag: string
    nextPageToken?: string
    pageInfo: CommentsPageInfo
    items: Array<CommentAnswersItems>
}
export interface CommentAnswersItems{
    kind: string,
    etag: string
    id: string
    snippet: CommentAnswersSnippet
}
export interface CommentAnswersSnippet{
    authorDisplayName: string
    authorProfileImageUrl: string
    authorChannelUrl: string
    authorChannelId: {
        value: string
    }
    textDisplay: string
    textOriginal: string
    parentId: string
    canRate: boolean
    viewerRating: string
    likeCount: number,
    publishedAt: string
    updatedAt: string
}