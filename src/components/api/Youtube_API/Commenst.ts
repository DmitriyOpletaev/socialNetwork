import {CommentAnswersThread, CommentThread} from "./Types_Youtube_API/Comments_Types";
import {instanceYoutube} from "./API";

export const YoutubeAPIComments={

    getVideoComments(videoId: string, nextPageToken: string | null = null, order: 'relevance' | 'time' = 'relevance') {
        const params = {
            part: 'id,snippet',
            pageToken: nextPageToken,
            videoId: videoId,
            maxResults: 50,
            textFormat: 'html',
            order: order,
        }
        return instanceYoutube().get<CommentThread>(
            `commentThreads?`, {params}).then(
            res => res.data
        )
    },

    getCommentAnswers(commentId: string, nextPageToken: string | null = null) {
        const params = {
            part: 'id,snippet',
            pageToken: nextPageToken,
            parentId: commentId,
            maxResults: 10,
            textFormat: 'html',
        }
        return instanceYoutube().get<CommentAnswersThread>(
            `comments?`, {params}).then(
            res => res.data
        )
    },
}