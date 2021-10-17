import axios from "axios";
import {
    RelatedVideosByCategoryListResponse,
    RelatedVideosListResponse,
    VideosIdListBySearchResponse,
    VideosListResponse
} from "../../types/Types_Youtube_API/Videos_Types";
import {CommentAnswersThread, CommentThread} from "../../types/Types_Youtube_API/Comments_Types";
import {
    ChannelBrandingSettings,
    Channels_Types,
    ChannelSnippet,
    ChannelStatistics, ChannelStatus
} from "../../types/Types_Youtube_API/Channels_Types";
import {type} from "os";


const credentials = {
    youtubeAPIKey: 'AIzaSyBey2mu4mayQvY4yJYoAEc2cFT_PzIKzd4',
    clientId: '205239420469-a77bsbiec4k1mpu3lb4nfl05krmm6262.apps.googleusercontent.com'//dont used
}
const instance = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/',
        params: {
            key: credentials.youtubeAPIKey,
        }
    }
)

export const YoutubeAPI = {
    getVideosByTerm(searchTerm: string, pageToken: string | null = null) {
        const params = {
            part: 'id',
            maxResults: 20,
            type: 'video',
            q: searchTerm,
            pageToken: pageToken

        }
        return instance.get<VideosIdListBySearchResponse>('search?', {params}).then(
            response => response.data
        )
    },

    getMostPopularVideos(pageToken: string | null = null) {
        const params = {
            part: 'snippet,statistics,contentDetails',
            maxResults: 20,
            pageToken: pageToken,
            chart: 'mostPopular',
            regionCode: 'UA'
        }
        return instance.get<VideosListResponse>('videos?', {params}).then(
            response => response.data
        )
    },

    getVideosById(id: string|Array<string>) {
        const params = {
            part: 'snippet,statistics,contentDetails,status',
            id: id.toString(),
        }
        return instance.get<VideosListResponse>('videos?', {params}).then(
            response => response.data
        )
    },
    getVideosByCategory(categoryId:string) {
        const params = {
            part: 'snippet',
            regionCode:'UA',
            videoCategoryId:categoryId,
            chart:'mostPopular',
            maxResults:30,

        }
        return instance.get<RelatedVideosByCategoryListResponse>('videos?', {params}).then(
            response => response.data
        )
    },

    getRelatedVideos(videoId: string) {
        const params={
            part:'snippet',
            maxResults:10,
            relatedToVideoId:videoId,
            videoSyndicated:true,
            type:'video'
        }
        return instance.get<RelatedVideosListResponse>(`search?`,{params}).then(
            response => response.data
        )
    },





    getUserYoutubeChannelId(access_token: string) {
        return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${credentials.youtubeAPIKey}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.data)
    },
    getChannelsById(id: string|Array<string>) {
        const params = {
            part:'snippet,statistics',
            id:id.toString()
        }
        return instance.get<Channels_Types<ChannelSnippet,ChannelStatistics>>(
            'channels?', {params}).then(res => res.data
        )
    },
    getFullInfoChannelById(channelId: string) {
        const params = {
            part:'snippet,statistics,brandingSettings,status',
            id:channelId
        }
        return instance.get<Channels_Types<ChannelSnippet,ChannelStatistics,ChannelBrandingSettings,ChannelStatus>>(
            'channels?', {params}).then(res => res.data
        )
    },
    getSections(channelId: string) {
        const params = {
            part:'snippet,id,contentDetails',
            channelId:channelId
        }
        return instance.get(
            'channelSections?', {params}).then(res => res.data
        )
    },

    getVideoRatingUser(videoId: string, access_token: string) {
        return fetch(`https://www.googleapis.com/youtube/v3/videos/getRating?id=${videoId}&key=${credentials.youtubeAPIKey}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        }).then(
            res => res.json()
        )
    },



    getVideoComments(videoId: string, nextPageToken: string | null = null, order:'relevance'|'time'='relevance') {
       const params = {
           part:'id,snippet',
           pageToken : nextPageToken,
           videoId:videoId,
           maxResults:50,
           textFormat:'html',
           order:order,
       }
        return instance.get<CommentThread>(
            `commentThreads?`, {params}).then(
            res => res.data
        )
    },

    getCommentAnswers(commentId: string, nextPageToken:string|null=null) {
        const params = {
            part:'id,snippet',
            pageToken : nextPageToken,
            parentId:commentId,
            maxResults:10,
            textFormat:'html',
        }
        return instance.get<CommentAnswersThread>(
            `comments?`,{params}).then(
            res => res.data
        )
    },
}








