import React, {FC} from "react";
import {Avatar, Comment} from "antd";
import m from "../Modal_Window_Styles.module.scss";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import {dateReformat} from "../../../utils/validators/string_formatting";
import {CommentAnswerType} from "../../../../types/Videos_Types";

export const CommentAnswer: FC<CommentAnswerProps> = ({answer, channelId}) => {
    const {commentId, authorProfileImageUrl, authorDisplayName, authorChannelId, publishedAt, text, likeCount} = answer
    return (
        <Comment className={m.comment_container} key={commentId} style={{marginLeft: '60px'}}
                 author={
                     <a className={`${m.name} ${channelId === authorChannelId && m.nameOwner}`}>
                         {authorDisplayName}
                     </a>
                 }
                 avatar={<Avatar src={authorProfileImageUrl}/>}
                 content={
                     <>
                         <p dangerouslySetInnerHTML={{__html: text}}/>
                         <p>
                             <span><LikeOutlined/></span>
                             <span style={{marginLeft: '5px'}}>{likeCount}</span>
                             <span style={{marginLeft: '8px'}}><DislikeOutlined/></span>
                         </p>
                     </>
                 }
                 datetime={<span>{dateReformat(publishedAt)}</span>}
        />
    )
}
type CommentAnswerProps = {
    answer: CommentAnswerType,
    channelId: string
}