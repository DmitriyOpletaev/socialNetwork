import {CommentAnswerType, CommentType} from "../../../../types/Videos_Types";
import {CommentItems} from "../../../api/Youtube_API/Types_Youtube_API/Comments_Types";

export function setNewAnswersInComment(
    comments: Array<CommentType>,
    answers: Array<CommentAnswerType>,
    parentId: string,
    pageToken?: string | null
) {
    const currentCommentIndex = comments.findIndex(c => c.commentId === parentId)
    if (currentCommentIndex !== -1) {
        const newComments = [...comments]
        newComments[currentCommentIndex] = {
            ...newComments[currentCommentIndex],
            answersNextPageToken: pageToken === undefined ? newComments[currentCommentIndex].answersNextPageToken : pageToken,
            answers: newComments[currentCommentIndex].answers?.concat(answers) ?? answers,
        }
        return newComments
    } else {
        return comments
    }
}

export function createComments(commentsItems: CommentItems[]) {
    return commentsItems.map(({snippet}) => {
        const {
            authorChannelId,
            authorDisplayName,
            authorProfileImageUrl,
            textDisplay,
            likeCount,
            publishedAt,
        } = snippet.topLevelComment.snippet
        return {
            commentId: snippet.topLevelComment.id,
            authorChannelId: authorChannelId.value,
            authorDisplayName: authorDisplayName,
            authorProfileImageUrl: authorProfileImageUrl,
            likeCount: likeCount,
            publishedAt: publishedAt,
            text: textDisplay,
            totalReplyCount: snippet.totalReplyCount,
            videoId: snippet.videoId,
            answers: null,
            answersNextPageToken: null,
            isLoadingAnswers: false
        }
    })
}
