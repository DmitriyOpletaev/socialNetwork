import {Avatar, Comment} from "antd"
import m from "../Modal_Window_Styles.module.scss"
import {DislikeOutlined, LikeOutlined, ArrowDownOutlined} from '@ant-design/icons'
import React, {FC, useState} from "react"
import {CommentType} from "../../../../types/Videos_Types"
import {dateReformat} from "../../../utils/validators/string_formatting"
import {CommentAnswer} from "./Answer"
import {useDispatch, useSelector} from "react-redux"
import {getCommentAnswers} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer"
import {AnswerInput} from "./Answer_Input";
import {MarkAsSpamButton} from "./Mark_As_Spam_Button";
import {DeleteCommentButton} from "./Delete_Comment_Button";
import {MainVideoSelector} from "../../../redux/Selectors/Videos_Selector";


export const VideoComment: FC<VideoCommentProps> = ({comment, channelId}) => {
    const {
        commentId, text, answers, isLoadingAnswers, answersNextPageToken,
        totalReplyCount, likeCount, authorChannelId, authorDisplayName,
        authorProfileImageUrl, publishedAt
    } = comment
    const Answers = answers && answers.map(answer => (
        <CommentAnswer answer={answer} channelId={channelId} key={answer.commentId}/>))
    const [isOpenAnswers, setIsOpenAnswers] = useState(false)
    const [isShowInput, setIsShowInput] = useState(false)
    const userChannel = useSelector(MainVideoSelector.userChannel)
    const dispatch = useDispatch()

    function openAnswers() {
        !answers && dispatch(getCommentAnswers(commentId))
        setIsOpenAnswers(true)
    }

    function closeAnswers() {
        setIsOpenAnswers(false)
    }

    return (
        <>
            <Comment className={m.comment_container} key={commentId}
                     author={
                         <div className={`
                         ${m.name} ${channelId === authorChannelId && m.nameOwner} ${userChannel && authorChannelId === userChannel.channelId && m.commentOwner}`}>
                             <span>{authorDisplayName}</span>
                         </div>
                     }
                     avatar={<Avatar src={authorProfileImageUrl}/>}
                     content={
                         <div className={m.comment_content_wrapper}>
                             <p dangerouslySetInnerHTML={{__html: text}}/>
                             <div className={m.comment_rating_wrapper}>
                                 <span><LikeOutlined/></span>
                                 <span style={{margin: '5px'}}>{likeCount}</span>
                                 <span style={{margin: '8px'}}><DislikeOutlined/></span>
                                 {totalReplyCount > 0 &&
                                     <span>
                                     <OpenCloseAnswers isOpenAnswers={isOpenAnswers}
                                                       closeAnswers={closeAnswers}
                                                       openAnswers={openAnswers}
                                                       totalReplyCount={totalReplyCount}/>
                                 </span>
                                 }
                                 <span className={m.answer_button}
                                       onClick={() => setIsShowInput(true)}>
                                        ????????????????
                                 </span>
                             </div>
                             <div className={m.comment_buttons_container}>
                                 <MarkAsSpamButton commentId={commentId}/>
                                 {
                                     userChannel && authorChannelId === userChannel.channelId &&
                                     <DeleteCommentButton commentId={commentId}/>
                                 }
                             </div>

                         </div>
                     }
                     datetime={
                         <span>{dateReformat(publishedAt)}</span>
                     }
            />


            <div className={m.answers_wrapper}>
                {isShowInput && <AnswerInput setIsShowInput={setIsShowInput} parentId={commentId}/>}
                {isOpenAnswers && Answers}
            </div>
            <MoreCloseAnswers isOpenAnswers={isOpenAnswers} closeAnswers={closeAnswers}
                              answersNextPageToken={answersNextPageToken}
                              totalReplyCount={totalReplyCount} commentId={commentId}
            />
        </>
    )
}


const OpenCloseAnswers: FC<OpenCloseAnswersProps> = (
    {isOpenAnswers, closeAnswers, totalReplyCount, openAnswers}
) => {
    return (
        <span className={m.open_close_answers_buttons_container}>
            {isOpenAnswers ?
                <span style={{margin: '15px'}}
                      onClick={closeAnswers}>
                    ???????????? ????????????
                </span>
                :
                <span onClick={openAnswers}>
                    ???????????????? {totalReplyCount} ??????????????
                    <ArrowDownOutlined style={{marginLeft: '3px'}}/>
                </span>
            }
        </span>
    )
}
const MoreCloseAnswers: FC<MoreCloseAnswersProps> = (
    {isOpenAnswers, closeAnswers, answersNextPageToken, commentId}
) => {
    const dispatch = useDispatch()

    function openMoreAnswers() {
        dispatch(getCommentAnswers(commentId, answersNextPageToken))
    }

    return (
        <div className={m.more_close_answers_button_container}>
            {isOpenAnswers && <>
                <span onClick={closeAnswers}
                      className={m.open_close_answers_button}>???????????? ????????????</span>
                {answersNextPageToken &&
                    <span className={m.answers_button_more}
                          onClick={openMoreAnswers}>
                    ??????
                </span>
                }
            </>
            }
        </div>
    )
}


type VideoCommentProps = {
    comment: CommentType
    channelId: string
}
type OpenCloseAnswersProps = {
    openAnswers: () => void
    isOpenAnswers: boolean
    closeAnswers: () => void
    totalReplyCount: number
}
type MoreCloseAnswersProps = {
    isOpenAnswers: boolean,
    closeAnswers: () => void
    totalReplyCount: number
    answersNextPageToken: string | null
    commentId: string
}
