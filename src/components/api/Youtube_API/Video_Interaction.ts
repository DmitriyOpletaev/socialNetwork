import {credentials, instanceYoutube} from "./API";
import {GetRatingResponse} from "./Types_Youtube_API/Auth_Requests_Types"
import {VideoAbuseReportReasonListResponse} from "./Types_Youtube_API/Video_Interaction_Types"

export const YoutubeAPIVideoInteraction = {
    getUserRating(videoId: string | Array<string>, access_token: string) {
        const params = {
            id: videoId.toString()
        }
        return instanceYoutube(access_token).get<GetRatingResponse>(`videos/getRating?`, {params}).then(
            response => response.data
        )
    },
    setUserRating(videoId: string, rating: 'none' | 'like' | 'dislike', access_token: string) {
        const params = {
            id: videoId,
            rating: rating,
            key: credentials.youtubeAPIKey,
        }
        return instanceYoutube(access_token).post(`videos/rate?`, {}, {params}).then(
            response => response.status
        )
    },
    reportAbuseList (access_token: string ) {
        const params={
            part:'snippet',
            hl:'ru-RU'
        }
        return instanceYoutube(access_token).get<VideoAbuseReportReasonListResponse>(
            'videoAbuseReportReasons?',{params}
        ).then(
            response => response.data
        )
    },
    reportAbuseVideo (access_token: string,videoId: string, reasonId: string,secondaryReasonId:null|string,comments:string|null ) {
        const data = {
            videoId: videoId,
            reasonId: reasonId,
            secondaryReasonId:secondaryReasonId,
            comments:comments
        }
        return instanceYoutube(access_token).post<number>(`videos/reportAbuse?`, data).then(
            response => response.status
        )
    },
}