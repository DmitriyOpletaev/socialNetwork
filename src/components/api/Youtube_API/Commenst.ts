import {
    CommentAnswersItems,
    CommentAnswersThread,
    CommentItems,
    CommentThread
} from "./Types_Youtube_API/Comments_Types";
import {instanceYoutube} from "./API";

export const YoutubeAPIComments = {
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
    insertComment(videoId: string, channelId: string, text: string, accessToken: string) {
        const params = {
            part: 'id,snippet'
        }
        const data = {
            snippet: {
                channelId: channelId,
                videoId: videoId,
                topLevelComment: {snippet: {textOriginal: text}}
            }
        }
        return instanceYoutube(accessToken).post<CommentItems>(
            'commentThreads', data, {params}
        ).then(res => res.data)
    },
    insertAnswer(parentId: string, text: string, accessToken: string) {
        const params = {
            part: 'id,snippet'
        }
        const data = {
            snippet: {
                parentId:parentId,
                textOriginal: text
            }
        }
        return instanceYoutube(accessToken).post<CommentAnswersItems>(
            'comments', data, {params}
        ).then(res => res.data)
    },
    markAsSpam(commentId: string,accessToken:string) {
        const params = {
            id: commentId
        }
        return instanceYoutube(accessToken).post<number>(
            'comments/markAsSpam',{}, {params}
        ).then(res => res.status)
    },
    deleteComment(commentId:string,accessToken:string){
        const params={
            id: commentId
        }
        return instanceYoutube(accessToken).delete<number>(
            'comments', {params}
        ).then(res=>res.status)
    }

}