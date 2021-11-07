export interface Channels_Types<Snippet = null, Statistics = null, BrandingSettings = null, Status = null> {
    kind: string
    etag: string
    nextPageToken: string
    prevPageToken: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    items: Array<ChannelItems<Snippet, Statistics, BrandingSettings, Status>>
}

export interface ChannelItems<Snippet, Statistics, BrandingSettings, Status> {
    kind: string
    etag: string
    id: string
    snippet: Snippet
    statistics: Statistics
    brandingSettings: BrandingSettings
    status: Status
}


export interface ChannelStatistics {
    viewCount: string
    subscriberCount: string
    hiddenSubscriberCount: boolean
    videoCount: string
}

export interface ChannelSnippet {
    title: string
    description: string
    customUrl: string
    publishedAt: string
    thumbnails: {
        default: ChannelImage
        medium: ChannelImage
        high: ChannelImage
    }
    defaultLanguage: string
    localized: {
        title: string
        description: string
    }
    country?: string
}

export interface ChannelImage {
    url: string
    width: number
    height: number
}

export interface ChannelBrandingSettings {
    channel: {
        title: string,
        keywords: string
        unsubscribedTrailer: string
        country: string
    }
    image: {
        bannerExternalUrl: string
    }
}

export interface ChannelStatus {
    privacyStatus: string
    isLinked: boolean
    longUploadsStatus: string
    madeForKids: boolean
}

//---------------------Channel Sections

export interface ChannelSectionsResponse{
    kind: string
    etag: string
    items:Array<ChannelSections>
}

export interface ChannelSections {
    kind: string
    etag: string
    id: string
    snippet: {
        type: string
        channelId: string
        title: string
        position: number
    },
    contentDetails: {
        playlists: [
            string
        ],
        channels: [
            string
        ]
    }
}