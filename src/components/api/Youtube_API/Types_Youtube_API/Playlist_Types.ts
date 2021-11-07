
import {PageInfo, PreviewImg} from "./Videos_Types";


//---------------------Playlist  Types
export interface PlaylistResponse {
    kind: string
    etag: string
    nextPageToken: string
    prevPageToken: string
    pageInfo: PageInfo
    items: Array<PlaylistItems>
}

interface PlaylistItems {
    etag: string
    id: string
    kind: string
    snippet: PlaylistVideosSnippet
    contentDetails: PlaylistContentDetails
    status: {
        privacyStatus: string
    }
}

interface PlaylistVideosSnippet {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
        default: PreviewImg
        high: PreviewImg
        maxres: PreviewImg
        medium: PreviewImg
        standard: PreviewImg
    }
    channelTitle: string,
    videoOwnerChannelTitle: string,
    videoOwnerChannelId: string,
    playlistId: string,
    position: number,
    resourceId: {
        "kind": string,
        "videoId": string,
    }
}

export interface PlaylistContentDetails {
    videoId: string
    startAt: string,
    endAt: string,
    note: string,
    videoPublishedAt: string
}


//-----------------Playlist Info Response
export interface PlaylistInfoResponse {
    kind: string
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: PageInfo
    items: Array<PlaylistInfoItems>


}
export interface PlaylistInfoItems{
    kind: string
    etag: string
    id: string
    contentDetails:{
        itemCount:number
    }
    snippet: {
        publishedAt: string
        channelId: string
        title: string
        description: string
        thumbnails: {
            default: PreviewImg
            high: PreviewImg
            maxres: PreviewImg
            medium: PreviewImg
            standard: PreviewImg
        }
        channelTitle: string
        defaultLanguage: string
        localized: {
            title: string
            description: string
        }
    },
}