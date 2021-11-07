import {Avatar, Comment} from "antd";
import m from "../Modal_Window_Styles.module.scss";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import React, {FC, useState} from "react";
import {CommentAnswerType, CommentType} from "../../../../types/Videos_Types";
import {dateReformat} from "../../../utils/validators/string_formatting";
import {CommentAnswer} from "./Answer";


export const VideoComment: FC<VideoCommentProps> = ({comment, channelId}) => {
    const {
        commentId, text, answers, isLoadingAnswers, answersNextPageToken,
        totalReplyCount, likeCount, authorChannelId, authorDisplayName,
        authorProfileImageUrl, publishedAt
    } = comment
    const Answers = answers.map(answer => (
        <CommentAnswer answer={answer} channelId={channelId} key={answer.commentId}/>))
    const [isOpenAnswers, setIsOpenAnswers] = useState(false)
    return (
        <>
            <Comment className={m.comment_container} key={commentId}
                     author={
                         <div className={`${m.name} ${channelId === authorChannelId && m.nameOwner}`}>
                             <span>{authorDisplayName}</span>
                         </div>
                     }
                     avatar={<Avatar src={authorProfileImageUrl}/>}
                     content={
                         <>
                             <p dangerouslySetInnerHTML={{__html: text}}/>
                             <p>
                                 <span><LikeOutlined/></span>
                                 <span style={{margin: '5px'}}>{likeCount}</span>
                                 <span style={{margin: '8px'}}><DislikeOutlined/></span>
                                 {totalReplyCount > 0 &&
                                 <OpenCloseAnswers commentId={commentId} isOpenAnswers={isOpenAnswers}
                                                   setIsOpenAnswers={setIsOpenAnswers}
                                                   totalReplyCount={totalReplyCount}
                                 />}
                             </p>
                         </>
                     }
                     datetime={<span>{dateReformat(publishedAt)}</span>}
            />
            {isOpenAnswers && Answers}
            <div className={m.more_close_answers_button_container}>
                {isOpenAnswers && <>
                <span onClick={()=>setIsOpenAnswers(false)}
                    className={m.open_close_answers_button}>Скрыть ответы</span>
                    <span className={m.answers_button_more}>Еще</span>
                </>
                }
            </div>
        </>
    )
}



const OpenCloseAnswers: FC<OpenCloseAnswersProps> = ({commentId, isOpenAnswers, setIsOpenAnswers, totalReplyCount}) => {
    function openAnswers() {
        setIsOpenAnswers(true)
    }

    function closeAnswers() {
        setIsOpenAnswers(false)
    }

    return (
        <span className={m.open_close_answers_button}>
            {isOpenAnswers ?
                <span style={{margin: '15px', color: 'blue', cursor: 'pointer'}}
                      onClick={closeAnswers}>Скрыть ответы </span>
                :
                <span style={{color: 'blue', cursor: 'pointer'}}
                      onClick={openAnswers}>Показать {totalReplyCount} ответов</span>
            }

        </span>
    )
}


type VideoCommentProps = {
    comment: CommentType
    channelId: string
}

type OpenCloseAnswersProps = {
    commentId: string
    isOpenAnswers: boolean,
    setIsOpenAnswers: (isOpenAnswers: boolean) => void
    totalReplyCount: number
}
