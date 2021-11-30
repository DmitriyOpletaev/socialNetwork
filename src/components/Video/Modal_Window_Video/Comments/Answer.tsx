import React, {FC} from "react";
import {Avatar, Comment} from "antd";
import m from "../Modal_Window_Styles.module.scss";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import {dateReformat} from "../../../utils/validators/string_formatting";
import {CommentAnswerType} from "../../../../types/Videos_Types";
import {MarkAsSpamButton} from "./Mark_As_Spam_Button";

export const CommentAnswer: FC<CommentAnswerProps> = ({answer, channelId}) => {
    const {authorProfileImageUrl, authorDisplayName, authorChannelId, publishedAt, text, likeCount,commentId} = answer
    return (
        <Comment className={m.comment_container}
                 author={
                     <span className={`${m.name} ${channelId === authorChannelId && m.nameOwner}`}>
                         {authorDisplayName}
                     </span>
                 }
                 avatar={<Avatar src={authorProfileImageUrl}/>}
                 content={
                     <div>
                         <p dangerouslySetInnerHTML={{__html: text}}/>
                         <p>
                             <span><LikeOutlined/></span>
                             <span style={{marginLeft: '5px'}}>{likeCount}</span>
                             <span style={{marginLeft: '8px'}}><DislikeOutlined/></span>
                         </p>
                         <MarkAsSpamButton commentId={commentId}/>
                     </div>
                 }
                 datetime={<span>{dateReformat(publishedAt)}</span>}
        />
    )
}
type CommentAnswerProps = {
    answer: CommentAnswerType,
    channelId: string
}