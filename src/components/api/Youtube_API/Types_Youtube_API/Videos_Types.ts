export interface PageInfo {
    totalResults: number
    resultsPerPage: number
}

//----------------Videos List By Search (only ID's)
export interface VideosIdListBySearchResponse<SN = never, CD = never> {
    kind: string
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: PageInfo
    items: Array<VideosListBySearchItems<SN, CD>>
}

export interface VideosListBySearchItems<SN, CD> {
    kind: string
    etag: string
    id: {
        kind: string
        videoId: string
    }
    snippet: SN
    contentDetails: CD
}

export interface SearchSnippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
        default: PreviewImg
        high: PreviewImg
        medium: PreviewImg
    }
    channelTitle: string
    liveBroadcastContent: string
}


//---------------Videos-List with Full Details

export interface VideosListResponse {
    kind: string
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: PageInfo
    items: Array<VideosListItems>
}

export interface VideosListItems {
    kind: string
    etag: string
    id: string
    snippet: VideoSnippet
    contentDetails: ContentDetails
    statistics: Statistics
    status: Status
}

interface Status {
    embeddable: boolean
    license: string
    madeForKids: boolean
    privacyStatus: string
    publicStatsViewable: boolean
    uploadStatus: string
}

export interface VideoSnippet {
    publishedAt: string
    channelId: string
    title: string
    channelTitle: string
    description: string
    tags: Array<string>
    categoryId: string
    liveBroadcastContent: string
    defaultLanguage: string
    localized: {
        title: string
        description: string
    }
    defaultAudioLanguage: string
    thumbnails: {
        default: PreviewImg
        high: PreviewImg
        maxres: PreviewImg
        medium: PreviewImg
        standard: PreviewImg
    }
}

export interface PreviewImg {
    height: number
    url: string
    width: number
}

export interface ContentDetails {
    duration: string
    dimension: string
    definition: string
    caption: string
    licensedContent: boolean
    regionRestriction: {
        allowed: Array<string>
        blocked: Array<string>
    }
}

export interface Statistics {
    viewCount: string
    likeCount: string
    dislikeCount: string
    favoriteCount: string
    commentCount: string
}


//-----------------------RELATED VIDEOS RESPONSE
export interface RelatedVideosListResponse {
    kind: string
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: PageInfo
    items: Array<RelatedVideosListItems>
}

export interface RelatedVideosListItems {
    kind: string
    etag: string
    id: {
        kind: string
        videoId: string
    }
    snippet: VideoSnippet
}

//----------------------- VIDEOS_BY_CATEGORY RESPONSE
export type CategoryId<S=never> =
    'trends'| '1' | '10' | '17' | '20' | '23' | '25'|"likesVideos" | "dislikesVideos" | "userVideos"|S



export interface VideosListByCategoryResponse {
    kind: string
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: PageInfo
    items: Array<VideosListByCategoryItems>
}

export interface VideosListByCategoryItems {
    kind: string
    etag: string
    id: string
    snippet: VideoSnippet
}








