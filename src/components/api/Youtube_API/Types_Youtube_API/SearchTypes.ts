import {PageInfo} from "./Videos_Types";

export interface Youtube_SearchListResponse<T='All'>{
    kind: 'youtube#searchListResponse'
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    regionCode: string,
    pageInfo: PageInfo
    items: Array<Youtube_SearchResult<T>>
}
interface Youtube_SearchResult<T> {
    kind: 'youtube#searchResult'
    etag: string
    id:  {
        kind: string
        videoId: T extends 'All' ? string|undefined : T extends 'OnlyVideo' ? string : undefined
        playlistId: T extends 'All' ? string|undefined : T extends 'OnlyPlaylist' ? string : undefined
        channelId: T extends 'All' ? string|undefined : T extends 'OnlyChannel' ? string : undefined
    }
}

