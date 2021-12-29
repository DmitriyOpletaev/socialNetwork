import {
    RelatedVideosListResponse,
    SearchSnippet,
    VideosIdListBySearchResponse,
    VideosListByCategoryResponse,
    VideosListResponse
} from "./Types_Youtube_API/Videos_Types";
import {instanceYoutube} from "./API";
import {Youtube_SearchListResponse} from "./Types_Youtube_API/SearchTypes";


export const YoutubeAPIVideosList = {
    searchYoutube(
        searchTerm: string,
        pageToken: string | null = null,
        order: OrderVideoSearch = 'relevance',
        type: SearchType = 'video'
    ) {
        const params = {
            part: 'id',
            maxResults: 20,
            q: searchTerm,
            type, pageToken, order
            }
        return instanceYoutube().get<Youtube_SearchListResponse>('search?', {params}).then(
            response => response.data
        )
    },
    searchUserVideos(
        accessToken: string,
        pageToken: string | null = null,
    ) {
        const params = {
            part: 'id',
            maxResults: 20,
            type:'video',
            forMine:true,
            pageToken
            }
        return instanceYoutube(accessToken).get<Youtube_SearchListResponse<'OnlyVideo'>>(
            'search?', {params}
        ).then(
            response => response.data
        )
    },
    //----если videoCategoryId === null, то вернутся видео 'в тренде'
    getVideosByCategory(pageToken: string | null, videoCategoryId: VideoCategoryId) {
        const params = {
            part: 'snippet,statistics,contentDetails',
            maxResults: 30,
            pageToken,
            chart: 'mostPopular',
            regionCode: 'UA',
            videoCategoryId,
        }
        return instanceYoutube().get<VideosListResponse>('videos?', {params}).then(
            res => res.data
        )
    },
    getUserLikedVideos(accessToken: string, pageToken: string | null, myRating: 'like' | 'dislike') {
        const params = {
            part: 'snippet,statistics,contentDetails',
            maxResults: 30,
            pageToken,
            myRating,
        }
        return instanceYoutube(accessToken).get<VideosListResponse>('videos?', {params}).then(
            res => res.data
        )
    },

    getVideosByCategory___RelatedVideos(categoryId: string) {
        const params = {
            part: 'snippet',
            regionCode: 'UA',
            videoCategoryId: categoryId,
            chart: 'mostPopular',
            maxResults: 30,
        }
        return instanceYoutube().get<VideosListByCategoryResponse>('videos?', {params}).then(
            response => response.data
        )
    },
    getChannelVideos(channelId: string | null, pageToken: string | null = null) {
        const params = {
            part: 'snippet',
            maxResults: 25,
            channelId,
            pageToken,
            order:'date'
        }
        return instanceYoutube().get<VideosIdListBySearchResponse<SearchSnippet>>('search?', {params}).then(
            response => response.data
        )
    },
    getVideosById(id: string | Array<string>) {
        const params = {
            part: 'snippet,statistics,contentDetails,status',
            id: id.toString(),
        }
        return instanceYoutube().get<VideosListResponse>('videos?', {params}).then(
            response => response.data
        )
    },


    getRelatedVideos(videoId: string) {
        const params = {
            part: 'snippet',
            maxResults: 25,
            relatedToVideoId: videoId,
            videoSyndicated: true,
            type: 'video'
        }
        return instanceYoutube().get<RelatedVideosListResponse>(`search?`, {params}).then(
            response => response.data
        )
    },
}


type VideoCategoryId = "1" | "10" | "17" | "20" | "23" | "25" | null
export type OrderChannelType = 'alphabetical' | 'relevance' | 'unread' | null //  Сортировка списка подписок по: алфавиту | релевантности | активности
export type SearchType = 'all' | 'channel' | 'playlist' | 'video'
export type OrderVideoSearch = 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount'  //  Сортировка результатов поиска
